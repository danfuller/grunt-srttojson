/*
 * grunt-srttojson
 * https://github.com/dfuller/srttojson
 *
 * Copyright (c) 2014 Dan Fuller
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('srttojson', 'Converts .srt ubtitle files to JSON format', function() {

    grunt.file.defaultEncoding = 'utf8';

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var output = {}

      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath)
      })[0]


      // Clean up triple lined seperations
      src = src.replace('\r\n\r\n\r\n','\r\n\r\n')

      // Split each timestamped subtitle
      var segments = src.split('\r\n\r\n');

      segments.forEach(function(segment, i){
        if (typeof segment === "undefined"){ return; }
        var lines = segment.split('\r\n');

        if (typeof lines[1] === "undefined"){ return; }
        var times = lines[1].toString().split(' --> ');

        output[i] = {};

        output[i].start = toMilliseconds(times[0], segment);
        output[i].end = toMilliseconds(times[1], segment);
        output[i].duration = output[i].end - output[i].start;
        output[i].text = {};

        for (var t = 2; t < lines.length; t++) {
          output[i].text[t-2] = lines[t];
        };

      });

      // Write the destination file.
      grunt.file.write(f.dest, JSON.stringify(output));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');

    });
  });
  

  function toMilliseconds(t, e){
    if (typeof t === "undefined"){
      grunt.fail.fatal('Formatting Error near segment: '+e+'. (Expected Timestamp HH:MM:SS,mmm)');
      return
    }
    
    var milliseconds = 0;
    var milliSplit = t.split(',');
    var timeSplit = milliSplit[0].split(':');
    
    milliseconds += parseInt(milliSplit[1]); // Milliseconds
    milliseconds += (timeSplit[2] * 1000); // Seconds
    milliseconds += ((timeSplit[1] * 60) * 1000); // Mins
    milliseconds += (((timeSplit[0] * 60) * 60) * 1000); //Hours
          
    return milliseconds
  }

};
