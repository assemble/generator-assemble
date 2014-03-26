/**
 * Handlebars Helper: {{<%= _.slugify(name) %>}}
 */

module.exports.register = function (Handlebars, options, params) {
  'use strict';

  var assemble = params.assemble;
  var grunt = params.grunt;
  var opts = options || {};

  /**
   * {{<%= _.slugify(name) %>}}
   */
  Handlebars.registerHelper('<%= _.camelCase(name) %>', function (comment, options) {
    var tmpl = '<!-- Comment provided by the <%= _.camelCase(name) %> helper: {{comment}} -->';
    return new Handlebars.SafeString(options.fn(tmpl, {
      comment: comment
    }));
  });

};