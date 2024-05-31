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
	Feather,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
// import { Carousel, Card } from "react-native-ui-lib";
import Colors from "../Components/Colors";
import { logoutUser, fetchUserDetails, isSessionValid } from "../util/Api";
import FadedView from "../Components/FadeView";
import { BlurView } from "expo-blur";
import { getUserVehicles } from "../util/vehicleApi";
import { getChallansById, getAllChallans, deleteChallan } from "../util/challanApi";
import { getSessionToken } from "../util/tokenStore";
import PayChallanContract from "../Metamask/PayChallanContract";
import Web3 from "../Metamask/WalleConnect";

export default function Traffic({ navigation }) {
	const [vehicles, setVehicles] = useState([]);
	const [challans, setChallans] = useState([]);
	const [focused, setFocused] = useState("");

	const getallvehicles = async () => {
		const token = await getSessionToken();
		const thisUser = await fetchUserDetails(token);
		console.log("thisUser.data.id: ", thisUser.data.id);
		// setMyUser(thisUser.data.id);
		const myvehicles = await getUserVehicles(thisUser.data.id);
		// console.log("myvehicles: ", myvehicles);
		setVehicles(myvehicles);
	};

	const getallChallans = async () => {
		const myChallans = await getAllChallans();
		console.log("myChallans: ", myChallans);
		setChallans(myChallans);
	};

	const filteredChallans = challans.filter(
		(challan) => challan.vehicleId === focused
	);

	useEffect(() => {
		const checkSessionValidity = async () => {
			const sessionToken = await getSessionToken();
			try {
				const checkLoginSession = isSessionValid(sessionToken);
				if (checkLoginSession) {
					console.log("get all vehicles : ", sessionToken);
					getallvehicles();
					getallChallans();
				} else {
					navigation.navigate("Login");
				}
			} catch (error) {
				console.log("Error:", error);
			}
		};

		// Check session validity initially
		checkSessionValidity();
	}, []);

	useEffect(() => {
		if (vehicles.length > 0) {
			setFocused(vehicles[0].id);
		}
	}, [vehicles]);

	return (
		<Web3>
			<View className="flex-1 overflow-hidden bg-[#dbebffff] justify-between">
				<View className="mb-6">
					<Text className="mt-8 p-4 font-bold text-base">My Vehicles</Text>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 50 }}
						className="px-3 space-x-3"
					>
						{vehicles.map((vehicle, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => {
									setFocused(vehicle.id);
								}}
								className={
									vehicle.id === focused
										? "rounded-3xl overflow-hidden p-2 bg-[#003b93f5] justify-center"
										: "rounded-3xl overflow-hidden p-2 bg-[#003b93be] justify-center opacity-50"
								}
							>
								<Image
									source={require("../assets/Images/creta.webp")}
									style={{ height: 150, width: 300, borderRadius: 16 }}
								/>

								<View className="mt-1 flex-row items-center justify-between">
									<Text className="text-start p-2 text-base text-white font-bold">
										{vehicle.model}
									</Text>
									<Text className="text-end p-2 text-base text-white font-bold">
										{vehicle.plateNumber}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/*/////////////////////////////////////////////////////////////////////////////////////////////// */}

				<View className=" rounded-t-[32px] bg-[#003b93] p-3 pt-4 ">
					<View className="overflow-hidden rounded-t-[32px] ">
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ paddingBottom: 400 }}
						>
							<View className="overflow-hidden justify-center rounded-t-[32px] rounded-b-[16px] bg-[#9ac3ffff] p-2 ">
								<Text className=" text-base font-bold pt-1 px-3 pb-4">
									Vehicle Info
								</Text>

								<View className="flex-row justify-evenly space-x-4">
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("MyVehicles");
										}}
									>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">Liscence</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">RC</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">Pollution</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">Challans</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View className="overflow-hidden justify-center mt-3  rounded-[16px] bg-[#9ac3ffff] p-2 ">
								<Text className=" text-base font-bold pt-1 px-3 pb-4">
									Chalaan History
								</Text>

								{filteredChallans.length > 0 ? (
									filteredChallans.map((challan, index) => (
										<TouchableOpacity
											key={index}
											className="flex-row justify-between p-3 mx-2 mb-4 rounded-xl bg-[#a1c7ff] border border-[#91bdff]"
											style={{ elevation: 5 }}
										>
											<View>
												<Text className="font-bold text-base">
													{index + 1}. {challan.reason}
												</Text>
												<Text className="font-medium py-1 pl-5">Fine: ₹{challan.fine}</Text>
											</View>
											{/* <Pressable
												android_ripple={{ color: "#9ac3ffff" }}
												className="p-4 px-6 items-center rounded-lg justify-center overflow-hidden bg-primaryBlue"
											>
												<Text className="text-white">Pay</Text>
											</Pressable> */}
											{challan.fine === "0" ? (
												<View className="justify-center items-center px-3 flex-row">
													<Text className=" font-medium pr-2">Paid</Text>
													<AntDesign name="checkcircle" size={20} color="green" />
												</View>
											) : (
												<PayChallanContract challan={challan} amount={0.001} />
											)}
										</TouchableOpacity>
									))
								) : challans === null ? (
									<Text className="p-3 pt-0">Fetching challans...</Text>
								) : (
									<Text className="p-3 pt-0">No challans issued</Text>
								)}
							</View>
						</ScrollView>
					</View>
				</View>
			</View>

			<StatusBar style="dark" />
		</Web3>
	);
}
