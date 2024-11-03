import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{cy.js,config.js,test.js}"],
    rules: {
      "no-unused-vars": "off",
      "no-warning-comments": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "no-duplicate-imports": "off",
    },
  },
];
