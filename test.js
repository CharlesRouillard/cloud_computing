var assert = require('assert');
var CD = require('./cloudsight')

describe('cloudsight', function() {

    it('should return empty string if no url is given', function() {
      assert.equal('', CD());
    });
});
