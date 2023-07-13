import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TitledButton from "./TitledButton";
import { Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setExpenseDate } from "../store/slices/expenseSlice";
function Calendar({ dateText }) {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const dispatch = useDispatch();
	const onDateSelected = (date) => {
		dispatch(setExpenseDate(new Date(date).toDateString()));
		hideDatePicker();
	};
	const hideDatePicker = () => setShowDatePicker(false);
	return (
		<>
			<TitledButton
				title={"DATE"}
				titleColor={"#666666"}
				titleSize={16}
				onPress={() => setShowDatePicker(true)}
			>
				<Text style={styles.text}>{dateText}</Text>
				<Icon name="calendar" color={"#888888"} size={16} />
			</TitledButton>

			<DateTimePickerModal
				isVisible={showDatePicker}
				mode="date"
				onConfirm={onDateSelected}
				onCancel={hideDatePicker}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#666666",
		fontSize: 18,
	},
});

export default Calendar;
