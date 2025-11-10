import globals from 'globals'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'no-unused-vars': ['error', { 'caughtErrors': 'all', 'caughtErrorsIgnorePattern': '^_' }],
    },
  },
]