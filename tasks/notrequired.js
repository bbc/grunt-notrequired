/*
 * grunt-notrequired
 * https://github.com/paulcurley/grunt-notrequired
 *
 * Copyright (c) 2013 Paul C
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('notrequired', 'Your task description goes here.', function() {
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    var list = [];
    var files = this.files;

    files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      for (var i = 0, l = f.src.length; i < l; i++) {
        var v = f.src[i];
        var isMatch = src.match(v.replace(options.requireconfig.baseurl, '').slice(0, - 3))
        if (isMatch) {
          list.push(v)
        }
      }
    });

    files.forEach(function(f) {
      var missing = f.src.filter(function(filePath) {
        if (list.indexOf(filePath) === - 1 && /.js/.test(String(filePath))) {
          grunt.log.writeln('Unable to find reference: ' + filePath)
          return true;
        } else {
          return false
        }
      }).map(function(filePath) {
        return filePath;
      });
    });
  });
};

