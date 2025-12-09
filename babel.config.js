// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:@react-native/babel-preset',
      'nativewind/babel',            // 👈 use NativeWind as a PRESET
    ],
    plugins: [
      'react-native-reanimated/plugin', // 👈 keep Reanimated as a PLUGIN, last
    ],
  };
};
