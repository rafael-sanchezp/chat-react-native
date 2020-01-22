import React from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,TouchableOpacity
    
} from "react-native";
import {WebView } from "react-native-webview"
import { Button, Header, SearchBar, Icon } from 'react-native-elements';
const { height, width } = Dimensions.get("window");

import { connect } from "react-redux";
class Chat extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            scrollTop:false
        };
    }
    componentDidMount(){
        console.log("*****************************************************")
        console.log("***************** componentDidMount *****************")
        console.log("*****************************************************")
        this.props.socket({owner: this.props.user.id, user: this.props.messages.user.id == 0 ? null : this.props.messages.user.id})//register socket
    }
    componentWillUnmount(){
        console.log("*****************************************************")
        console.log("**************  componentWillUnmount ****************")
        console.log("*****************************************************")
        this.props.closeSocket()
        
    }
   
    
    updateSearch = search => {
        this.setState({ search });
    };
    sendMessage() {
        //create data to send to redux
        let data = {owner: this.props.user.id, user: this.props.messages.user.id == 0 ? null : this.props.messages.user.id,text: this.state.search }
        if(this.state.search.length>0)this.props.sendMessage(data)//if validate field is null and send redux
        this.setState({ search: "" })
    }
    componentDidUpdate(prevProps){
        if(this.props.messages.messages.length !== prevProps.messages.messages.length) {
            setTimeout(()=>{if(this.scrollView)this.scrollView.scrollToEnd({ animated: true })}, 500); 
        }
    }
    render() {
        const top=this.state.scrollTop?28:0
        console.log(top)
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{
                        icon: "keyboard-arrow-left",
                        color: "white",
                        size: width * 0.10,
                        type: "IconMaterial",
                        onPress: () => this.props.navigation.navigate("Home")
                    }}
                    centerComponent={{ text: this.props.messages.user.names, style: { color: '#fff', fontSize: width * 0.05, } }}
                    containerStyle={{
                        backgroundColor: "#5479F1",
                        borderBottomWidth: 0
                    }}/>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding" keyboardVerticalOffset={28} enabled>
                    <View style={styles.contentList}>
                        <ScrollView showsVerticalScrollIndicator={false} ref={(view) => {
                            this.scrollView = view;
                        }}>
                            {this.props.messages.messages.map((msg, index) => {
                                return (

                                    <View key={index} style={msg.owner.id == this.props.user.id ? styles.containChatMe : styles.containChatYou}>
                                        <Text style={msg.owner.id == this.props.user.id ? styles.titleMe : styles.titleYou}>{msg.owner.id == this.props.user.id ?"Me":(msg.user == null ? msg.owner.names : msg.user.names)}</Text>
                                        {msg.type == "video" ?
                                        <View style={{ height: 240, overflow: 'hidden' }}>
                                            <WebView
                                                source={{ uri: `https://www.youtube.com/embed/${msg.text}` }}
                                                startInLoadingState={true}
                                            /> 
                                        </View>: <Text style={msg.owner.id == this.props.user.id ? styles.textChatMe : styles.textChatYou}>{msg.text}</Text>}
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.containInput}>
                        <View style={styles.containSearch}>
                            <SearchBar
                                showLoading={this.props.loading}
                                inputContainerStyle={{ borderRadius: height * 0.025, backgroundColor: "#F0F4FF" }}
                                containerStyle={styles.containerSearch}
                                inputStyle={{ height: height * 0.05 }}
                                placeholder="Typing"
                                onChangeText={this.updateSearch}
                                value={this.state.search}
                            />
                            <TouchableOpacity onPress={() => this.sendMessage()}>
                            <Icon
                                containerStyle={{ flex: 2.5 }}
                                reverse
                                name='ios-send'
                                type='ionicon'
                                color='#517fa4'
                            />
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.session.user,
        messages: state.messages,
        loading: state.loading.scroll
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        socket: (data) => dispatch({
            type: 'SOCKET',
            data
        }),
        closeSocket: () => dispatch({
            type: 'CLOSE_SOCKET'
        }),
        sendMessage: (msg) => dispatch({
            type: 'SEND_MESSAGE',
            msg
        })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    keyboardAvoidingView: { flexGrow: 1, flexShrink: 1 },
    contentList: {
        paddingTop: height * 0.04,
        flex: 10,

    },
    containInput: {
        backgroundColor: "#fff",
        flex: 1.5
    },
    containerSearch: {
        flex: 11,
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: "transparent",
        borderTopColor: "transparent",
        borderBottomColor: "transparent"
    },
    containSearch: {
        flexDirection: "row",
        paddingTop: height * 0.01,
        paddingHorizontal: width * 0.05

    },
    containChatMe: {
        marginBottom: height * 0.015,
        marginLeft: width * 0.15,
        marginRight: width * 0.02,
        borderRadius: 10,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.02,
        backgroundColor: "#5479F1"
    },
    titleMe:{
        fontFamily: "Lato-Bold",
        color: "#fff",
    },
    titleYou:{
        fontFamily: "Lato-Bold",
        color: "#000",
    },
    textChatMe: {
        color: "#fff",
        fontSize: width * 0.04,
        fontFamily: "Lato-Regular"
    },
    containChatYou: {
        marginBottom: height * 0.015,
        marginRight: width * 0.15,
        marginLeft: width * 0.02,
        borderRadius: 10,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.02,
        backgroundColor: "#F4F6FF"
    },
    textChatYou: {
        color: "#4D5A80",
        fontSize: width * 0.04,
        fontFamily: "Lato-Regular"
    }
});
