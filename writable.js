'use strict'
var fs = require('fs')
// The Windows implementation of `fs.access` has a bug where it will
// sometimes return access errors all the time for directories, even
// when access is available. As all we actually test ARE directories, this
// is a bit of a problem.
// FIXME: When this is corrected in Node/iojs, update this check to be
// a bit more specific
var isWindows = process.platform === 'win32'

if (fs.access && !isWindows) {
  module.exports = require('./writable/fs-access.js')
} else {
  module.exports = require('./writable/fs-open.js')
}
