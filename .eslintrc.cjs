module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'tailwindcss/no-custom-classname': 'off',
  },
  settings: {
    tailwindcss: {
      whitelist: ['font-din', 'font-fixture', 'font-gabriele'],
    },
  },
};