import React from "react";
import {
  Text,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";
class Login extends React.Component {
  static navigationOptions = {
    headerShown:false,
};
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
   <View style={styles}>
       <Text>It's login 2</Text>
   </View>
   )
  }
}

const mapStateToProps = state => {
  const { user } = state.session;
  return {
    user:{
    nickname: user === undefined ? null : user.nickname,
  }};
};
export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  }
});
