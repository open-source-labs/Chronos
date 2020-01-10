var wmic = require('../index');
var should = require('should');

describe('wmic', function() {
  describe('#values()', function() {
    it('should handle values with spaces in', function(done) {
      // This test assumes that your first network card has a space in its name, it should...

      wmic.get_values('nicconfig', 'description, ipaddress', null, function(err, values) {
        values[0].Description.indexOf(' ').should.not.equal(-1)
        done()
      })
    })

    it('should return multiple values', function(done) {
      // This test assumes you have more than one network card (you usually have some virtual ones)

      wmic.get_values('nicconfig', 'description, ipaddress', null, function(err, values) {
        values.length.should.not.equal(1)
        done()
      })
    })

    it('should set all the keys, not present ones to an empty sting', function(done) {
      // This test assumes that not every network card has an IP

      wmic.get_values('nicconfig', 'description, ipaddress', null, function(err, values) {
        values.forEach(function(value, index){
          value.Description.should.not.equal(undefined)
          value.IPAddress.should.not.equal(undefined)
        })
        done()
      })
    })
  })
})
