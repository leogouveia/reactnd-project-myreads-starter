module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  rules: {
    "strict": 0,
    "react/prefer-es6-class": ["always", "warn"],
    semi: [1, "always"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};
