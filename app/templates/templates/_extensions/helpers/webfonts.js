/**
 * Handlebars Helpers: {{webfonts}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("webfonts", function(context) {
    return new Handlebars.SafeString('"' + context.join('", "') + '"');
  });
};