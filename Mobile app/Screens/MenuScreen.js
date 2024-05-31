import {
	Image,
	ScrollView,
	Text,
	TextInput,
	SafeAreaView,
	View,
	Button,
	TouchableOpacity,
	ImageBackground,
	Modal,
	Pressable,
	TouchableHighlight,
} from "react-native";
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	MaterialCommunityIcons,
	Feather,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Carousel, Card, Switch } from "react-native-ui-lib";
import Colors from "../Components/Colors";
import { logoutUser, fetchUserDetails, isSessionValid } from "../util/Api";
import FadedView from "../Components/FadeView";
import Traffic from "./Traffic";
import PrimaryButton from "../Components/primaryButton";

export default function MenuScreen({ navigation }) {
	const [Notifications, setNotifications] = useState(true);
	const items = [1, 2, 3, 4];

	const renderItem = (item, index) => {
		return (
			<View
				key={index}
				style={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Card>
					<Card.Section
						content={[{ text: `Card ${item}`, text70: true, white: true }]}
						contentStyle={{
							alignItems: "center",
							backgroundColor: "green",
							padding: 12,
							width: 370,
							height: 200,
							justifyContent: "center",
						}}
					/>
				</Card>
			</View>
		);
	};

	return (
		<>
			<ImageBackground
				source={require("../assets/Images/light.png")}
				resizeMode="cover"
				className="flex-1"
				opacity={0.85}
			>
				<View className="flex-1">
					<View intensity={90}>
						<View className="p-4 pt-12 flex-row justify-between items-center ">
							<View className="flex-row justify-between items-center">
								{/* <Image
								source={require("../assets/Images/Emblem_of_India.png")}
								className="w-[12%] h-[100%]"
								tintColor={"#0062f5"}
							/> */}
								<Ionicons
									name="person-circle"
									size={26}
									color={Colors.primaryBlue}
									style={{ marginRight: 6 }}
								/>

								<Text className="text-primaryBlue text-lg text-center font-bold">
									Anti Corruptō
								</Text>
							</View>

							<View className="flex-row justify-between items-center">
								<Feather
									name="bell"
									size={24}
									color={Colors.primaryBlue}
									style={{ padding: 2, paddingHorizontal: 8 }}
								/>
								<AntDesign
									name="search1"
									size={24}
									color={Colors.primaryBlue}
									style={{ padding: 2, paddingHorizontal: 8, paddingRight: 2 }}
								/>
							</View>
						</View>

						<TouchableOpacity className="p-4 m-3 mb-4 mt-[-1] rounded-2xl ">
							<View className="flex-row justify-end items-center">
								<Feather name="edit" size={15} color={"black"} />
							</View>

							<View className="mt-[-2] ml-1 flex-row justify-start items-center">
								<Image
									source={require("../assets/Images/modi.jpeg")}
									style={{
										width: 120,
										height: 120,
										borderRadius: 60,
										borderWidth: 2,
										borderColor: "#696969ff",
									}}
								/>
								<View>
									<Text className=" text-xl font-bold ml-4">Dr. Narendra Modi</Text>
									<Text className=" text-xs ml-4">Web Developer</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>

					{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}

					<View
						className="flex-1 rounded-t-[32px] bg-white pt-3 overflow-hidden"
						style={{
							elevation: 30,
						}}
					>
						<ScrollView
							className="space-y-4 rounded-3xl overflow-hidden mx-2 p-3 "
							showsVerticalScrollIndicator={false}
							// fadingEdgeLength={200}
						>
							<TouchableOpacity className="flex-row justify-between items-center">
								<View className="flex-row items-center">
									<View
										intensity={88}
										tint="light"
										style={{
											borderTopLeftRadius: 16,
											borderBottomLeftRadius: 16,
											borderTopRightRadius: 16,
											borderBottomRightRadius: 16,
											overflow: "hidden",
											backgroundColor: Colors.primaryBlue,
											height: 50,
											width: 50,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Feather name="activity" size={24} color="white" />
									</View>
									<Text className="text-base font-medium mx-2 p-4 ">My Activity</Text>
								</View>
								<View>
									<MaterialIcons name="keyboard-arrow-right" size={24} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => navigateTo(6)}
								className="flex-row justify-between items-center"
							>
								<View className="flex-row items-center">
									<View
										intensity={88}
										tint="light"
										style={{
											borderTopLeftRadius: 16,
											borderBottomLeftRadius: 16,
											borderTopRightRadius: 16,
											borderBottomRightRadius: 16,
											overflow: "hidden",
											backgroundColor: Colors.primaryBlue,
											height: 50,
											width: 50,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<MaterialCommunityIcons name="car-multiple" size={24} color="white" />
									</View>
									<Text className="text-base font-medium mx-2 p-4 ">My Vehicles</Text>
								</View>
								<View>
									<MaterialIcons name="keyboard-arrow-right" size={24} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity className="flex-row justify-between items-center">
								<View className="flex-row items-center">
									<View
										intensity={88}
										tint="light"
										style={{
											borderTopLeftRadius: 16,
											borderBottomLeftRadius: 16,
											borderTopRightRadius: 16,
											borderBottomRightRadius: 16,
											overflow: "hidden",
											backgroundColor: Colors.primaryBlue,
											height: 50,
											width: 50,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Ionicons name="language" size={24} color="white" />
									</View>
									<Text className="text-base font-medium mx-2 p-4 ">Language</Text>
								</View>
								<View>
									<MaterialIcons name="keyboard-arrow-right" size={24} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								className="flex-row justify-between items-center"
								onPress={() => {
									setNotifications(!Notifications);
								}}
							>
								<View className="flex-row items-center">
									<View
										intensity={88}
										tint="light"
										style={{
											borderTopLeftRadius: 16,
											borderBottomLeftRadius: 16,
											borderTopRightRadius: 16,
											borderBottomRightRadius: 16,
											overflow: "hidden",
											backgroundColor: Colors.primaryBlue,
											height: 50,
											width: 50,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Feather name="bell" size={24} color="white" />
									</View>
									<Text className="text-base font-medium mx-2 p-4 ">Notifications</Text>
								</View>
								<View className="mx-1">
									<Switch
										value={Notifications}
										onValueChange={() => {
											setNotifications(!Notifications);
										}}
										onColor={Colors.primaryBlue}
									/>
								</View>
							</TouchableOpacity>

							<TouchableOpacity className="flex-row justify-between items-center">
								<View className="flex-row items-center">
									<View
										intensity={88}
										tint="light"
										style={{
											borderTopLeftRadius: 16,
											borderBottomLeftRadius: 16,
											borderTopRightRadius: 16,
											borderBottomRightRadius: 16,
											overflow: "hidden",
											backgroundColor: Colors.primaryBlue,
											height: 50,
											width: 50,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Feather name="unlock" size={24} color="white" />
									</View>
									<Text className="text-base font-medium mx-2 p-4 ">
										Change Password
									</Text>
								</View>
								<View>
									<MaterialIcons name="keyboard-arrow-right" size={24} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity className="flex-row justify-between items-center">
								<View className="flex-row items-center">
									<View
										intensity={88}
										tint="light"
										style={{
											borderTopLeftRadius: 16,
											borderBottomLeftRadius: 16,
											borderTopRightRadius: 16,
											borderBottomRightRadius: 16,
											overflow: "hidden",
											backgroundColor: Colors.primaryBlue,
											height: 50,
											width: 50,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Feather name="help-circle" size={24} color="white" />
									</View>
									<Text className="text-base font-medium mx-2 p-4 ">Help</Text>
								</View>
								<View>
									<MaterialIcons name="keyboard-arrow-right" size={24} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									navigation.navigate("ChallanPage");
								}}
								className="flex-row justify-between items-center mb-3"
							>
								<View className="flex-row items-center">
									<View
										intensity={88}
										tint="light"
										style={{
											borderTopLeftRadius: 16,
											borderBottomLeftRadius: 16,
											borderTopRightRadius: 16,
											borderBottomRightRadius: 16,
											overflow: "hidden",
											backgroundColor: Colors.primaryBlue,
											height: 50,
											width: 50,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<MaterialIcons name="error-outline" size={24} color="white" />
									</View>
									<Text className="text-base font-medium mx-2 p-4 ">Report</Text>
								</View>
								<View>
									<MaterialIcons name="keyboard-arrow-right" size={24} />
								</View>
							</TouchableOpacity>

							<View className="mb-12 overflow-hidden rounded-xl border border-red-500 ">
								<Pressable
									android_ripple={{ color: "rgb(255, 175, 175)" }}
									className=" p-3 flex-row items-center justify-center space-x-4"
								>
									<Feather name="log-out" size={20} color={"rgb(239, 68, 68)"} />
									<Text className="text-base text-center font-medium text-red-500">
										Log Out
									</Text>
								</Pressable>
							</View>
						</ScrollView>
					</View>
				</View>
			</ImageBackground>
			<StatusBar style="dark" />
		</>
	);
}
