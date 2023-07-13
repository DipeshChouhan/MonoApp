import { useDispatch, useSelector } from "react-redux";
import { setExpenseInvoice, setExpenseTitle } from "../store/slices/expenseSlice";
import RightButton from "../components/RightButton";
import { View, TextInput, StyleSheet } from "react-native";

function Invoice() {
	const invoice = useSelector((state) => state.expense.invoice);
	const dispatch = useDispatch();
	return (
		<View style={styles.container}>
			<TextInput
				multiline={true}
				placeholder="Enter Invoice"
				placeholderTextColor="#888888"
				textAlignVertical="top"
				value={invoice}
				onChangeText={(changedText) => dispatch(setExpenseInvoice(changedText))}
				style={styles.input}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	input: {
		width: "100%",
		height: "70%",
		color: "black",
		fontSize: 18,
	},
});

export default Invoice;
