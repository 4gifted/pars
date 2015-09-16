# pars.js
[![Build status](https://ci.appveyor.com/api/projects/status/hski7kl69b54gee1?svg=true)](https://ci.appveyor.com/project/0of/pars)

A Chinese localized JS lib for parsing text for specific infos.
Inspired by Knwl(https://github.com/loadfive/Knwl.js/) we devote to bring the pars.js **API-level compatible with [Knwl](https://github.com/loadfive/Knwl.js/)** 
in order to parsing out Chinese text easily and accurately for specific infomation

# Installation
## Node
We'll publish package to NPM soon

## Bower
We'll publish package to bower repo soon

# Build
The output dir is **./dist**

## Pars.js
```shell
# build debug pars.js
grunt build-d
# minimized and uglified pars.js
grunt build
```

## Compatible with [Knwl.js](https://github.com/loadfive/Knwl.js/)
```shell
# build debug compati-pars.js
grunt compati-build-d
# minimized and uglified compati-pars.js
grunt compati-build
```

# API Usage Guidelines
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
## Pars specific APIs
- Instantiation
```javascript
  var langCode = 'zh-cn'; // Simplified Chinese
  var datesPlugin = require('plugins/path');
  var instance = new Pars({
    lang: langCode, 
    // plugins
    plugins: {
      // register plugin 'dates'
      dates: datesPlugin
    }
    // other options
  });
```

- Parse out infos
```javascript
  // 'dates' function is assigned when given plugin is loaded successfully
  var dateInfo = instance.dates('target string');
  if (dateInfo instanceof DateInfo /* plugin defined type */) {
    // parse out successfully and you can access date property from the return object
  } else if (dateInfo instanceof NotFound /* Common type */) {
    // do something
  }
```

# License
MIT License
