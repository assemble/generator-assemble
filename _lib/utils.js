var path = require('path');
var _ = require('lodash');


exports.app = function(filepath) {
  return path.join('../../app/templates', filepath);
};
