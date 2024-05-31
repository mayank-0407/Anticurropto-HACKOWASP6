import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Button,
} from "react-native";
import PrimaryButton from "../Components/primaryButton";
import Colors from "../Components/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from "yup";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import { signUpUser, loginUser } from "../util/Api";

const PasswordSchema = Yup.object().shape({
	password: Yup.string()
		.min(4, "*Passsword Should be min of 4 characters")
		.max(16, "*Password should be max of 16 characters")
		.required("*Password is required"),

	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "*Passwords must match")
		.required("*Password is required"),

	phone: Yup.string()
		.min(10, "*Phone number must be 10 digits")
		.required("*Phone number is required"),
});

export default function SignUpPage({ navigation }) {
	const [hidePassword, setHidePassword] = useState(true);
	const [hideCPassword, setHideCPassword] = useState(true);

	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const handleSubmit = async (values) => {
		try {
			await signUpUser(values);
			// const response = await loginUser(values);
			// navigation.navigate("Home", response.session.sessionToken);
			navigation.navigate("Login");
		} catch (error) {
			console.log(error);
		}
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	return (
		<View className="flex-1">
			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
					phone: "",
					checked: true,
				}}
				validationSchema={PasswordSchema}
				onSubmit={(values) => {
					// console.log(values);
					handleSubmit(values);
				}}
			>
				{({ handleChange, handleSubmit, values, touched, errors }) => (
					<View className=" flex-1 flex-col justify-evenly items-center w-full h-full bg-white p-3">
						<View className=" my-10 py-14 ">
							<Text
								className="text-2xl font-bold text-center"
								style={{ color: Colors.primaryBlue }}
							>
								LOGO
							</Text>
						</View>

						<View className=" flex-col w-full px-4 justify-between ">
							<View className=" pb-12 mb-4 justify-between">
								<TextInput
									className=" mb-4 border-b border-gray-200 py-2 px-2 text-base text-gray-700"
									placeholder="Name"
									onChangeText={handleChange("name")}
									value={values.name}
								/>
								<TextInput
									className=" mb-4 border-b border-gray-200 py-2 px-2 text-base text-gray-700"
									placeholder="Email"
									onChangeText={handleChange("email")}
									value={values.email}
								/>

								<View className="flex-row justify-between border-gray-200 ">
									<TextInput
										className="flex-1 border-b mr-6 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Phone"
										keyboardType="numeric"
										maxLength={10}
										onChangeText={handleChange("phone")}
										value={values.phone}
									/>

									<View className="flex-row ">
										<Text className=" pt-3 px-2 text-center justify-center">
											Date of Birth:
										</Text>
										<TouchableOpacity
											onPress={showDatepicker}
											className="px-2 flex justify-center items-end py-2 border-b border-gray-200"
										>
											<Text>
												{date.toLocaleDateString("en-GB", {
													day: "2-digit",
													month: "2-digit",
													year: "numeric",
												})}
											</Text>
										</TouchableOpacity>
										{show && (
											<DateTimePicker
												testID="dateTimePicker"
												value={date}
												mode={mode}
												is24Hour={false}
												onChange={onChange}
											/>
										)}
									</View>
								</View>
								{touched.phone && errors.phone && (
									<Text className="text-red-600 px-2 my-1 text-xs">{errors.phone}</Text>
								)}

								<View className="mt-4 flex-row justify-between border-b border-gray-200">
									<TextInput
										className="py-2 px-2 text-base text-gray-700"
										placeholder="Password"
										secureTextEntry={hidePassword}
										onChangeText={handleChange("password")}
										value={values.password}
									/>

									<TouchableOpacity
										onPress={() => setHidePassword(!hidePassword)}
										className="px-2 flex justify-center items-end py-2 "
									>
										<Text className=" text-right text-gray-500">
											{hidePassword ? "Show" : "Hide"}
										</Text>
									</TouchableOpacity>
								</View>

								{touched.password && errors.password && (
									<Text className="text-red-600 px-2 my-1 text-xs">
										{errors.password}
									</Text>
								)}

								<View className="mt-4 flex-row justify-between border-b border-gray-200">
									<TextInput
										className="py-2 px-2 text-base text-gray-700"
										placeholder="Confirm Password"
										secureTextEntry={hideCPassword}
										onChangeText={handleChange("confirmPassword")}
										value={values.confirmPassword}
									/>

									<TouchableOpacity
										onPress={() => setHideCPassword(!hideCPassword)}
										className="px-2 flex justify-center items-end py-2 "
									>
										<Text className=" text-right text-gray-500">
											{hideCPassword ? "Show" : "Hide"}
										</Text>
									</TouchableOpacity>
								</View>

								{touched.confirmPassword && errors.confirmPassword && (
									<Text className="text-red-600 px-2 my-1 text-xs">
										{errors.confirmPassword}
									</Text>
								)}

								<View className="flex-row justify-start items-center px-2 my-4 ">
									<BouncyCheckbox
										size={14}
										fillColor={Colors.primaryBlue}
										isChecked={values.checked}
										iconStyle={{ borderColor: "gray", borderRadius: 3, marginRight: -9 }}
										innerIconStyle={{ borderColor: "gray", borderRadius: 3 }}
										onPress={() => {
											values.checked = !values.checked;
											handleChange("checked");
										}}
										text="Remember me"
										textStyle={{
											color: "gray",
											fontSize: 14,
											textDecorationLine: "none",
										}}
									/>
								</View>
								<View className=" my-2">
									<PrimaryButton
										onPress={() => {
											handleSubmit();
											console.log({ errors });
											// navigation.navigate("Login");
										}}
									>
										Sign In
									</PrimaryButton>
								</View>
							</View>

							<View className=" flex-row p-4 mb-4 justify-center items-center">
								<Text>Already have an account?</Text>
								<TouchableOpacity
									className="px-2 "
									onPress={() => navigation.navigate("Login")}
								>
									<Text className="text-primaryBlue text-base font-semibold ">
										Login
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			</Formik>
		</View>
	);
}
