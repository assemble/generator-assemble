/**
* Assemble Plugin: <%= _.titleize(pluginName) %>
* https://github.com/<%= authorLogin %>/assemble-plugin-<%= _.underscored(pluginName) %>
*
* Copyright (c) <%= (new Date).getFullYear() %> <%= authorName %>
* @author: https://github.com/<%= authorLogin %>
*
* @param {[type]} params [description]
* @param {Function} callback [description]
* @return {[type]} [description]
*/


var <%= _.classify(pluginName) %> = function(params, next) {
  // your code here
  next();
};

module.exports = <%= _.classify(pluginName) %>;
