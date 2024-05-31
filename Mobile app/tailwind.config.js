// tailwind.config.js
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./Screens/LoginScreen.{js,jsx,ts,tsx}",
		"./Components/primaryButton.{js,jsx,ts,tsx}",
		"./Components/SecondaryButton.{js,jsx,ts,tsx}",
		"./Screens/LoginSplash.{js,jsx,ts,tsx}",
		"./Screens/SignUp.{js,jsx,ts,tsx}",
		"./Screens/Home.{js,jsx,ts,tsx}",
		"./Screens/MenuScreen.{js,jsx,ts,tsx}",
		"./Components/FadeView.{js,jsx,ts,tsx}",
		"./Screens/Services.{js,jsx,ts,tsx}",
		"./Screens/Report.{js,jsx,ts,tsx}",
		"./Screens/Traffic.{js,jsx,ts,tsx}",
		"./Screens/AddVehicles.{js,jsx,ts,tsx}",
		"./Screens/ChallanPage.{js,jsx,ts,tsx}",
		"./Metamask/PayChallanContract.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primaryBlue: "#0062f5",
				rippleBlue: "#002861ff",
				BGblue: "#1e00c7",
			},
		},
	},
	plugins: [],
};
