/**
 * <%= fullName %>
 */

var options = {
  // stages: [
  //   // assemble.utils.plugins.stages.optionsPreConfiguration,
  //   // assemble.utils.plugins.stages.optionsPostConfiguration,
  //   // 'assemble:*:pages'
  // ]
  stages: ['<%= stages.join("','") %>']
};

module.exports = function(assemble) {

  assemble.registerPlugin('<%= fullName %>', '<%= pluginDesc %>', options, function (params, next) {

    console.log('<%= fullName %>', params.stage);

    next();
  });
};