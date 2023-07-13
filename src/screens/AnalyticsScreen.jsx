import { useState, useMemo } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	FlatList,
} from "react-native";
import { commonStyles } from "../commonStyles";
import DefaultHeaderBar from "../components/DefaultHeaderBar";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { LineChart } from "react-native-chart-kit";
import Expense from "../components/Expense";
import { useSelector } from "react-redux";
import {MImages, MNames} from "../data/data";


// These function find Top 3 expenses
const findTopThree = (expenseList) => {
	// find top 3 largest numbers in expenseList

	const amountToNumber = (amount) => {
		return Number(amount.slice(2));
	};

	let numberOne = { amount: "-$0.0" };
	let numberTwo = { amount: "-$0.0" };
	let numberThree = { amount: "-$0.0" };
	for (let i = 0; i < expenseList.length; i++) {
    if (expenseList[i].amount[0] === "+") {
      continue;
    }
		if (
			amountToNumber(expenseList[i].amount) > amountToNumber(numberOne.amount)
		) {
			numberThree = numberTwo;
			numberTwo = numberOne;
			numberOne = expenseList[i];
		} else if (
			amountToNumber(expenseList[i].amount) > amountToNumber(numberTwo.amount)
		) {
			numberThree = numberTwo;
			numberTwo = expenseList[i];
		} else if (
			amountToNumber(expenseList[i].amount) > amountToNumber(numberThree.amount)
		) {
			numberThree = expenseList[i];
		}
	}
  if (numberThree.amount === "-$0.0") {
    return [numberOne, numberTwo];
  }
  return [numberOne, numberTwo, numberThree];
};

const SimpleButton = ({ text, bgClr, onPress, clr }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[{ backgroundColor: bgClr }, styles.simpleButton]}
			onPress={onPress}
		>
			<Text style={[styles.simpleText, { color: clr }]}>{text}</Text>
		</TouchableOpacity>
	);
};
const TextWithIcon = ({ text, icon, onPress }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				marginTop: 48,
				marginBottom: 24,
			}}
		>
			<Text style={{ color: "#222222", fontSize: 18, fontWeight: 600 }}>
				{text}
			</Text>
			<TouchableOpacity activeOpacity={0.6} onPress={onPress}>
				<Icon name={icon} color="#666666" size={18} />
			</TouchableOpacity>
		</View>
	);
};
const SelectFilter = ({ selected, setSelected }) => {
	return (
		<View style={styles.filterContainer}>
			<SimpleButton
				text={"Day"}
				bgClr={selected === 0 ? "#438883" : "transparent"}
				onPress={() => setSelected(0)}
				clr={selected === 0 ? "#FFFFFF" : "#666666"}
			/>

			<SimpleButton
				text={"Week"}
				bgClr={selected === 1 ? "#438883" : "transparent"}
				onPress={() => setSelected(1)}
				clr={selected === 1 ? "#FFFFFF" : "#666666"}
			/>

			<SimpleButton
				text={"Month"}
				bgClr={selected === 2 ? "#438883" : "transparent"}
				onPress={() => setSelected(2)}
				clr={selected === 2 ? "#FFFFFF" : "#666666"}
			/>

			<SimpleButton
				text={"Year"}
				bgClr={selected === 3 ? "#438883" : "transparent"}
				onPress={() => setSelected(3)}
				clr={selected === 3 ? "#FFFFFF" : "#666666"}
			/>
		</View>
	);
};
const filterData = ["Expense", "Trascations"];
function AnalyticsScreen({ navigation }) {
	const [index, setIndex] = useState(0);
	const expenseList = useSelector((state) => state.expenseList);

  const filteredExpenseList = useMemo(() => {
    return findTopThree(expenseList);
  }, [expenseList]);

	return (
		<View style={commonStyles.container}>
			<DefaultHeaderBar
				title={"Statistics"}
				rightIconName="stats-chart-outline"
				color={"#222222"}
				onBackPress={() => navigation.goBack()}
			/>
			<View style={styles.mainContainer}>
				<SelectFilter selected={index} setSelected={setIndex} />
				<View style={styles.selectContainer}>
					<SelectDropdown
						data={filterData}
						onSelect={(selectedItem, index) => {
						}}
						defaultButtonText={"Select type"}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							return item;
						}}
						buttonStyle={styles.dropdown1BtnStyle}
						buttonTextStyle={styles.dropdown1BtnTxtStyle}
						renderDropdownIcon={(isOpened) => {
							return (
								<Icon
									name={isOpened ? "chevron-up" : "chevron-down"}
									color={"#666666"}
									size={14}
								/>
							);
						}}
						dropdownIconPosition={"right"}
						defaultValueByIndex={0}
					/>
				</View>
				<ScrollView horizontal={true} style={{ flexGrow: 0 }}>
					<LineChart
						data={{
							labels: [
								"Jan",
								"Feb",
								"Mar",
								"Apr",
								"May",
								"Jun",
								"Jul",
								"Aug",
								"Sep",
								"Oct",
								"Nov",
								"Dec",
							],
							datasets: [
								{
									data: [
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
									],
								},
							],
						}}
						width={Dimensions.get("window").width} // from react-native
						height={220}
						withInnerLines={false}
						withHorizontalLabels={false}
						withOuterLines={false}
						yAxisLabel="$"
						yAxisSuffix="k"
						yAxisInterval={1} // optional, defaults to 1
						chartConfig={{
							backgroundColor: "white",
							backgroundGradientFrom: "#438883",

							backgroundGradientFromOpacity: 1,
							backgroundGradientToOpacity: 1,
							backgroundGradientTo: "#438883",
							decimalPlaces: 2, // optional, defaults to 2dp
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16,
							},
							propsForDots: {
								r: "6",
								strokeWidth: "2",
								stroke: "#ffa726",
							},
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 16,
							paddingRight: 16,
						}}
					/>
				</ScrollView>
				<TextWithIcon text={"Top Spending"} icon={"filter-outline"} />
				<FlatList
					data={filteredExpenseList}
					renderItem={({ item, index }) => (
						<Expense
              id={item.id}
              index={index}
              title={item.title}
              category={item.category}
							date={item.date}
							amount={item.amount}
							invoice={item.invoice}
              navigation={navigation}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: "100%",
		marginTop: 130,
		paddingHorizontal: 32,
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 8,
	},
	simpleButton: {
		padding: 10,
		width: 90,
		alignItems: "center",
		borderRadius: 10,
	},
	simpleText: {
		color: "#666666",
		fontSize: 13,
	},

	selectContainer: {
		alignItems: "flex-end",
		marginTop: 24,
		marginBottom: 24,
	},
	dropdown1BtnStyle: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#666666",
		borderRadius: 10,
		paddingHorizontal: 16,
	},
	dropdown1BtnTxtStyle: {
		color: "#666666",
		fontSize: 14,
		fontWeight: "500",
	},
});

export default AnalyticsScreen;
