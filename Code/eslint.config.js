import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['src/**/*.ts', 'src/**/*.tsx'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
