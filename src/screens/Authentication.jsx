import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { StyleSheet, View } from "react-native";

function Authentication() {
	const press = () => {};
	return (
    <View style={styles.container}>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={press}
			/>
    </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Authentication;
