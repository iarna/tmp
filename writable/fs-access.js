'use strict'
// do not directly use-- use from ../writable.js
var memoize = require('../memoize.js')
var fs = require('fs')

module.exports = memoize('writable', function (dir, done) {
  fs.access(dir, fs.W_OK, done)
})
