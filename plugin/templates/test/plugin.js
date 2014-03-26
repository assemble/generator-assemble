/**
 * <%= fullName %>
 */

var expect = require('chai').expect;

var <%= _.safename(fullName) %> = require('../');

describe('<%= fullName %>', function() {

	before(function(){
		// run any code before tests here
	});

  it('should do something awesome', function() {
    var expected = '<%= fullName %>';
    var actual = '<%= fullName %>';
    expect(actual).to.eql(expected);
  });
});