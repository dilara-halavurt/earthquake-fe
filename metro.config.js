const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
// config.resolver.unstable_enablePackageExports = false;
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];
module.exports = config;
