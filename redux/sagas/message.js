
import { GET_MESSAGES,SEND_MESSAGE, loading,loadingScroll, getMessages,addMessage } from '../ActionTypes'
import { getMessagesService ,sendMessageService,youtubeService} from '../services'
import { delay, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
//import { showMessage, hideMessage } from "react-native-flash-message";
import * as NavigationService from '../services/navigation.js'
function* messagesConfig(data) {
    yield put(loading(true));
    try {
        let datos = {
            user: data.data.user.id == 0 ? null : data.data.user.id,//check if user is general chat
            owner: data.data.owner.id
        }
        const res = yield call(getMessagesService, datos)// request data
        yield put(getMessages({ user: data.data.user, messages: res.data.getMessage }));
        NavigationService.navigate('Chat');
        yield put(loading(false));//hide spiner
    } catch (error) {
        console.log(error)
        yield put(loading(false));//hide spiner
    }
}
function* sendMessagesConfig(data) {
    yield put(loadingScroll(true));
    try {
        
        if(data.msg.text.toLowerCase().substring(0, 8)=="/youtube"){//check if message is youtube boot
            data.msg.type="video"//type message is video
            let text=data.msg.text.substring(8,data.msg.text.length)//get the text search
            let res_youtube=yield call(youtubeService,text)
            if(res_youtube.items.length>0){
                data.msg.text=res_youtube.items[0].id.videoId;//get video id 
                let res=yield call(sendMessageService, data.msg)// request data
                yield put(addMessage(res.data.createMessage));
            }else{
                yield showMessage({ message: `There isn't videos for this search`, type: "warning" });
            }
        }else{//if type isn't yotube, then it's text
            data.msg.type="text"
            let res=yield call(sendMessageService, data.msg)// request data
            yield put(addMessage(res.data.createMessage));
        }
        yield put(loadingScroll(false));//hide spinner
    } catch (error) {
        console.log(error)
        yield put(loadingScroll(false));//hide spinner
        yield showMessage({ message: `Data incorrect`, type: "warning" });
    }
}

function* dataMessages() {
    yield takeLatest(GET_MESSAGES, messagesConfig);
}
function* sendMessage() {
    yield takeLatest(SEND_MESSAGE, sendMessagesConfig);
}
export { dataMessages ,sendMessage}
