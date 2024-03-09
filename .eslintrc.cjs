module.exports = {
  plugins: ['@stylistic'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
  ],
  rules: {
    '@stylistic/semi': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: ture }],
  },
};
