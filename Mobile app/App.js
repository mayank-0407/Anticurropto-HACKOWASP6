import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	FontAwesome5,
	Octicons,
} from "@expo/vector-icons";
import LoginScreen from "./Screens/LoginScreen";
import LoginSplash from "./Screens/LoginSplash";
import SignUpPage from "./Screens/SignUp";
import HomePage from "./Screens/Home";
import MenuScreen from "./Screens/MenuScreen";
import Services from "./Screens/Services";
import Report from "./Screens/Report";
import Traffic from "./Screens/Traffic";
import AddVehicles from "./Screens/AddVehicles";
import AddChallan from "./Screens/ChallanPage";
import vehicleContract from "./Metamask/AddvehicleContract";
import Colors from "./Components/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Web3 from "./Metamask/WalleConnect";


export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<Web3>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="LoginSplash" component={LoginSplash} />
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="SignUp" component={SignUpPage} />
					<Stack.Screen name="Home" component={HomePage} />
					<Stack.Screen name="Services" component={Services} />
					<Stack.Screen name="MenuScreen" component={MenuScreen} />
					<Stack.Screen name="AddVehicles" component={AddVehicles} />
					<Stack.Screen
						name="Traffic"
						component={Traffic}
						screenOptions={{ headerShown: true }}
					/>
					<Stack.Screen name="ChallanPage" component={AddChallan} />
					{/* <Stack.Screen name="Contract" component={vehicleContract} /> */}
				</Stack.Navigator>
			</NavigationContainer>
		</Web3>
	);
}
