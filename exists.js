'use strict'
var fs = require('fs')
var memoize = require('./memoize.js')
var accessError = require('./access-error.js')

// The Windows implementation of `fs.access` has a bug where it will
// sometimes return access errors all the time for directories, even
// when access is available. As all we actually test ARE directories, this
// is a bit of a problem.
// FIXME: When this is corrected in Node/iojs, update this check to be
// a bit more specific
var isWindows = process.platform === 'win32'

if (fs.access && !isWindows) {
  module.exports = fs_access_implementation
} else {
  module.exports = fs_access_implementation
}

module.exports.fs_access_implementation = fs_access_implementation
module.exports.fs_stat_implementation = fs_stat_implementation

function fs_access_implementation = memoize('exists', function (dir, done) {
  fs.access(dir, fs.F_OK, done)
})

function fs_stat_implementation = memoize('exists', function (dir, done) {
  fs.stat(dir, function (er) { done(accessError(dir, er)) })
})
