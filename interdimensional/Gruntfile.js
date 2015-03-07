module.exports = function(grunt) {
  grunt.initConfig({

    autoprefixer: {
      target: {
        src: 'build/css/bundle.css',
        dest: 'build/css/bundle.css'
      },
      options: {
        browsers: ['> 0.1%']
      }
    },

    babel: {
      options: {
        sourceMap: true
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['**/*.js'],
          dest: 'build/js/temp'
        }]
      }
    },

    bower: {
      install: {
        options: {
          targetDir: './libs',
          cleanBowerDir: true
        }
      }
    },

    browserify: {
      build: {
        files: {
          'build/js/bundle.js': ['build/js/temp/**/*.js']
        }
      },
      options: {
        transform: ['browserify-shim', 'babelify']
      }
    },

    clean: {
      build: 'build/',
      temp: 'build/js/temp'
    },

    concat: {
      css: {
        src: ['src/css/*.css'],
        dest: 'build/css/bundle.css'
      },
      'libs-js': {
        src: ['libs/**/*.js', 'build/js/bundle.js'],
        dest: 'build/js/bundle.js'
      },
      'libs-css': {
        src: ['build/css/bundle.css', 'libs/**/*.css'],
        dest: 'build/css/bundle.css'
      }
    },

    copy: {
      images: {
        expand: true,
        cwd: 'src/',
        src: ['img/**'],
        dest: 'build/'
      }
    },

    csscomb: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['css/*.css'],
          dest: 'src/'
        }]
      }
    },

    cssmin: {
      target: {
        src: 'build/css/bundle.css',
        dest: 'build/css/bundle.css'
      },
      options: {
        keepSpecialComments: 0
      }
    },

    githooks: {
      all: {
        'pre-commit': 'test'
      },
      options: {
        command: 'node_modules/.bin/grunt'
      }
    },

    jscs: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: 'src/js/*.js'
      },
      options: {
        config: '.jscsrc',
        esnext: true
      }
    },

    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: 'src/js/*.js'
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },

    uglify: {
      target: {
        src: 'build/js/bundle.js',
        dest: 'build/js/bundle.js'
      }
    },

    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['test', 'build']
      },
      options: {
        spawn: false,

        // Use browser extensions of LiveReload
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('test', [
    'jshint', 'jscs'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'babel', 'browserify', 'concat:libs-js',
    'csscomb', 'copy', 'concat:css', 'autoprefixer', 'concat:libs-css',
    'clean:temp'
  ]);

  grunt.registerTask('minify', [
    'uglify', 'cssmin'
  ]);

  grunt.registerTask('default', [
    'test', 'build', 'minify'
  ]);
};
