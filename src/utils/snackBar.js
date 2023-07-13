import Snackbar from "react-native-snackbar";

const ShowSnackbar = (type) => {
	if (type === 2) {
		return (
			text = "Error!",
			textColor = "#FFFFFF",
			backgroundColor = "#FF0000",
			duration = Snackbar.LENGTH_SHORT,
			action,
		) => {
			Snackbar.show({ text, textColor, backgroundColor, duration, action });
		};
	} else if (type === 1) {
		return (
			text = "Warning!",
			textColor = "white",
			backgroundColor = "orange",
			duration = Snackbar.LENGTH_SHORT,
			action,
		) => {
			Snackbar.show({ text, textColor, backgroundColor, duration, action });
		};
	} else if (type === 0) {
		return (
			text = "Success!",
			textColor = "white",
			backgroundColor = "green",
			duration = Snackbar.LENGTH_SHORT,
			action,
		) => {
			Snackbar.show({ text, textColor, backgroundColor, duration, action });
		};
	}
};
ShowSnackbar.ERROR = 2;
ShowSnackbar.WARNING = 1;
ShowSnackbar.SUCCESS = 0;

export default ShowSnackbar;
