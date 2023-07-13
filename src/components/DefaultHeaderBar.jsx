import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";
import HeaderBar from "./HeaderBar";

function DefaultHeaderBar({
	title,
	rightIconName,
	color,
	style,
	onBackPress,
	onRightPress,
}) {
	return (
		<HeaderBar
			center={
				<Text style={{ color: color, fontSize: 24 }}>
					{title}
				</Text>
			}
			left={<Icon name="chevron-back-outline" color={color} size={24} />}
			right={<Icon name={rightIconName} color={color} size={24} />}
			leftPress={onBackPress}
			rightPress={onRightPress}
			headerBarStyle={style}
		/>
	);
}
export default DefaultHeaderBar;
