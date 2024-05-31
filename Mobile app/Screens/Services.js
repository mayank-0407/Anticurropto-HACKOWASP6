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
	Dimensions,
	Alert,
} from "react-native";
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	Feather,
	Octicons,
	FontAwesome5,
	FontAwesome6,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
// import { Carousel, Card } from "react-native-ui-lib";
import Colors from "../Components/Colors";
import { logoutUser, fetchUserDetails, isSessionValid } from "../util/Api";
import FadedView from "../Components/FadeView";
import Traffic from "./Traffic";
import { addVehicle } from "../util/vehicleApi";
import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";
import Web3 from "../Metamask/WalleConnect";
import addVehicleABI from "../Metamask/ABI's/addVehicleABI.json";
import { useAccount } from "wagmi";
import { getSessionToken } from "../util/tokenStore";

export default function Services({ route, navigation }) {
	const width = Dimensions.get("window").width;
	// const { address, isConnecting, isDisconnected } = useAccount();

	// //Reading the contract (getUserVehicles)
	// const { data, isError, isLoading, isSuccess } = useContractRead({
	// 	address: "0xe1eeeff54b4ebe113c383315ecd49b494cf32c46",
	// 	abi: addVehicleABI,
	// 	functionName: "getUserVehicles",
	// 	args: [address],
	// });

	// //adding data to api

	// const handleAddVehicles = async (vehicles) => {
	// 	try {
	// 		vehicles = vehicles.map(item => {
	// 			const { vehicleId, ...rest } = item;
	// 			return rest;
	// 		});
	// 		// console.log("vehicles stripped", vehicles);
	// 		const token = await getSessionToken();
	// 		// console.log("IN ADD vehicle 'token'", token);
	// 		const thisuser = await fetchUserDetails(token);
	// 		// console.log("IN ADD vehicle 'thisuser'", thisuser);
	// 		const userId = thisuser.data.id;
	// 			console.log(vehicles)

	// 		// Now you can send `vehicleData` to your backend API			////////////////
	// 		const addVehiclePromises = vehicles.map(async (vehicleDetails) => {
				// vehicleDetails.ownerId = userId;
	// 			console.log("Vehicle details in map : ", vehicleDetails);

	// 			// vehicleDetails.vehicleID = toString(vehicleDetails.vehicleID);
	// 			vehicleDetails.year = vehicleDetails.year.toString();
	// 			console.log("Vehicle details in map : ", vehicleDetails);
	// 			const res = await addVehicle(vehicleDetails);
	// 			if (res.status !== 200) {
	// 				throw new Error("Error in adding vehicle");
	// 			}
	// 		});

	// 		await Promise.all(addVehiclePromises);

	// 		navigation.navigate("Traffic");
	// 	} catch (error) {
	// 		console.log(error);
	// 		alert("Error in adding vehicles");
	// 	}
	// };


	return (
		<Web3>
			<ImageBackground
				source={require("../assets/Images/light.png")}
				resizeMode="cover"
				className="flex-1"
				opacity={0.25}
			>
				<View className="flex-1">
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
							<MaterialIcons
								name="qr-code-scanner"
								size={24}
								color={Colors.primaryBlue}
								style={{ padding: 2, paddingHorizontal: 8 }}
							/>
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

					<View className="border border-gray-400 px-3 py-1 rounded-lg mt-2 mb-1 mx-5">
						<TextInput placeholder="Search" />
					</View>

					<View className="flex-1 items-start justify-center">
						<Text className=" text-md text-gray-600 font-bold mx-2 p-4 ">
							Choose a category
						</Text>

						<ScrollView
							className="space-y-2 px-1 flex-1 mt-[-10]"
							showsVerticalScrollIndicator={false}
							fadingEdgeLength={200}
						>
							<TouchableOpacity
								onPress={async () => {
									/////////////////////////////////////////////////////////////here//////////////////////////
									await handleAddVehicles(data);

									if (isLoading) {
										console.log("Loading...");
									}
									// if (isSuccess) {
									// 	console.log("Vehicle read successfully: ", data);
									// }
									// navigation.navigate("Traffic");
								}}
								className=" flex-row justify-between items-center p-4 m-4 border-gray-400 rounded-lg bg-white"
								style={{ elevation: 3, width: "92%" }}
							>
								<View className="flex-row justify-between items-center space-x-4">
									<FontAwesome5 name="car" size={24} color="rgb(31 41 55)" />
									<Text className="font-bold text-gray-700 text-base">Traffic</Text>
								</View>

								<MaterialIcons
									name="arrow-forward-ios"
									size={18}
									color="rgb(31 41 55)"
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									navigation.navigate("Traffic");
								}}
								className=" flex-row justify-between items-center p-4 m-4 border-gray-400 rounded-lg bg-white"
								style={{ elevation: 3, width: "92%" }}
							>
								<View className="flex-row justify-between items-center space-x-4">
									<MaterialIcons name="landscape" size={24} color="rgb(31 41 55)" />
									<Text className="font-bold text-gray-700 text-base">
										Land Registery
									</Text>
								</View>

								<MaterialIcons
									name="arrow-forward-ios"
									size={18}
									color="rgb(31 41 55)"
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									navigation.navigate("Traffic");
								}}
								className=" flex-row justify-between items-center p-4 m-4 border-gray-400 rounded-lg bg-white"
								style={{ elevation: 3, width: "92%" }}
							>
								<View className="flex-row justify-between items-center space-x-4">
									<MaterialCommunityIcons name="vote" size={24} color="rgb(31 41 55)" />
									<Text className="font-bold text-gray-700 text-base">Voting</Text>
								</View>

								<MaterialIcons
									name="arrow-forward-ios"
									size={18}
									color="rgb(31 41 55)"
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									navigation.navigate("Traffic");
								}}
								className=" flex-row justify-between items-center p-4 m-4 border-gray-400 rounded-lg bg-white"
								style={{ elevation: 3, width: "92%" }}
							>
								<View className="flex-row justify-between items-center space-x-4 pl-1">
									<FontAwesome6 name="file-contract" size={23} color="rgb(31 41 55)" />
									<Text className="font-bold text-gray-700 text-base">Contracts</Text>
								</View>

								<MaterialIcons
									name="arrow-forward-ios"
									size={18}
									color="rgb(31 41 55)"
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									navigation.navigate("Traffic");
								}}
								className=" flex-row justify-between items-center p-4 m-4 border-gray-400 rounded-lg bg-white"
								style={{ elevation: 3, width: "92%" }}
							>
								<View className="flex-row justify-between items-center space-x-4 pl-1">
									<FontAwesome5 name="landmark" size={21} color="rgb(31 41 55)" />
									<Text className="font-bold text-gray-700 text-base">Funds</Text>
								</View>

								<MaterialIcons
									name="arrow-forward-ios"
									size={18}
									color="rgb(31 41 55)"
								/>
							</TouchableOpacity>
						</ScrollView>
					</View>

					{/* <View className="flex-1"></View> */}
				</View>
			</ImageBackground>

			<StatusBar style="dark" />

			<View
				className="border border-gray-200 flex-row justify-evenly m-2 bg-white absolute bottom-1 right-1 overflow-hidden left-1"
				style={{
					borderTopLeftRadius: 16,
					borderBottomLeftRadius: 16,
					borderTopRightRadius: 16,
					borderBottomRightRadius: 16,
					elevation: 10,
				}}
			>
				<TouchableOpacity
					className=" p-2 px-6 items-center"
					onPress={() => {
						navigation.navigate("Home");
					}}
				>
					<Ionicons name="home" size={26} color={"#0062f5"} />
					<Text className="text-primaryBlue text-xs">Home</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className=" p-2 px-6 items-center"
					onPress={() => {
						navigation.navigate("Services");
					}}
				>
					<Octicons name="apps" size={26} color={"#454545"} />
					<Text className="text-[#454545] text-xs">Services</Text>
				</TouchableOpacity>

				<TouchableOpacity className=" p-2 px-6 items-center">
					<Ionicons name="person" size={26} color={"#454545"} />
					<Text className="text-[#454545] text-xs">Menu</Text>
				</TouchableOpacity>
			</View>
		</Web3>
	);
}
