import React from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";
import logo from "../assets/images/logo.png";
import headerhome from "../assets/images/headerhome.png";
import { Button, Header, SearchBar,Avatar } from 'react-native-elements';
import Card from "../components/cardUser"
import BackgroundImage from "../components/backgroundImage";
const { height, width } = Dimensions.get("window");

import { connect } from "react-redux";
class Home extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            users:[]
        };
    }
    updateSearch = search => {
        this.setState({ search });
    };
    componentDidMount(){this.loadUsers()}
    loadUsers(){ 
        let users=this.props.getUsers()
        console.log("users--->",users)
        this.setState({users})
    }
    _onRefresh= () => {this.loadUsers()}
    render() {
        return (
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
                                icon={{name: 'user', type: 'font-awesome'}}
                                source={{
                                    uri:(this.props.user.photo?this.props.user.photo:""),
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
                        <TouchableOpacity  onPress={() => { this.props.navigation.navigate("Chat")}}>
                            <Card user={{id:0,nickname:"Melt studio",names:"General chat"}} image={logo} ></Card>
                        </TouchableOpacity>
                        {this.props.users.map((user,index)=>{
                            return(
                            <TouchableOpacity  onPress={() => { this.props.navigation.navigate("Chat")}}>
                                <Card  user={user}  key={index}></Card>
                            </TouchableOpacity>)
                        })}    
                    </ScrollView>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      user: state.session.user,
      users: state.users.users,
      scroll:state.loading.scroll
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: () => dispatch({
        type: 'USERS'
      })
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
        flexDirection:"row",
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
