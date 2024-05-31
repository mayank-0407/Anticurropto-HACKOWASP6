import { View, Text, Pressable } from "react-native";
import Colors from "./Colors";

export default function Card({ outer, children, onPress, textStyle }) {
	return (
		<View className=" my-4 rounded-xl w-full overflow-hidden">
			<Pressable
				android_ripple={{ color: Colors.rippleBlue }}
				onPress={onPress}
			>
				<Text
					className=" px-2 "
					style={[{ color: Colors.primaryBlue }, textStyle]}
				>
					{children}
				</Text>
			</Pressable>
		</View>
	);
}
