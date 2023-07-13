import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllExpensesScreen from "../screens/AllExpensesScreen";
import HomeScreen from "../screens/HomeScreen";

const HomeStack = createNativeStackNavigator();
function HomeStackNavigation() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="AllExpensesScreen" component={AllExpensesScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
