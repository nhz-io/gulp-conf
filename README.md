<h1 align="center">@nhz.io/gulp-conf</h1>

<p align="center">
  <a href="https://npmjs.org/package/@nhz.io/gulp-conf">
    <img src="https://img.shields.io/npm/v/@nhz.io/gulp-conf.svg?style=flat"
         alt="NPM Version">
  </a>

  <a href="https://www.bithound.io/github/nhz-io/gulp-conf">
    <img src="https://www.bithound.io/github/nhz-io/gulp-conf/badges/score.svg"
         alt="Bithound Status">
  </a>

  <a href="https://github.com/nhz-io/gulp-conf/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/nhz-io/gulp-conf.svg?style=flat"
         alt="License">
  </a>

  <a href="https://npmjs.org/package/@nhz.io/gulp-conf">
  <img src="http://img.shields.io/npm/dm/@nhz.io/gulp-conf.svg?style=flat"
  alt="Downloads">
  </a>  
</p>

<h3 align="center">Merge and resolve JSON/CSON references<h2>

## Install
```
npm i -S @nhz.io/gulp-conf
```

## Reference resolution is done with [ref-resolve](https://github.com/nhz-io/ref-resolve)

## Example

### Load configuration from multiple files
```javascript
/** +-+- config
  *   |
  *   +--- a.cson
  *   +--- b.cson
  *   +--- c.cson
  */

const gulp = require('gulp')
const conf = require('@nhz-io/gulp-conf')
const config = {}
const unresolved = []

gulp.task('config', () =>
    gulp.src('config/*.cson').pipe(conf(config, unresolved))
)

/** After runing config task the configuration
  * will be in `config` and unresolved references
  * will be in `unresolved`.
  * Also, a warning will be shown for each unresolved match
  */
```

## License

### [MIT](LICENSE)
