import { StyleSheet, View, TouchableOpacity } from "react-native";

function HeaderBar({
	center,
	left,
	leftPress,
	right,
	rightPress,
	headerBarStyle,
}) {
	return (
		<View style={[styles.container, headerBarStyle]}>
			{typeof left === "function" ? (
				left()
			) : (
				<TouchableOpacity style={styles.btn} onPress={leftPress}>{left}</TouchableOpacity>
			)}
			{center}
			{typeof right === "function" ? (
				right()
			) : (
				<TouchableOpacity style={styles.btn} onPress={rightPress}>{right}</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
    position: "absolute",
    top: 32
	},

	btn: {
		width: 48,
		height: 48,
    justifyContent: "center",
    alignItems: "flex-end"
    
	},
});

export default HeaderBar;
