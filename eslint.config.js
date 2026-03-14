import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import vueParser from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    plugins: {
      '@typescript-eslint': typescript,
      vue,
      prettier,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-macros-order': [
        'error',
        { order: ['defineProps', 'defineEmits'] },
      ],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],

      // General rules
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // Use TypeScript rule instead
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '*.d.ts'],
  },
]
