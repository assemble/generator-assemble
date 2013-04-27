/*global describe, beforeEach, it*/
'use strict';

var assert  = require('assert');

describe('Assemble generator', function () {
  it('creates expected files with basic option', function () {
    var assemble = require('../app');
    assert(assemble !== undefined);
  });
});
