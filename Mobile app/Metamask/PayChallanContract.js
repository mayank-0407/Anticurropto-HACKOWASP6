import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../Components/primaryButton";
import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
	useSendTransaction,
	usePrepareSendTransaction,
} from "wagmi";
import { parseEther } from "viem";
import ChallanABI from "./ABI's/ChallanABI.json";
import Web3 from "./WalleConnect";
import { addVehicle } from "../util/vehicleApi";
import { getSessionToken } from "../util/tokenStore";
import { fetchUserDetails } from "../util/Api";
import { useNavigation } from "@react-navigation/native";
import { updateChallan } from "../util/challanApi";

export default function PayChallanContract({ amount, challan }) {

	const { config } = usePrepareSendTransaction({
		to: "0x8e6065baccC5B3a9F68DD974F0d06E1D804797B6",
		value: parseEther(amount.toString()),
	});

	const { data, isLoading, isSuccess, sendTransaction } =
		useSendTransaction(config);

	useEffect(() => {
		const updatePayment = async () => {
			if (isLoading) {
				console.log("Loading...");
			}
			if (isSuccess) {
				console.log("Challan Paid successfully", JSON.stringify(data));
				try {
					const updateinDB = await updateChallan(challan);
					if (updateinDB.status == 200) {
						console.log("Challan Payment done, also updated in DB successfully");
					} else {
						console.log(
							"Error updating challan in DB, status code:",
							updateinDB.status
						);
					}
				} catch (error) {
					console.log("Error updating challan in DB", error);
				}
			}
		};

		updatePayment();
	}, [isLoading, isSuccess]);

	return (
		<Web3>
			<Pressable
				android_ripple={{ color: "#9ac3ffff" }}
				className="p-4 px-6 items-center rounded-lg justify-center overflow-hidden bg-primaryBlue"
				onPress={() => {
					try {
						sendTransaction?.();
					} catch (error) {
						console.log(error);
					}
				}}
			>
				<Text className="text-white">Pay</Text>
			</Pressable>
		</Web3>
	);
}
