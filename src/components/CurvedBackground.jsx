import { View, StyleSheet} from "react-native";
import mDefaultTheme from "../resources";

function CurvedBackground({ children, style }) {
	return <View style={[styles.curved, style]}>{children}</View>;
}


const styles = StyleSheet.create({
	curved: {
		height: "32%",
		width: "100%",
		transform: [{ scaleX: 2 }],
		borderBottomStartRadius: 250,
		borderBottomEndRadius: 250,
		overflow: "hidden",
		backgroundColor: mDefaultTheme.colors.primaryColor,
	},
});
export default CurvedBackground;

// 	<View style={styles.curved} />
