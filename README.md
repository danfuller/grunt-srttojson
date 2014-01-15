# grunt-srttojson

> Converts SRT subtitle files to JSON format

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-srttojson --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-srttojson');
```

## The "srttojson" task

### Overview
In your project's Gruntfile, add a section named `srttojson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  srttojson: {
    files: {
      expand: true,
      cwd: 'subs/',
      src: '*.srt',
      dest: 'subs/json/',
      ext: '.json'
    }
  },
});
```

## Release History
_(Nothing yet)_
