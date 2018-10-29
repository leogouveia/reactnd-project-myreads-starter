// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const { defaults } = require("jest-config");
module.exports = {
  setupFiles: ["raf/polyfill", "<rootDir>/src/__tests__/setupTests.js"],
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testMatch: [
    "**/__tests__/**/(*.)+(spec|test).js?(x)",
    "!**/__tests__/**/setupTests.js",
    "**/?(*.)+(spec|test).js?(x)"
  ],
  coverageDirectory: "<rootDir>/src/__tests__/coverage",
  coverageReporters: ["json"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js"
  }
};
