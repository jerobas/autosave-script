module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['import-helpers'],
    rules: {
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            '/^src/schemas/',
            '/^src/models/',
            '/^src/components/',
            '/^src/pages/',
            '/^src/utils/',
            '/^src/services/',
            '/^src/styles/',
            '/^src/assets/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ]
    },
  };
  