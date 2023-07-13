import { View, Text, StyleSheet } from "react-native";
import HeaderBar from "./HeaderBar";
import Icon from "react-native-vector-icons/Ionicons";
import { deleteAllExpenses } from "../service/ExpenseRepository";
import { deleteTable } from "../service/ExpenseModal";
import ShowSnackbar from "../utils/snackBar";
import LocalStorage from "../data/localStorage";

function HomeHeaderBar({ subText, mainText, color, iconName }) {
	const renderLeft = () => {
		return (
			<View style={styles.container}>
				<Text style={{ color: color, marginBottom: 2, fontSize: 14 }}>
					{subText}
				</Text>
				<Text style={{ color: color, fontSize: 24, fontWeight: "bold" }}>
					{mainText}
				</Text>
			</View>
		);
	};
	return (
		<HeaderBar
			left={renderLeft}
			right={<Icon name={iconName} color={color} size={28} />}
			rightPress={() => {
        LocalStorage.clear();
				deleteAllExpenses();
				deleteTable();
				ShowSnackbar(ShowSnackbar.SUCCESS, "All data cleared !DEBUG");
			}}
		/>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default HomeHeaderBar;
