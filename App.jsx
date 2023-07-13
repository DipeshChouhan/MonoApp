import { View } from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import "./src/auth/config";
import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import OnBoardingScreen from "./src/screens/OnBoardingScreen";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./src/store/store";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/components/Navigation";
import { getAllExpenses, insertExpense } from "./src/service/ExpenseRepository";
import { updateExpenseList } from "./src/store/slices/expenseListSlice";
import { getFcmToken, notificationListener } from "./src/utils/notifications";
import LocalStorage from "./src/data/localStorage";
import { defaultExpenses, setInitailUserData } from "./src/data/data";

function App() {
	const dispatch = useDispatch();
	const userData = useSelector((state) => {
		return state.userData;
	});

	function onAuthStateChanged(aUser) {
		if (aUser && userData.user === null) {
			dispatch(
				setUser({
					name: aUser.displayName,
					email: aUser.email,
					url: aUser.photoURL,
				}),
			);
			console.log("user", aUser);
		}
	}
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		getFcmToken();
		notificationListener();
		if (LocalStorage.isOpenedFirstTime()) {
			setInitailUserData();
			LocalStorage.setOpenedFirstTime();
			(async () => {
				const insertDefaultExpenses = async () => {
					for (let i = 0; i < defaultExpenses.length; i++) {
						insertExpense(defaultExpenses[i]);
					}
				};
				await insertDefaultExpenses();
				getAllExpenses((expenses) => {
					dispatch(updateExpenseList(expenses));
					SplashScreen.hide();
				});
			})();
		} else {
			getAllExpenses((expenses) => {
				dispatch(updateExpenseList(expenses));
				SplashScreen.hide();
			});
		}
		return subscriber;
	}, []);

	if (userData.user === null) {
		return <OnBoardingScreen />;
	}
	return (
		<NavigationContainer>
			<Navigation />
		</NavigationContainer>
	);
}

export default App;
