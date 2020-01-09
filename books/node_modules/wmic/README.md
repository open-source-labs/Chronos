# wmic

Wrapper around the Windows WMIC interface for Node.js.

## Example

    var wmic = require('wmic');
    
    // equivalent of 'wmic nic get list'
    wmic.get_list('nic', function(err, nics) {
      // console.log(err || nics);
    })

## Usage

### wmic.get_value(section, value, conditions, callback)

Returns a single value from wmic, for example to get the hostname:

    wmic.get_value('computersystem', 'name', null, function(err, value) {
      console.log(value) // Your Hostname
    })

### wmic.get_values(section, value, conditions, callback)

Returns an array of values from wmic, for example to list hard drives:

    wmic.get_values('logicaldisk', 'name, volumename', null, function(err, values) {
      console.dir(values) // An array of disks
    })

## Credits

Written by Tomas Pollak, with the help of contributors.
    
## Small print

(c) Fork Ltd, MIT licensed.
