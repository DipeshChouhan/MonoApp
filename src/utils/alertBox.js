import { Alert } from 'react-native';
function showAlert(title, message, buttons) {
	Alert.alert(
		title,
    message,
    buttons,
    {
      cancelable: true,
    }
	);
}
export default showAlert;
