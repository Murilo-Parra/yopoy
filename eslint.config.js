import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.vite/**',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      '*.cjs',
      'src/legacy-quarantine/**'
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-constant-condition': 'off',
      'no-useless-assignment': 'off',
      'prefer-const': 'off',
      'no-empty': 'off',
      'preserve-caught-error': 'off',
      'no-unused-vars': 'off',
      'no-async-promise-executor': 'off',
      'no-prototype-builtins': 'off',
      'require-yield': 'off',
      'no-useless-catch': 'off',
      'no-useless-escape': 'off',
      'no-case-declarations': 'off',
      'no-empty-pattern': 'off',
      'no-fallthrough': 'off',
      'getter-return': 'off',
      'valid-typeof': 'off',
      'no-unsafe-finally': 'off',
      'no-extra-boolean-cast': 'off',
      'no-cond-assign': 'off',
      'no-unsafe-optional-chaining': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off'
    },
  },
];
