module.exports = {
  extends: ["next", "turbo", "prettier", "plugin:react-hooks/recommended", './eslint-custom.js'],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: ["next/babel"],
    },
  },
};
