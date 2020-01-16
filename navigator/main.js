import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from "../screens/login"
const MainNavigator = createStackNavigator({
    Home: {screen: Login},
    Profile: {screen: Login},
  },
  { initialRouteName: "Home"
 });
  
  const Navigation = createAppContainer(MainNavigator);
  
  export default Navigation;