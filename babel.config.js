module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          assets: "./src/assets",
          components: "./src/components",
          helpers: "./src/helpers",
          hooks: "./src/hooks",
          localization: "./src/localization",
          modules: "./src/modules",
          store: "./src/store",
          theme: "./src/theme",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
