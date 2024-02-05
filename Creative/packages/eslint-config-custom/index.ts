module.exports = {
    extends: ["next", "turbo", "prettier", "react-hooks"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
    },
    parserOptions: {
      babelOptions: {
        presets: [require.resolve("next/babel")],
      },
    },
  };