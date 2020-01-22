
import { GET_MESSAGES, SEND_MESSAGE, loading, loadingScroll, getMessages, addMessage, SOCKET } from '../ActionTypes'
import { getMessagesService, sendMessageService, youtubeService, socketService } from '../services'
import { take, delay, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'
//import { showMessage, hideMessage } from "react-native-flash-message";
var channel;
import * as NavigationService from '../services/navigation.js'
function* messagesConfig(info) {
    yield put(loading(true));
    try {
        let datos = {
            user: info.data.user.id == 0 ? null : info.data.user.id,//check if user is general chat
            owner: info.data.owner.id
        }
        const res = yield call(getMessagesService, datos)// request data
        yield put(getMessages({ user: info.data.user, messages: res.data.getMessage }));
        NavigationService.navigate('Chat');
        yield put(loading(false));//hide spiner
    } catch (error) {
        console.log(error)
        yield put(loading(false));//hide spiner
    }
}
function* sendMessagesConfig(info) {
    yield put(loadingScroll(true));
    try {

        if (info.msg.text.toLowerCase().substring(0, 8) == "/youtube") {//check if message is youtube boot
            info.msg.type = "video"//type message is video
            let text = info.msg.text.substring(8, info.msg.text.length)//get the text search
            let res_youtube = yield call(youtubeService, text)
            if (res_youtube.items.length > 0) {
                info.msg.text = res_youtube.items[0].id.videoId;//get video id 
                let res = yield call(sendMessageService, info.msg)// request data
                yield put(addMessage(res.data.createMessage));
            } else {
                yield showMessage({ message: `There isn't videos for this search`, type: "warning" });
            }
        } else {//if type isn't yotube, then it's text
            info.msg.type = "text"
            let res = yield call(sendMessageService, info.msg)// request data
            yield put(addMessage(res.data.createMessage));
        }
        yield put(loadingScroll(false));//hide spinner
    } catch (error) {
        console.log(error)
        yield put(loadingScroll(false));//hide spinner
        yield showMessage({ message: `Data incorrect`, type: "warning" });
    }
}
function websocketInitChannel(data) {
    return eventChannel(emitter => {
       const  subscription = socketService(data).subscribe({
            next(data) {
                emitter(data)
            }
        }, error => {
            console.log(error)
        })
        
        return () => {
            const unsubscribe = subscription.unsubscribe()
            return unsubscribe
        }

    })
}
function* ListenChat(info) {
     channel = yield call(websocketInitChannel, info.data)
    while (true) {
        let res_socket = yield take(channel)
        yield put(addMessage(res_socket.data.Listen));
    }
}
function* CloseChat() {
    channel.close()
}
function* dataMessages() {
    yield takeLatest(GET_MESSAGES, messagesConfig);
}
function* sendMessage() {
    yield takeLatest(SEND_MESSAGE, sendMessagesConfig);
}
function* socket() {
    yield takeLatest(SOCKET, ListenChat);
}
function* closeSocket() {
    yield takeLatest("CLOSE_SOCKET", CloseChat);
}
export { dataMessages, sendMessage, socket ,closeSocket}
