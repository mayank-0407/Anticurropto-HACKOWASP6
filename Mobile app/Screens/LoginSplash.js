import React from "react";
import {
	ImageBackground,
	Pressable,
	Text,
	View,
	StyleSheet,
	Image,
} from "react-native";
import PrimaryButton from "../Components/primaryButton";
import { loginUser } from "../util/Api";
import Colors from "../Components/Colors";

export default function LoginSplash({ navigation }) {

	return (
		<ImageBackground
			source={require("../assets/Images/Splash02.png")}
			resizeMode="cover"
			className="flex-1"
		>
			<View className="flex-1 justify-between items-center p-8">
				<Image
					source={require("../assets/Images/Emblem_of_India.png")}
					className=" w-40 h-2/5 mt-16"
				/>
				<View className=" w-full mb-4">
					<View className=" rounded-xl mb-4 w-full overflow-hidden">
						<Pressable
							className=" bg-white py-3 "
							android_ripple={{ color: "hsla(215, 100%, 50%, 0.368)" }}
							onPress={() => {
								navigation.navigate("Login");
							}}
						>
							<Text
								className=" text-center font-bold text-base "
								style={{ color: Colors.primaryBlue }}
							>
								Login
							</Text>
						</Pressable>
					</View>
					<PrimaryButton
						onPress={() => {
							navigation.navigate("SignUp");
						}}
						outer={styles.border}
					>
						Sign up
					</PrimaryButton>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	border: {
		borderWidth: 2,
		borderColor: "white",
	},
});
