/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'vue/multi-word-component-names': 0,
  },
};
