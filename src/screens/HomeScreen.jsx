import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
import { commonStyles } from "../commonStyles";
import CurvedBackground from "../components/CurvedBackground";
import Expense from "../components/Expense";
import HomeHeaderBar from "../components/HomeHeaderBar";
import mDefaultTheme from "../resources";
import { useSelector, useDispatch } from "react-redux";
import { MImages, MNames } from "../data/data";
import { getFormatedDollar } from "../utils/currencyFormat";
import LocalStorage from "../data/localStorage";
import {
	setUserAccount,
} from "../store/slices/userSlice";

const SimpleButton = ({ text, buttonText, onPress, style }) => {
	return (
		<View style={[commonStyles.rowSpaceBetween2, style]}>
			<Text style={styles.historyText}>{text}</Text>
			<TouchableOpacity activeOpacity={0.6} onPress={onPress}>
				<Text style={styles.allText}>{buttonText}</Text>
			</TouchableOpacity>
		</View>
	);
};

const profiles = [
	require("../assets/woman.png"),
	require("../assets/user1.png"),
	require("../assets/user2.png"),
	require("../assets/user3.png"),
	require("../assets/user4.png"),
];

const TitleText = ({ title, text, icon }) => {
	return (
		<View style={styles.titleTextContainer}>
			<View style={styles.titleContainer}>
				<View
					style={{
						backgroundColor: "#438883",
						width: 24,
						height: 24,
						borderRadius: 50,
						justifyContent: "center",
						alignItems: "center",
						marginRight: 4,
					}}
				>
					<Icon
						name={icon}
						width={16}
						color="#FFFFFF"
						style={{ textAlign: "center" }}
					/>
				</View>
				<Text style={{ fontSize: 16, fontWeight: 500, color: "#D0E5E4" }}>
					{title}
				</Text>
			</View>
			<Text
				style={{
					color: "#FFFFFF",
					fontSize: 20,
					fontWeight: 600,
					textAlign: "right",
				}}
			>
				{text}
			</Text>
		</View>
	);
};


const Card = ({ text1, text2, text3 }) => {
	return (
		<View style={styles.cardContainer}>
			<View style={[styles.cardSection, { marginBottom: 24 }]}>
				<View style={styles.cardLeft}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={styles.cardLeftTitle}>{"Total Balance"}</Text>
						<Icon name="chevron-up-outline" color="#EEEEEE" size={14} />
					</View>
					<Text style={styles.cardLeftText}>{getFormatedDollar(text1)}</Text>
				</View>
				<Icon name="ellipsis-horizontal-outline" size={24} color="#EEEEEE" />
			</View>
			<View style={styles.cardSection}>
				<TitleText
					title="Income"
					icon="arrow-down"
					text={getFormatedDollar(text2)}
				/>
				<TitleText
					title="Expenses"
					icon="arrow-down"
					text={getFormatedDollar(text3)}
				/>
			</View>
		</View>
	);
};

const updateUserInfo = (dispatch) => {
	const balance = LocalStorage.getNumber("userBalance");
  
	const income =  LocalStorage.getNumber("userIncome");
	const expenses = LocalStorage.getNumber("userExpenses");
	dispatch(
		setUserAccount({
			balance: Number(balance),
			income: Number(income),
			expenses: Number(expenses),
		}),
	);
};

// create a function to return a FlatList of expenses
function ExpenseList({ expenses, navigation }) {
	return (
		<View>
			<FlatList
				data={expenses}
				renderItem={({ item, index }) => (
					<Expense
            id={item.id}
            index={index}
						title={item.title}
            category={item.category}
						date={item.date}
						amount={item.amount}
            invoice={item.invoice}
            navigation={navigation}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}

// write a function which writtens Good Afternoon, Good Morning, Good Evening
const getGreeting = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return "Good Morning,";
  } else if (hour < 18) {
    return "Good Afternoon,";
  } else {
    return "Good Evening,";
  }
}

function HomeScreen({ navigation }) {
	const expenses = useSelector((state) => state.expenseList.slice(0, 4));
	const userData = useSelector((state) => state.userData);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!userData.userBalance) {
      console.log("called");
			updateUserInfo(dispatch);
		}
	}, []);
	return (
		<View style={styles.container}>
			<CurvedBackground />
			<HomeHeaderBar
				subText={getGreeting()}
				mainText={userData.user.name}
				color={"#FFFFFF"}
				iconName={"notifications-outline"}
			/>
			<View style={styles.mainContainer}>
				<Card
					text1={userData.userBalance}
					text2={userData.userIncome}
					text3={userData.userExpenses}
				/>
				<SimpleButton
					text="Transaction History"
					buttonText="See all"
					style={{ marginBottom: 8 }}
					onPress={() => navigation.navigate("AllExpensesScreen")}
				/>
				<ExpenseList expenses={expenses} navigation={navigation}/>
				<SimpleButton
					text="Send Again"
					buttonText="See all"
					style={{ marginTop: 16 }}
				/>
				<View style={styles.usersContainer}>
					{profiles.map((profile, index) => {
						return (
							<Image style={styles.profileImg} source={profile} key={index} />
						);
					})}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	curved: {
		height: "35%",
		width: "100%",
		transform: [{ scaleX: 2 }],
		borderBottomStartRadius: 250,
		borderBottomEndRadius: 250,
		overflow: "hidden",
		backgroundColor: mDefaultTheme.colors.primaryColor,
	},
	mainContainer: {
		flex: 1,
		paddingHorizontal: 24,
	},
	cardContainer: {
		backgroundColor: "#2F7E79",
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingVertical: 24,

		marginTop: -120,
		marginBottom: 32,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 11,
		},
		shadowOpacity: 0.55,
		shadowRadius: 14.78,

		elevation: 22,
	},
	cardSection: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardLeftTitle: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: 600,
		marginRight: 4,
		marginBottom: 4,
	},
	cardLeftText: {
		color: "#FFFFFF",
		fontSize: 30,
		fontWeight: 700,
	},
	titleTextContainer: {},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	historyText: {
		color: "#222222",
		fontSize: 18,
		fontWeight: "600",
	},
	allText: {
		color: "#666666",
		fontSize: 14,
		fontWeight: "400",
	},
	usersContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
	profileImg: {
		width: 62,
		height: 62,
		borderRadius: 50,
	},
});

export default HomeScreen;
