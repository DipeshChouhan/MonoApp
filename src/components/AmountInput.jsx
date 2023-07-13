import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setExpenseAmount } from "../store/slices/expenseSlice";
import TitledButton from "./TitledButton";

function AmountInput({ amount }) {
	const dispatch = useDispatch();
	return (
		<TitledButton
			title={"AMOUNT"}
			titleColor={"#666666"}
			titleSize={16}
			renderBottomView={(style) => {
				return (
					<View style={style}>
						<View style={styles.inputContainer}>
							<Text style={styles.text}>$</Text>
							<TextInput
								style={styles.input}
								placeholder={"0.0"}
								placeholderTextColor={"#666666"}
								inputMode="numeric"
								onChangeText={(changedText) => {
									dispatch(setExpenseAmount(changedText));
								}}
								value={amount}
							/>
						</View>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								dispatch(setExpenseAmount(""));
							}}
						>
							<Text style={styles.button}>Clear</Text>
						</TouchableOpacity>
					</View>
				);
			}}
		/>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		flex: 1,
	},
	button: {
		fontSize: 14,
		color: "#438883",
	},
	text: {
		fontSize: 20,
		fontWeight: "600",
		color: "#438883",
		marginRight: 8,
	},
	input: {
		fontSize: 20,
		flex: 1,
		fontWeight: "600",
		color: "#438883",
	},
});
export default AmountInput;
