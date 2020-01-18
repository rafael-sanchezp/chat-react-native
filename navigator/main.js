import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from "../screens/login"
import SignUp from "../screens/signup"
import Home from "../screens/home"
import Chat from "../screens/chat"
const MainNavigator = createStackNavigator({
    Home: {screen: Home},
    Chat: {screen: Chat},
    SignUp: {screen: SignUp},
  },
  { initialRouteName: "Home"
 });
 const LoginNavigator = createStackNavigator({
  Login: {screen: Login},
  SignUp: {screen: SignUp},
},
{ initialRouteName: "Login"
});
  const NavigationHome = createAppContainer(MainNavigator);
  const NavigationLogin = createAppContainer(LoginNavigator);

  export  {NavigationHome,NavigationLogin};