module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: '2023', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', "@typescript-eslint"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Disable the prop-types rule
  },
}
