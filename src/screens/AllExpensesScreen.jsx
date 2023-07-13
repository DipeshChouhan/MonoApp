import { DefaultTheme } from "@react-navigation/native";
import {
	FlatList,
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import Expense from "../components/Expense";
import HeaderBar from "../components/HeaderBar";
import { useMemo, useState } from "react";
import { getFormatedDollar, unformatDollar } from "../utils/currencyFormat";
import { deleteExpenseById } from "../service/ExpenseRepository";
import {updateExpenseList} from "../store/slices/expenseListSlice";
import {setUserAccount} from "../store/slices/userSlice";

// write a flatlist to display all expenses limit 4 per page

function HeaderBarLeft({ navigation, totalExpenses, textColor }) {
	return (
		<View style={styles.headerLeft}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Icon name="chevron-back-outline" size={24} color="#222222" />
			</TouchableOpacity>
			<Text style={[styles.headerText, { color: textColor }]}>
				{totalExpenses}
			</Text>
		</View>
	);
}

function HeaderBarRight({ onSelect }) {
	return (
		<SelectDropdown
			data={[
				"All Expenses",
				"Food",
				"Spending",
				"Entertainment",
				"Transport",
				"Utilities",
				"Health",
				"Investment",
				"Insurance",
				"Other",
			]}
			defaultButtonText={"All Expenses"}
			buttonStyle={styles.dropdownButton}
			renderDropdownIcon={() => {
				return <Icon name="filter-outline" size={16} color="#666666" />;
			}}
			onSelect={onSelect}
		/>
	);
}

// write a function to unformat the formatted dollar number

function filterExpensesByCategory(expenses, category) {
	let total = 0;
	const newExpenses = expenses.filter((expense) => {
		if (category === 3) {
			const amount = unformatDollar(expense.amount);
			total += expense.amount[0] === "-" ? -amount : amount;
			return true;
		} else if (expense.category === category) {
			const amount = unformatDollar(expense.amount);
			total += expense.amount[0] === "-" ? -amount : amount;
			return true;
		}
		return false;
	});
	return [total, newExpenses];
}

function AllExpensesScreen({ navigation }) {
	const expenses = useSelector((state) => state.expenseList);
	const [expenseCategory, setExpenseCategory] = useState(3);
	const [totalExpenses, setTotalExpenses] = useState("+$0.00");

	const filteredExpenses = useMemo(() => {
		const [total, newExpenses] = filterExpensesByCategory(
			expenses,
			expenseCategory,
		);
		if (total >= 0) {
			setTotalExpenses("+" + getFormatedDollar(total));
		} else {
			setTotalExpenses(getFormatedDollar(total));
		}
		return newExpenses;
	}, [expenses, expenseCategory]);
	return (
		<View style={styles.container}>
			<HeaderBar
				left={() => (
					<HeaderBarLeft
						navigation={navigation}
						totalExpenses={totalExpenses}
						textColor={totalExpenses[0] === "-" ? "#F95B51" : "#25A969"}
					/>
				)}
				center={null}
				right={() => (
					<HeaderBarRight
						onSelect={(selectedItem, index) => {
							setExpenseCategory(index + 3);
						}}
					/>
				)}
			/>
			{filteredExpenses.length === 0 ? (
				<Text style={styles.fallbackText}>No expenses in this category!</Text>
			) : (
				<FlatList
					data={filteredExpenses}
					style={styles.flatlist}
					renderItem={({ item, index }) => (
						<Expense
							index={index}
							id={item.id}
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
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.colors.background,
	},
	flatlist: {
		marginTop: 130,
		paddingHorizontal: 24,
	},

	fallbackText: {
		marginTop: 130,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		color: "#F95B51",
	},

	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		width: "50%",
		justifyContent: "space-between",
		paddingRight: 16,
	},
	dropdownButton: {
		width: "50%",
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
export default AllExpensesScreen;
