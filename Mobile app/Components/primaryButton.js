import { View, Text, Pressable } from "react-native";
import Colors from "./Colors";

export default function PrimaryButton({ outer, children, onPress }) {
	return (
		<View className=" rounded-xl w-full overflow-hidden " style={outer}>
			<Pressable
				className=" py-3 "
				style={{ backgroundColor: Colors.primaryBlue }}
				android_ripple={{ color: Colors.rippleBlue }}
				onPress={onPress}
			>
				<Text className=" text-white text-center font-bold text-base ">
					{children}
				</Text>
			</Pressable>
		</View>
	);
}
