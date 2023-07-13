import messaging from "@react-native-firebase/messaging";

const getFcmToken = async () => {
	const fcmToken = await messaging().getToken();
	if (fcmToken) {
    console.log(fcmToken);
		return fcmToken;
	} else {
		throw new Error("Failed to get token");
	}
};

const notificationListener = async () => {
	messaging().onNotificationOpenedApp((remoteMessage) => {
		console.log(
			"Notification caused app to open from background state:",
			remoteMessage.notification,
		);
	});
	messaging()
		.getInitialNotification()
		.then((remoteMessage) => {
			if (remoteMessage) {
				console.log(
					"Notification caused app to open from quit state:",
					remoteMessage.notification,
				);
			}
		}, []);
};

export { getFcmToken, notificationListener };
