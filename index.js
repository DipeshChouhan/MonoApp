/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { configDb } from "./src/service/ExpensesDb";
import messaging from '@react-native-firebase/messaging';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

configDb("expenses", () => {});
const RNRedux = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

AppRegistry.registerComponent(appName, () => RNRedux);
