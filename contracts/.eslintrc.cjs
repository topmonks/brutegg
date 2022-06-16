module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    node: true,
    es6: true,
  },
  globals: {
    artifacts: true,
    contract: true,
  },
  overrides: [
    {
      files: ["test/*", "**/*.test.js"],
      env: {
        mocha: true,
      },
      globals: {
        it: true,
        assert: true,
      },
    },
    {
      files: ["scripts/*"],
      globals: {
        web3: true,
      },
    },
  ],
};
