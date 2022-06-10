/**
 * @type {import("eslint/lib/shared/types").ConfigData}
 */
const config = {
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  ignorePatterns: [".next/**", "node_modules/**"],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    process: true,
  },
  rules: {
    "react/jsx-sort-props": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 1,
  },
  overrides: [
    {
      files: ["./*.config.js", ".eslintrc.js"],
      env: {
        node: true,
      },
    },
  ],
};

module.exports = config;
