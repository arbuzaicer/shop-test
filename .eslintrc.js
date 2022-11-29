module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
            bracketLine: true,
          },
        ],
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-empty-interface": "off",
        "no-shadow": "off",
        "no-undef": "off",
        "react/react-in-jsx-scope": "off",
        quotes: ["error", "double"],
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^@?\\w"],
              [
                `^(assets|components|helpers|hooks|localization|modules|store|theme)(/.*|$)`,
              ],
            ],
          },
        ],
        "simple-import-sort/exports": "error",
      },
    },
  ],
};
