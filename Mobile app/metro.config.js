const { getDefaultConfig } = require("@expo/metro-config");
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
	...require("node-libs-expo"),
};

config.transformer.getTransformOptions = async () => ({
	transform: {
		experimentalImportSupport: false,
		inlineRequires: true,
	},
});

module.exports = config;
