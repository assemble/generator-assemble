var url = require('url');
var file = require('fs-utils');


/**
 * Count the number of files returned from the
 * given glob pattern.
 *
 */

exports.fileCount = function(str) {
  return file.expand(str).length;
};


/**
 * Get the hostname of a URL
 * @param   {String}  str  The full URL to parse
 * @return  {String}       The hostname only
 * @example
 *   <%= _.hostname('https://assemble.io') %>
 *   => assemble.io
 */

exports.hostname = function(str) {
  return url.parse(str).hostname;
};


/**
 * Strip `.git` from the end of a URL, so the URL
 * can be used and extended in config values.
 *
 * @param {String} str
 * @return  {String}
 * @example
 *   <%= _.stripGit('https://github.com/assemble/assemble.io.git') %>
 *   => https://github.com/assemble/assemble.io
 */

exports.stripGit = function(url) {
  var git = /\.git$/;
  if (git.test(url)) {
    return url.replace(git, '');
  }
  return url;
};


/**
 * Date functions used in _.date() mixin
 *
 * @name formatDate
 * @param  {Object} dateobj The date object to format.
 * @param  {String} structure The structure to use, e.g. 'YYYY-MM-DD'.
 *
 * @return {String} The formatted date.
 * @api public
 */

exports.date = function(structure) {
  /* jshint unused: false */

  var dateobj = new Date();

  var year    = dateobj.getFullYear();
  var month   = ('0' + (dateobj.getMonth() + 1)).slice(-2);
  var date    = ('0' + dateobj.getDate()).slice(-2);
  var hours   = ('0' + dateobj.getHours()).slice(-2);
  var minutes = ('0' + dateobj.getMinutes()).slice(-2);
  var seconds = ('0' + dateobj.getSeconds()).slice(-2);
  var day     = dateobj.getDay();

  var months  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dates   = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'];
  var output  = '';

  structure = structure || 'YYYY-MMM-DD DDD';
  switch (structure) {
  case 'YYYY-MM-DD':
    output = year + '-' + month + '-' + date;
    break;
  case 'YYYY':
    output = year;
    break;
  case 'full':
    output = dates[parseInt(day)] + ', ' + months[parseInt(month) - 1] + ' ' + date + ', ' + year;
    break;
  }
  return output;
};
