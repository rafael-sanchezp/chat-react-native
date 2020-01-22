import React from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import logo from "../assets/images/logo.png";
import headerhome from "../assets/images/headerhome.png";
import { Button, Header, SearchBar, Avatar } from 'react-native-elements';
import Card from "../components/cardUser"
import BackgroundImage from "../components/backgroundImage";
const { height, width } = Dimensions.get("window");
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
import { connect } from "react-redux";
class Home extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }
    updateSearch = search => {
        this.setState({ search });
        let users = []
        if (search == "") users = this.props.users
        else users = this.props.users.filter(item => item.names.toLowerCase().includes(search.toLowerCase()));
        this.props.updateUsersSearch(users)
    };
    cancelSearch() {
        this.props.updateUsersSearch(this.props.users)
    }
    componentDidMount() {
        this.props.getUsers()
    }
    _onRefresh = () => {
        this.props.getUsers()
    }
    _goChat(user){
        let data={
            user,
            owner:this.props.user
        }
        this.props.dataMessages(data)
    }
    render() {
        return (
            <DismissKeyboard>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <BackgroundImage
                            source={headerhome}
                            imageStyle={{ opacity: 1, resizeMode: 'stretch', width: width }}
                            containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <View style={styles.contentTitle}>
                                <Text style={styles.title}>Messages</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("go signup")
                                        this.props.navigation.navigate("SignUp");
                                    }}>
                                    <Avatar
                                        size="medium"
                                        rounded
                                        showEditButton
                                        icon={{ name: 'user', type: 'font-awesome' }}
                                        source={{
                                            uri: (this.props.user.photo ? this.props.user.photo : ""),
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentSearch}>
                                <SearchBar
                                    inputContainerStyle={{ borderRadius: height * 0.025, backgroundColor: "#F0F4FF" }}
                                    containerStyle={styles.containerSearch}
                                    inputStyle={{ height: height * 0.05 }}
                                    placeholder="Search"
                                    onCancel={this.cancelSearch}
                                    onChangeText={this.updateSearch}
                                    value={this.state.search}
                                />
                            </View>
                        </BackgroundImage>
                    </View>
                    <View style={styles.contentList}>
                        <ScrollView showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={this.props.scroll} onRefresh={this._onRefresh} />
                            } >
                            <TouchableOpacity onPress={() => { this._goChat({ id: 0, nickname: "Melt studio", names: "General chat" }) }}>
                                <Card user={{ id: 0, nickname: "Melt studio", names: "General chat" }} image={logo} ></Card>
                            </TouchableOpacity>
                            {this.props.usersSearch.map((user, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => { this._goChat(user) }}>
                                        <Card user={user} key={index}></Card>
                                    </TouchableOpacity>)
                            })}
                        </ScrollView>
                    </View>
                </View>
            </DismissKeyboard>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.session.user,
        users: state.users.users,
        usersSearch: state.users.search,
        scroll: state.loading.scroll
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        dataMessages: (data) => dispatch({
            type: 'GET_MESSAGES',
            data
        }),
        getUsers: () => dispatch({
            type: 'USERS'
        }),
        updateUsersSearch: (users) => dispatch({
            type: 'UPDATE_USERS_SEARCH',
            users
        }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentList: {
        paddingHorizontal: width * 0.1,
        paddingTop: height * 0.05,
        flex: 3
    },
    containerSearch: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: "transparent",
        borderTopColor: "transparent",
        borderBottomColor: "transparent"
    },
    contentTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: width * 0.09,
        width: width,
        flex: 2,
    },
    contentSearch: {
        flex: 1,
        width: width,
        flexDirection: 'column',
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.02,
        justifyContent: "flex-end"
    },
    header: {
        flex: 1.3
    },
    title: {
        color: "#fff",
        fontSize: width * 0.1,
        fontFamily: "Lato-Bold"
    }
});
