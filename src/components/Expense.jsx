import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MImages, MNames } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import showAlert from "../utils/alertBox";
import { updateExpenseState } from "../store/slices/expenseSlice";
import { unformatDollar } from "../utils/currencyFormat";
import ShowSnackbar from "../utils/snackBar";
import { deleteExpenseById } from "../service/ExpenseRepository";
import { updateExpenseList } from "../store/slices/expenseListSlice";
import LocalStorage from "../data/localStorage";
import { setUserAccount } from "../store/slices/userSlice";

function Expense({
	id,
	title,
	date,
	amount,
	invoice,
	category,
	navigation,
	index,
  onDeleteExpense
}) {
	const dispatch = useDispatch();
	const userData = useSelector((store) => store.userData);
	const expenseList = useSelector((store) => store.expenseList);
	const onExpenseClicked = () => {
		const message = `${title ? title + "\n\n" : ""} ${
			invoice ? "---invoice---\n" + invoice : ""
		}`;
		const newAmount = unformatDollar(amount);
		showAlert(MNames[category], message, [
			{
				text: "EDIT",
				onPress: () => {
					if (category > 3) {
						dispatch(
							updateExpenseState({
								title: title,
								date: date,
								amount: newAmount.toString(),
								invoice: invoice,
								category: category,
							}),
						);
						navigation.navigate("AddExpense", {
							editExpense: true,
							expenseId: id,
							expenseIndex: index,
							prevAmount: newAmount,
						});
					} else {
						ShowSnackbar(ShowSnackbar.WARNING)("You can't edit this expense");
					}
				},
			},
			{
				text: "DELETE",
				onPress: () => {
					if (category > 3) {
						deleteExpenseById(id, () => {
							const newList = expenseList.filter((item) => item.id !== id);
 //             console.log(userData.userBalance, newAmount, userData.userExpenses);
							const totalBalance = userData.userBalance + newAmount;
							const totalExpenses = userData.userExpenses - newAmount;
              LocalStorage.setItem("userBalance", totalBalance);
              LocalStorage.setItem("userExpenses", totalExpenses);
							dispatch(
								setUserAccount({
									balance: totalBalance,
									expenses: totalExpenses,
									income: userData.userIncome,
								}),
							);
							dispatch(updateExpenseList(newList));
						});
					} else {
						ShowSnackbar(ShowSnackbar.WARNING)("You can't delete this expense");
					}
				},
			},
		]);
	};
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.4}
			onPress={onExpenseClicked}
		>
			<View style={styles.leftContainer}>
				<View
					style={{
						width: 50,
						height: 50,
						backgroundColor: "#F0F6F5",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 8,
						marginRight: 8,
					}}
				>
					<Image source={MImages[category]} style={styles.image} />
				</View>
				<View>
					<Text style={styles.title}>{title || MNames[category]}</Text>
					<Text style={styles.date}>{date}</Text>
				</View>
			</View>
			<Text
				style={[
					styles.amount,
					{ color: amount[0] === "+" ? "#25A969" : "#F95B51" },
				]}
			>
				{amount}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
	},
	leftContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 34,
		height: 34,
		resizeMode: "contain",
		borderRadius: 50,
	},
	title: {
		color: "#000000",
		fontSize: 16,
		fontWeight: 500,
	},
	date: {
		color: "#666666",
		fontSize: 13,
		fontWeight: 400,
	},
	amount: {
		fontSize: 18,
		fontWeight: 600,
	},
});

export default Expense;
