module.exports = function(grunt) {
 // Project configuration.
 grunt.initConfig({
  pkg: grunt.file.readJSON("package.json"),
  // Sass task
   sass: {
     options: {
       implementation: require('node-sass'),
       sourceMap: true,
     },
     dist: {
       files: {
         "docs/assets/css/style.css": "src/assets/sass/style.scss",
         "docs/assets/css/critical-css.css": "src/assets/sass/critical.scss"
       }
     }
   },

  // Post CSS task
   postcss: {
     options: {
       map: {
         inline: false, // save all sourcemaps as separate files...
       },
       processors: [
         require("autoprefixer")({ browsers: "last 2 versions" }),
         require('cssnano')()
       ]
     },
     dist: {
       // expand: true,
       // flatten: true,
       files: {
         'docs/assets/css/style.min.css': 'docs/assets/css/style.css',
         'docs/assets/css/critical-css.min.css': 'docs/assets/css/critical-css.css'
       }
     }
   },
  // Watch task
   watch: {
     sass: {
       files: ["src/assets/sass/**/*.scss"],
       tasks: "sass",
       options: {
         spawn: false,
         livereload: true
       }
     },
     css: {
       files: ["docs/assets/css/**/*.css"],
       tasks: "postcss",
       options: {
         spawn: false,
         livereload: true
       }
     },
     js: {
       files: ['src/assets/js/**/*.js'],
       tasks: ['concat','uglify'],
       options: {
         // spawn: false
       }
     },
     html: {
       files: ["src/**/*.html", "src/**/*.njk"],
       tasks: ["clean:html", "nunjucks", "htmlmin"],
       options: {
         spawn: false,
         livereload: true
       }
     },
     gruntfile: {
       files: "gruntfile.js",
       options: {
         spawn: false,
         livereload: true,
         reload: true
       }
     }
   },
   // Nunjucks task
   nunjucks: {
     options: {
       data: grunt.file.readJSON("data/data.json"),
       paths: ["src/html", "src/schemes"],
     },
     dev: {
       files: [{
         expand: true,
         cwd: "src/html",
         src: [
           "**/*.html"
         ],
         dest: "docs/",
         ext: ".html"
       }],
     },
     render: {
       files: [{
         expand: true,
         cwd: "src/schemes",
         src: [
           "**/*.njk"
         ],
         dest: "docs/assets/sass/schemes",
         ext: ".scss"
       }],
     }
   },
   // Clean task
   clean: {
     html: {
       src: ["index.html", "examples/**/*.html"]
     },
     css: {
       src: ["docs/assets/css/**/*.css"]
     },
     all: {
       src: ["index.html", "examples/**/*.html", "css/**/*.css"]
     }
   },
   // Prettify task
   // prettify: {
   //  options: {
   //   "indent": 1,
   //   "indent_char": " ",
   //   "brace_style": "collapse",
   //   "preserve_newlines": true,
   //   "condense": true,
   //   "max_preserve_newlines": 2,
   //   "unformatted": ["a", "code", "pre"]
   //  },
   //  all: {
   //   expand: true,
   //   cwd: "",
   //   src: ["docs#<{(||)}>#*.html"],
   //   dest: "",
   //   ext: ".html"
   //  }
   // },

   uglify: {
     options: {
       // livereload: true,
       // preserveComments: 'false'
       preserveComments: /^!/
       // only preserve comments that start with a bang
       // https://github.com/gruntjs/grunt-contrib-uglify/issues/366
     },
     dist: {
       files: {
         'src/assets/js/okaynav.min.js' : ['src/assets/js/okaynav.js'],
         'src/assets/js/accessible-color-contrast.min.js' : ['src/assets/js/accessible-color-contrast.js'],
         'src/assets/js/modal.min.js' : ['src/assets/js/modal.js'],
         'src/assets/js/set-color-info.min.js' : ['src/assets/js/set-color-info.js'],
         'src/assets/js/load-google-webfont.min.js' : ['src/assets/js/load-google-webfont.js'],
         'src/assets/js/index.min.js' : ['src/assets/js/index.js'],
         'src/assets/js/loadCSS.min.js' : ['src/assets/js/loadCSS.js'],
         'src/assets/js/cssrelpreload.min.js' : ['src/assets/js/cssrelpreload.js'],
       }
     }
   },
   concat: {
     dist: {
       files: {
         // 'docs/assets/js/all.js' :  ['src/assets/js/accessible-color-contrast.min.js', 'src/assets/js/modal.min.js', 'src/assets/js/okaynav.min.js'], // Google webfont-loader naar conditionele statement in head-detect.njk
         'docs/assets/js/all.js' :  ['src/assets/js/accessible-color-contrast.min.js', 'src/assets/js/okaynav.min.js'], // Google webfont-loader naar conditionele statement in head-detect.njk
         'src/assets/js/loadCSS-cssrelpreload.concat.min.js' : ['src/assets/js/loadCSS.min.js','src/assets/js/cssrelpreload.min.js'],
       }
     }
   },
   copy: {
     main: {
       files: {
         // 'src/html/partials/all-scripts.njk': 'docs/assets/js/all.js',
         'src/html/partials/set-color-info-script.njk': 'src/assets/js/set-color-info.min.js',
         'src/html/partials/load-google-webfont-script.njk': 'src/assets/js/load-google-webfont.min.js',
         'src/html/partials/index-script.njk': 'src/assets/js/index.min.js',
         'src/html/partials/modal-script.njk': 'src/assets/js/modal.min.js',
         'src/html/partials/loadCSS-script.njk': 'src/assets/js/loadCSS-cssrelpreload.concat.min.js',
         'src/html/partials/critical-css-styles.njk': 'docs/assets/css/critical-css.min.css',
       },
       flatten: true,
       filter: 'isFile',
     },
   },

   htmlmin: { // Task
     dist: { // Target
       options: { // Target options
         removeComments: true,
         collapseWhitespace: true
       },
       files: { // Dictionary of files
         'docs/index.html': 'docs/index.html', // 'destination': 'source'
         'docs/year-2018/index.html': 'docs/year-2018/index.html',
         'docs/year-2017/index.html': 'docs/year-2017/index.html',
         'docs/year-2016/index.html': 'docs/year-2016/index.html',
         'docs/year-2015/index.html': 'docs/year-2015/index.html',
         'docs/year-2014/index.html': 'docs/year-2014/index.html',
         'docs/year-2013/index.html': 'docs/year-2013/index.html',
         'docs/year-2012/index.html': 'docs/year-2012/index.html',
         'docs/year-2011/index.html': 'docs/year-2011/index.html',
         'docs/year-2010/index.html': 'docs/year-2010/index.html',
         'docs/year-2009/index.html': 'docs/year-2009/index.html',
         'docs/year-2008/index.html': 'docs/year-2008/index.html',
         'docs/year-2007/index.html': 'docs/year-2007/index.html'
       }
     }
   },

 });

  // Load the plugins to run your tasks
  // require("load-grunt-tasks")(grunt, {
  //   scope: "devDependencies"
  // });
     grunt.loadNpmTasks('grunt-sass','grunt-contrib-concat','grunt-contrib-uglify','grunt-contrib-watch','matchdep','grunt-postcss','grunt-contrib-copy','grunt-contrib-clean');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  require("time-grunt")(grunt);

  // Default task(s).
  grunt.registerTask("default", [
    "clean:all",
    "sass",
    "postcss:dist",
    "nunjucks",
    "uglify",
    "concat",
    "copy",
    "htmlmin",
    "watch"
  ]);
  grunt.registerTask('build', ['clean','concat', 'uglify', 'sass', 'postcss:dist',  'copy']);
};
