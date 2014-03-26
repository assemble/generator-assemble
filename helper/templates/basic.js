/**
 * Handlebars Helper: {{<%= _.slugify(name) %>}}
 */

module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('<%= _.camelCase(name) %>', function (name) {
    return name.toLowerCase();
  });
};