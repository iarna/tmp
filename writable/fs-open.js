'use strict'
// do not directly use-- use from ../writable.js
var fs = require('fs')
var path = require('path')
var memoize = require('../memoize.js')
var accessError = require('../access-error.js')

module.exports = memoize('writable', function (dir, done) {
  var tmp = path.join(dir, '.npm.check.permissions')
  fs.open(tmp, 'w', function (er, fd) {
    if (er) return done(accessError(dir, er))
    fs.close(fd, function () {
      fs.unlink(tmp, function () { done() })
    })
  })
})
