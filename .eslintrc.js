module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['react-app', 'react-app/jest'],
  env: {
    browser: true,
    node: true,
  },
  // required to lint *.vue files
  plugins: ['html'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
}
