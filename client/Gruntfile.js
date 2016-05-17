module.exports = function(grunt) {

  /* Show task execution time */
  require('time-grunt')(grunt);

  /* Load all grunt tasks from package.json devDependencies */
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  /* Configuration paths for the application */
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    build: 'build'
  };

  /* Project configuration */
  grunt.initConfig({

    /* Settings */
    myApp: appConfig,

    // grunt-contrib-clean
    clean: {
      build: ['<%= myApp.build %>/*', '.tmp/*'],
      options: {
        force: true
      }
    },
    // grunt-contrib-concat
    concat: {
      js: {
        src: ['<%= myApp.app %>/scripts/*.js'],
        dest: '.tmp/scripts/scripts.js'
      }
      // Should CSS files be concatenated? 
      // Think about responsive design
      // e.g. mobile first where we only want
      // to load mobile styles
      // css: {
      //   src: ['app/styles/*.css'],
      //   dest: 'build/styles/styles.css'
      // }
    },
    // grunt-contrib-compass
    compass: {
      build: {
        options: {
          sassDir: '<%= myApp.app %>/styles',
          cssDir: '.tmp/styles'
        }
      }
    },
    // grunt-contrib-cssmin
    cssmin: {
      build: {
        src: '.tmp/styles/styles.css',
        dest: '<%= myApp.build %>/styles/styles.min.css'
      }
    },
    // grunt-contrib-htmlmin
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= myApp.app %>/',
          src: ['*.html'],
          dest: '<%= myApp.build %>/'
        }]
      }
    },
    // grunt-contrib-jshint
    jshint: {
      js: ['<%= myApp.app %>/scripts/*.js'],
      options: {
        reporter: require('jshint-stylish')
      }
    },
    // grunt-contrib-uglify
    uglify: {
      build: {
        files: {
          '<%= myApp.build %>/scripts/scripts.min.js': ['.tmp/scripts/scripts.js']
        }
      }
    },
    // grunt-wiredep
    wiredep: {
      app: {
        src: [
          '<%= myApp.app %>/index.html'
        ]
      }
    },
    //grunt-contrib-watch
    watch: {
      js: {
        files: ['<%= myApp.app %>/scripts/*.js'],
        tasks: ['newer:jshint', 'concat:js', 'uglify']
      },
      scss: {
        files: ['<%= myApp.app %>/styles/*.scss'],
        tasks: ['compass', 'cssmin']
      },
      html: {
        files: ['<%= myApp.app %>/**/*.html'],
        tasks: ['wiredep', 'htmlmin']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      options: {
        spawn: false
      }
    }
  });

  /* Run all tasks by default */
  /* Order matters */
  grunt.registerTask('default', [
    'clean:build',
    'newer:jshint',
    'compass',
    'cssmin',
    'wiredep',
    'htmlmin',
    'concat',
    'uglify',
    'watch'
  ]);
};
