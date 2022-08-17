module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential"
  ],
  settings: {
    stores: './src/store/index.js'
  },
  "plugins": [
    "eslint-plugin-local-rules",
  ],
  "rules": {
    "local-rules/disallow-empty-catch": 2,
    "local-rules/disallow-some-module": [
      2,
      [
        'aModule',
      ]
    ]
  }
}