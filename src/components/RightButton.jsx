import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, StyleSheet } from "react-native";
function RightButton({onPress, style}) {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[styles.addButton, style]}
			onPress={onPress}
		>
			<Icon name="checkmark" size={32} color="#87CEEB" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	addButton: {
		width: "100%",
		alignItems: "center",
		marginTop: 64,
		backgroundColor: "black",
		paddingVertical: 8,
		borderRadius: 10,
	},
});

export default RightButton;
