import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseCategories } from "../data/data";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import {useRef } from "react";
import { setExpenseCategory } from "../store/slices/expenseSlice";

const SimpleButton =({ category, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.simpleContainer}
			activeOpacity={0.6}
			onPress={onPress}
		>
			<View style={styles.simpleLeft}>
				<View style={styles.simpleImgContainer}>
					<Image source={category.img} style={styles.simpleImg} />
				</View>
				<Text style={styles.simpleText}>{category.name}</Text>
			</View>

			<Icon name="chevron-down-outline" size={16} color="#666666" />
		</TouchableOpacity>
	);
};

function MSelectDropdown() {
	const dispatch = useDispatch();
	const dropdownRef = useRef({});
  const expenseCategory = useSelector((state) => state.expense.category);
	return (
		<SelectDropdown
			ref={dropdownRef}
			data={ExpenseCategories}
			// defaultValueByIndex={1} // use default value by index or default value
			// defaultValue={'Canada'} // use default value by index or default value
			onSelect={(selectedItem, index) => {
        // + 4 is because we have 4 default categories starting from index 0
				dispatch(setExpenseCategory(index + 4));
			}}
			buttonTextAfterSelection={(selectedItem, index) => {
				return selectedItem.name;
			}}
			rowTextForSelection={(item, index) => {
				return item;
			}}
			buttonStyle={{
				width: "100%",
				backgroundColor: "transparent",
				paddingHorizontal: 0,
				borderWidth: 1,
				borderColor: "#DDDDDD",
				borderRadius: 10,
				height: 56,
			}}
			renderCustomizedButtonChild={(selectedItem, index) => {
				return (
					<SimpleButton
						category={ExpenseCategories[expenseCategory - 4]}
						onPress={() => dropdownRef.current.openDropdown()}
					/>
				);
			}}
			renderCustomizedRowChild={(item, index) => {
				return (
					<View style={styles.rowChild}>
						<Image source={item.img} style={styles.rowImg} />
						<Text style={styles.rowText}>{item.name}</Text>
					</View>
				);
			}}
		/>
	);
}

const styles = StyleSheet.create({
	rowChild: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		backgroundColor: "black",
	},
	rowImg: {
		width: 32,
		height: 32,
		resizeMode: "contain",
	},
	rowText: {
		fontWeight: "500",
		fontSize: 16,
		color: "#FFFFFF",
	},
	simpleContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	simpleImg: {
		width: 32,
		height: 32,
		resizeMode: "contain",
	},
	simpleImgContainer: {
		width: 38,
		height: 38,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black",
		borderRadius: 50,
	},
	simpleText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#666666",
		marginLeft: 16,
	},
	simpleLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default MSelectDropdown;
