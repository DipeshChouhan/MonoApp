import { TouchableOpacity, StyleSheet } from "react-native";
import mDefaultTheme from "../resources";

function FloatingActionButton({ children, buttonStyle, onButtonPress }) {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onButtonPress}
			style={[buttonStyle, styles.button]}
		>
			{children}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 80,
		height: 80,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: mDefaultTheme.colors.primaryColor,
		borderRadius: 50,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
});

export default FloatingActionButton;
