module.exports = {
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
