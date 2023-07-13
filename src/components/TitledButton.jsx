import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function TitledButton({
	title,
	titleColor,
	titleSize,
	children,
	buttonStyle,
	renderBottomView,
	...props
}) {
	return (
		<View style={styles.container}>
			<Text
				style={{
					color: titleColor || "#666666",
					fontSize: titleSize || 16,
					marginBottom: 8,
				}}
			>
				{title}
			</Text>
			{renderBottomView ? (
				renderBottomView(styles.button)
			) : (
				<TouchableOpacity
					style={[styles.button, buttonStyle]}
					activeOpacity={props.activeOpacity || 0.7}
					{...props}
				>
					{children}
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
    marginBottom: 20
  },
	button: {
		width: "100%",
		paddingHorizontal: 16,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#DDDDDD",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 10,
		height: 56,
	},
});

export default TitledButton;
