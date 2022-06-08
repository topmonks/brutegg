module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ["promise"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
};
