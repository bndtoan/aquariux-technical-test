const defaultGroups = [
  '^react',
  '^@react?\\w',
  '^@?\\w',
  '^\\u0000',
  '^\\.\\.(?!/?$)',
  '^\\.\\./?$',
  //============================
];

module.exports = {
  root: true,
  extends: 'satya164',
  plugins: ['simple-import-sort'],
  settings: {
    'react': { version: '16' },
    'import/resolver': { typescript: {} },
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': ['error', { groups: [defaultGroups] }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
