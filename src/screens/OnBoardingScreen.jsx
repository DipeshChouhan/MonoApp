import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import { useState } from "react";

import auth from "@react-native-firebase/auth";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import mDefaultTheme from "../resources";
import ShowSnackbar from "../utils/snackBar";

async function onGoogleButtonPress(setIsLoggingIn) {
	// Check if your device supports Google Play
	await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
	// Get the users ID token
	const { idToken } = await GoogleSignin.signIn();
	setIsLoggingIn(true);

	// Create a Google credential with the token
	const googleCredential = auth.GoogleAuthProvider.credential(idToken);

	// Sign-in the user with the credential
	return auth().signInWithCredential(googleCredential);
}

function OnBoardingScreen() {
	const getStartedPressed = () => {};
	const loginPressed = () => {};
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const onGoogleSignIn = () => {
		onGoogleButtonPress(setIsLoggingIn)
			.then(() => {
			})
			.catch((err) => {
				ShowSnackbar(ShowSnackbar.ERROR)(err.message);
			});
	};
	if (isLoggingIn) {
		return (
			<View style={[styles.container, { justifyContent: "center" }]}>
				<Text style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
					Logging in...
				</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={require("../assets/pngwing.png")} />
			<Text style={styles.mainText}>Spend Smarter Save More</Text>
			<TouchableOpacity onPress={getStartedPressed} style={styles.mainBtn}>
				<Text style={styles.mainBtnText}>Get Started</Text>
			</TouchableOpacity>
			<View style={styles.rowContainer}>
				<Text style={styles.subText}>Already Have Account?</Text>
				<Text style={styles.logInBtn} onPress={loginPressed}>
					Log In
				</Text>
			</View>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={onGoogleSignIn}
				style={styles.googleBtn}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFF",
		paddingHorizontal: 24,
	},
	image: {
		resizeMode: "contain",
		height: "60%",
	},
	mainText: {
		color: mDefaultTheme.colors.primaryColor,
		fontSize: 42,
		fontWeight: "800",
		textAlign: "center",
		marginHorizontal: 32,
		marginTop: 8,
	},
	mainBtn: {
		width: "100%",
		backgroundColor: mDefaultTheme.colors.primaryColor,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingVertical: 18,
		borderRadius: 32,
		marginTop: 16,
	},
	mainBtnText: {
		color: "white",
		fontSize: 22,
		fontWeight: "bold",
	},
	rowContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 16,
	},
	subText: {
		color: "#444444",
		fontSize: 16,
	},
	logInBtn: {
		color: "#438883",
		marginLeft: 4,
		textDecorationLine: "underline",
	},
	googleBtn: {
		marginTop: 16,
	},
});
export default OnBoardingScreen;
