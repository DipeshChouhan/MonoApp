import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import WalletScreen from "../screens/WalletScreen";
import {
	createBottomTabNavigator,
	BottomTabBar,
} from "@react-navigation/bottom-tabs";
import HomeStackNavigation from "./HomeStackNavigation";
import { StyleSheet, View } from "react-native";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import FloatingActionButton from "./FloatingActionButton";
import mDefaultTheme from "../resources";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
function CustomBottomTabBar() {
	<Tab.Navigator
		tabBar={(props) => (
			<View style={styles.navigatorContainer}>
				<BottomTabBar {...props} />
				{IS_IPHONE_X && (
					<View
						style={[
							styles.xFillLine,
							{
								backgroundColor: mDefaultTheme.colors.primaryColor,
							},
						]}
					/>
				)}
			</View>
		)}
		tabBarOptions={{
			showIcon: true,
			style: styles.navigator,
			tabStyle: {
				backgroundColor: mDefaultTheme.colors.primaryColor,
			},
		}}
	>
		<Tab.Screen
			name="Home"
			component={HomeScreen}
			options={{
				tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
			}}
		/>
		<Tab.Screen
			name="Profile"
			component={HomeScreen}
			options={{
				tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />,
			}}
		/>
		<Tab.Screen
			name="Rocket"
			component={HomeScreen}
			options={{
				tabBarButton: (props) => (
					<TabBarAdvancedButton
						bgColor={mDefaultTheme.colors.primaryColor}
						{...props}
					/>
				),
			}}
		/>
		<Tab.Screen
			name="Messages"
			component={HomeScreen}
			options={{
				tabBarIcon: ({ color }) => (
					<Icon name="wechat" size={24} color={color} />
				),
			}}
		/>
		<Tab.Screen
			name="Settings"
			component={HomeScreen}
			options={{
				tabBarIcon: ({ color }) => <Icon name="gear" size={24} color={color} />,
			}}
		/>
	</Tab.Navigator>;
}
function Navigation() {
	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "HomeStack") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Analytics") {
						iconName = focused ? "bar-chart" : "bar-chart-outline";
					} else if (route.name === "Wallet") {
						iconName = focused ? "wallet" : "wallet-outline";
					} else if (route.name === "Profile") {
						iconName = focused ? "person" : "person-outline";
					} else if (route.name === "AddExpense") {
						iconName = focused ? "add" : "add-outline";
						return (
							<FloatingActionButton
								buttonStyle={styles.floatingActionButton}
								onButtonPress={() => navigation.navigate("AddExpense")}
							>
								<Icon name={iconName} size={40} color={"#FFF"} />
							</FloatingActionButton>
						);
					}

					return (
						<View style={{ alignItems: "center", justifyContent: "center" }}>
							<Icon name={iconName} size={24} color={color} />
						</View>
					);
				},
				tabBarActiveTintColor: "#549994",
				tabBarInactiveTintColor: "#AAAAAA",
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: {
					zIndex: 4,
					borderTopWidth: 0,
					// backgroundColor: "transparent"
				},
			})}
		>
			<Tab.Screen name="HomeStack" component={HomeStackNavigation} />
			<Tab.Screen name="Analytics" component={AnalyticsScreen} />
			<Tab.Screen name="AddExpense" component={AddExpenseScreen} options={{tabBarStyle: {display: "none"}}} />
			<Tab.Screen name="Wallet" component={WalletScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navigatorContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	navigator: {
		borderTopWidth: 0,
		backgroundColor: "transparent",
		elevation: 30,
	},
	xFillLine: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 34,
	},
	floatingActionButton: {
		position: "relative",
		bottom: "90%",
	},
});

export { CustomBottomTabBar };
export default Navigation;
