import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import Register from "./Register";
import Splash from "./Splash";

const AppNavigator = createStackNavigator({
  Splash: { screen: Splash },
  Home: { screen: Home },
  Register: { screen: Register }
});

export default createAppContainer(AppNavigator);
