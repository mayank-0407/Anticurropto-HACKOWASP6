import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, arbitrum, sepolia } from "viem/chains";
import {
	createWeb3Modal,
	defaultWagmiConfig,
	Web3Modal,
} from "@web3modal/wagmi-react-native";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "ef8575faa68ff415bfe22a4f3f090665";

// 2. Create config
const metadata = {
	name: "Web3Modal RN",
	description: "Connecting web3 wallets to your RN app",
	url: "https://web3modal.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
	redirect: {
		native: "YOUR_APP_SCHEME://",
		universal: "YOUR_APP_UNIVERSAL_LINK.com",
	},
};

const chains = [sepolia];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
	projectId,
	chains,
	wagmiConfig,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const Web3 = ({ children }) => (
	<WagmiConfig config={wagmiConfig}>
		{children}
		<Web3Modal />
	</WagmiConfig>
);

export default Web3;
