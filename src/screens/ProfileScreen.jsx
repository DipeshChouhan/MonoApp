import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CurvedBackground from "../components/CurvedBackground";
import DefaultHeaderBar from "../components/DefaultHeaderBar";
import { signOut } from "../auth/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/store";
import {useSelector} from 'react-redux';

const IconTextButton = ({ icon, text }) => {
	return (
		<TouchableOpacity activeOpacity={0.7} style={styles.button}>
			{typeof icon === "function" ? (
				icon()
			) : (
				<Icon name={icon} size={32} color="gray" />
			)}
			<Text style={styles.iconText}>{text}</Text>
		</TouchableOpacity>
	);
};
const ImageCard = ({ imgSrc, headText, subText }) => {
	return (
		<View style={styles.cardContainer}>
			<View style={styles.cardImgContainer}>
				<Image source={imgSrc} style={styles.cardImg} />
			</View>
			<Text style={styles.cardHeadText}>{headText}</Text>
			<Text style={styles.cardSubText}>{subText}</Text>
		</View>
	);
};
function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData.user);
	return (
		<View style={{ flex: 1 }}>
			<CurvedBackground />
			<DefaultHeaderBar
				title="Profile"
				leftIconName={"chevron-back-outline"}
				rightIconName={"log-out-outline"}
				color={"#FFFFFF"}
				onBackPress={() => {
					navigation.goBack();
				}}
				onRightPress={() => {
					signOut(() => {
            dispatch(setUser(null));
          });
				}}
				style={{}}
			/>
			<ImageCard
				imgSrc={user ? {uri:user.url} : require("../assets/man.png")}
				headText={user ? user.name : "Your Name"}
				subText={user ? "@"+user.name.toLowerCase().replace(" ", "_") : "@your_name"}
			/>
			<View style={{ flex: 1, paddingHorizontal: 8 }}>
				<IconTextButton
					icon={() => {
						return (
							<Image
								source={require("../assets/diamond.png")}
								style={styles.diamondImg}
							/>
						);
					}}
					text={"Invite Freinds"}
				/>
				<IconTextButton icon={"person"} text="Account info" />
				<IconTextButton icon={"people"} text="Personal profile" />
				<IconTextButton icon={"albums"} text="Message center" />
				<IconTextButton icon={"cube"} text="Login and security" />
				<IconTextButton icon={"lock-closed"} text="Data and privacy" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	diamondImg: {
		width: 32,
		height: 32,
	},
	iconText: {
		color: "black",
		fontSize: 16,
		fontWeight: "500",
		marginLeft: 24,
	},

	cardContainer: {
		alignItems: "center",
		marginTop: -60,
		marginBottom: 24,
	},
	cardImgContainer: {
		backgroundColor: "white",
		width: 100,
		height: 100,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		// marginBottom: 16
	},
	cardImg: {
		width: 85,
		height: 85,
    borderRadius: 50,
	},
	cardHeadText: {
		color: "black",
		fontSize: 20,
		fontWeight: 600,
		marginTop: 8,
	},
	cardSubText: {
		color: "#438883",
		fontSize: 14,
		fontWeight: 600,
		marginTop: 4,
	},
});

export default ProfileScreen;
