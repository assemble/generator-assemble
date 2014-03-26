/**
 * Lo-Dash Mixin: <%= name %>
 */

var expect = require('chai').expect;
var _ = require('lodash');
_.mixin(require('../'));

describe('<%= _.camelCase(name) %>', function() {
	before(function(){
		// run any code before tests here
	});

  it('should do something awesome', function() {
    var expected = 'FOO';
    var actual = _.<%= _.camelCase(name) %>('foo');
    expect(actual).to.eql(expected);
  });
});