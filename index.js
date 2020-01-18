import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { connect } from "react-redux";
import {NavigationHome,NavigationLogin} from "./navigator/main";
import Login from "./screens/login";
import * as Font from "expo-font";
import Spinner from 'react-native-loading-spinner-overlay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner
          visible={this.props.status}
          textContent={'Cargando Países...'}
          textStyle={{color: 'white'}}
          color={'white'}
        />
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {this.props.isLogin?<NavigationHome/>:<NavigationLogin/> }
            
      
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      //Asset.loadAsync([require("./assets/images/splash.png")]),
      Font.loadAsync({
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Light": require("./assets/fonts/Lato-Light.ttf")
      })
    ]);
  };
  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const mapStateToProps = state => {
  const { status } = state.loading;
  const { isLogin } = state.session;
  return {
    status,isLogin
  };
};
export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
