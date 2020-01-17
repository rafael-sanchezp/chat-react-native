import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from "../screens/login"
import SignUp from "../screens/signup"
import Home from "../screens/home"
import Chat from "../screens/chat"
const MainNavigator = createStackNavigator({
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    Home: {screen: Home},
    Chat: {screen: Chat},
  },
  { initialRouteName: "Login"
 });
  
  const Navigation = createAppContainer(MainNavigator);
  
  export default Navigation;