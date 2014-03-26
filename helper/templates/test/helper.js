/**
 * Handlebars Helper: {{<%= _.slugify(name) %>}}
 */

var expect = require('chai').expect;
var <%= _.safename(name) %> = require('../');

describe('when <%= _.slugify(name) %> is used in a template', function() {
	before(function(){
		// run any code before tests here
	});

  it('should do something awesome', function() {
    var expected = '<%= _.slugify(name) %>';
    var actual = '<%= _.slugify(name) %>';
    expect(actual).to.eql(expected);
  });
});