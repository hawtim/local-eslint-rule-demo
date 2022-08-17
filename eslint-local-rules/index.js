'use strict';

const disallowEmptyCatch = require('./disallow-empty-catch');
const disallowSomeModule = require('./disallow-some-module')

module.exports = {
  "disallow-empty-catch": disallowEmptyCatch,
  "disallow-some-module": disallowSomeModule
};