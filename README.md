# pars.js
A Chinese localized JS lib for parsing text for specific infos.
Inspired by Knwl(https://github.com/loadfive/Knwl.js/) we devote to bring the pars.js **API-level compatible with [Knwl](https://github.com/loadfive/Knwl.js/)** 
in order to parsing out Chinese text easily and accurately for specific infomation

# Installation
## Node
We'll publish package to NPM soon

## Bower
We'll publish package to bower repo soon

# Document
## APIs Compatible with [Knwl.js](https://github.com/loadfive/Knwl.js/)
**Pars will NOT load any default plugins**

- Instantiation
```javascript
  var instance = new Pars('language');
```

- Initialize target string
```javascript
  instance.init('target string');
```

- Register plugins
```javascript
  var datesPlugin = require('plugins/path');
  instance.register('dates', datesPlugin);
```

- Parse out infos
```javascript
  // already registered 'dates' plugin
  // we use ES6 destructuring for detail description
  var [{
    // specific fields
    year: specificDatesYear,
    month: specificDatesMonth,
    day: specificDatesDay,
    //
    
    // the sentence of rough location of the data from the String
    preview, // String
    
    //the position (in words) of the result in the String
    found // Number
  }] = instance.get('dates');
```

# License
MIT License
