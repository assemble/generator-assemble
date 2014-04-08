var path = require('path');
var _ = require('lodash');

var prefixes = [
  'assemble',
  'assemble-contrib',
  'assemble-plugin',
  'filter',
  'generator',
  'grunt',
  'gulp',
  'handlebars-helper',
  'helper',
  'mixin',
  'plugin',
  'verb'
];

exports.safename = function (name, patterns) {
  var remove = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '$1');
};