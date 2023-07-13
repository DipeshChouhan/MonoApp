import { DefaultTheme } from "@react-navigation/native";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
  Dimensions,
	ScrollView,
} from "react-native";
import AmountInput from "../components/AmountInput";
import CurvedBackground from "../components/CurvedBackground";
import DefaultHeaderBar from "../components/DefaultHeaderBar";
import TitledButton from "../components/TitledButton";

import Icon from "react-native-vector-icons/Ionicons";
import Calendar from "../components/Calendar";
import MSelectDropdown from "../components/MSelectDropdown";
import { useSelector, useDispatch } from "react-redux";
import ShowSnackbar from "../utils/snackBar";
import {
	addExpenseToList,
	updateExpenseList,
} from "../store/slices/expenseListSlice";
import { insertExpense } from "../service/ExpenseRepository";
import { setUserAccount } from "../store/slices/userSlice";
import { getFormatedDollar } from "../utils/currencyFormat";
import { useCallback, useState } from "react";
import Invoice from "../components/Invoice";
import LocalStorage from "../data/localStorage";
import { resetExpense } from "../store/slices/expenseSlice";
import { updateExpense } from "../service/ExpenseRepository";
import {setExpenseTitle} from "../store/slices/expenseSlice";
import FloatingActionButton from "../components/FloatingActionButton";

function AddExpenseScreen({ route, navigation }) {
	// editExpense is boolean value passed from HomeScreen or
	// AllExpenseScreen to determine if the user is adding
	// a new expense or editing an existing one through navigation.navigate(screen, params)
	let editExpense = false;
	if (route.params) {
		editExpense = route.params.editExpense;
	}

	const userData = useSelector((store) => store.userData);
	const expenseList = useSelector((store) => store.expenseList);

	const [isAddInvoice, setIsAddInvoice] = useState(false);
	const expense = useSelector((store) => store.expense);
	const dispatch = useDispatch();

	const addInvoiceClicked = () => {
		setIsAddInvoice(false);
	};

	const onBackPress = () => {
		isAddInvoice ? setIsAddInvoice(false) : navigation.goBack();
	};
	const rightPressed = () => {};

	const confirmInput = () => {
		const amount = Number(expense.amount);
		console.log(amount);
		if (amount === NaN || amount <= 0) {
			ShowSnackbar(ShowSnackbar.ERROR)("Amount must be greater than 0");
			return false;
		}
		return true;
	};

	const onEditExpense = () => {
		if (!confirmInput()) return;
		const amount = Number(expense["amount"]);
		const newExpense = {
			...expense,
			amount: "-" + getFormatedDollar(amount),
			id: route.params.expenseId,
		};
		const prevAmount = route.params.prevAmount;
		//console.log(newExpense);

		updateExpense(newExpense, () => {
			const totalBalance = userData.userBalance - amount + prevAmount;
			const totalExpenses = userData.userExpenses + amount - prevAmount;
			LocalStorage.setItem("userBalance", totalBalance);
			LocalStorage.setItem("userExpenses", totalExpenses);
			dispatch(
				setUserAccount({
					balance: totalBalance,
					expenses: totalExpenses,
					income: userData.userIncome,
				}),
			);
			const newList = [...expenseList];
			// index is the index of the expense in the expenseList
			//console.log(route.params.expenseIndex);
			newList[route.params.expenseIndex] = newExpense;
			//console.log(newList);
			dispatch(updateExpenseList(newList));
			ShowSnackbar(ShowSnackbar.SUCCESS)("Expense updated successfully");
			navigation.goBack();
		});
		// dispatch(resetExpense());
	};

	const onAddExpense = () => {
    if (isAddInvoice) {
      setIsAddInvoice(false);
      return;
    }
		if (!confirmInput()) return;
		const amount = Number(expense["amount"]);
		const newExpense = { ...expense, amount: "-" + getFormatedDollar(amount) };
		insertExpense(newExpense, (id) => {
			newExpense["id"] = id;
			dispatch(addExpenseToList(newExpense));
			const totalBalance = userData.userBalance - amount;
			const totalExpenses = userData.userExpenses + amount;
			LocalStorage.setItem("userBalance", totalBalance);
			LocalStorage.setItem("userExpenses", totalExpenses);
			dispatch(
				setUserAccount({
					balance: totalBalance,
					expenses: totalExpenses,
					income: userData.userIncome,
				}),
			);
			dispatch(resetExpense());
			ShowSnackbar(ShowSnackbar.SUCCESS)("Expense added successfully");
			navigation.goBack();
		});
	};
	let headerTitle = isAddInvoice ? "Add Invoice" : "Add Expense";
	if (editExpense) {
		headerTitle = isAddInvoice ? "Edit Invoice" : "Edit Expense";
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: DefaultTheme.colors.background,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CurvedBackground />
			<DefaultHeaderBar
				title={headerTitle}
				leftIconName={"chevron-back-outline"}
				rightIconName={"ellipsis-horizontal"}
				color={"#FFFFFF"}
				onBackPress={onBackPress}
				onRightPress={rightPressed}
				style={{}}
			/>

			<View style={styles.card}>
				{isAddInvoice ? (
					<Invoice onAddInvoice={addInvoiceClicked} />
				) : (
					<ScrollView>
						<View>
							<Text style={styles.dropdownTitle}>{"CATEGORY"}</Text>
							<View style={{ marginBottom: 20 }}>
								<MSelectDropdown />
							</View>
							<TitledButton
								title={"TITLE"}
								renderBottomView={(style) => {
									return (
										<TextInput
											style={[style, styles.titleInput]}
											placeholder={"Enter title"}
                      value={expense["title"]}
											maxLength={100}
                      onChangeText={(text) => dispatch(setExpenseTitle(text))}
										/>
									);
								}}
							/>
							<AmountInput amount={expense["amount"]} />
							<Calendar dateText={expense["date"]} />
							<TitledButton
								title={"INVOICE"}
								titleColor="#666666"
								titleSize={16}
								buttonStyle={styles.invoiceButton}
								onPress={() => setIsAddInvoice(true)}
							>
								<Icon name="add-circle" size={24} color="#888888" />
								<Text style={styles.invoiceText}>
									{expense.invoice
										? "Edit Invoice"
										: "Add Invoice"}
								</Text>
							</TitledButton>
						</View>
					</ScrollView>
				)}
			</View>
    <FloatingActionButton onButtonPress={editExpense ? onEditExpense : onAddExpense} buttonStyle={styles.floatingActionButton}>
    <Icon name="checkmark-outline" size={32} color="#FFFFFF" />
    </FloatingActionButton>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: "90%",
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingVertical: 24,

		borderRadius: 32,
		position: "relative",
		top: "-10%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	button: {
		width: "90%",
		backgroundColor: "#69AEA9",
		paddingVertical: 16,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 10,
		borderRadius: 50,
		// marginHorizontal: 32
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},

	invoiceButton: {
		justifyContent: "center",
		borderStyle: "dotted",
	},

	invoiceText: {
		color: "#666666",
		fontSize: 16,
		marginLeft: 8,
	},

	addButton: {
		width: "100%",
		alignItems: "center",
		marginTop: 64,
		backgroundColor: "black",
		paddingVertical: 8,
		borderRadius: 10,
	},

	dropdownTitle: {
		color: "#666666",
		fontSize: 16,
		marginBottom: 8,
	},
	titleInput: {
		fontSize: 16,
		color: "#666666",
	},
  floatingActionButton: {
    position: "absolute",
    bottom: "3.5%",
    right: Dimensions.get("window").width / 2 - 40,
  }

});

export default AddExpenseScreen;
