/**
 * @type {import("eslint/lib/shared/types").ConfigData}
 */
const config = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ["promise"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
};

module.exports = config;
