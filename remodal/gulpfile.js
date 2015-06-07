var babelify = require('babelify');
var base64 = require('gulp-base64');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var csscomb = require('gulp-csscomb');
var cssnext = require('gulp-cssnext');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

gulp.task('csscomb', function() {
  return gulp.src('src/**/*.css')
    .pipe(csscomb())
    .pipe(gulp.dest('src'));
});

gulp.task('clean-img', function() {
  return gulp.src('build/img/', {read: false})
    .pipe(clean());
});

gulp.task('img', ['clean-img'], function() {
  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  browserify({
    entries: 'src/js/page.js',
    paths: ['node_modules', 'src/js', 'lib']
  })
  .transform(babelify.configure({
    optional: ['spec.protoToAssign']
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.stream());
});

gulp.task('css', ['csscomb', 'img'], function() {
  gulp.src('src/css/**/*.css')
    .pipe(concat('bundle.css'))
    .pipe(base64())
    .pipe(cssnext({
      import: {
        path: './'
      },
      browsers: ['> 0.1%']
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp.src(['src/js/**/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jscs({
      esnext: true
    }))
    .pipe(jshint.reporter(jshintStylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('bsync', ['js', 'css', 'img'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['src/js/**/*.js', 'lib/**/*.js'], ['js']);
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/img/**/*', ['img']);
  gulp.watch('index.html', browserSync.reload);
});

gulp.task('default', ['lint', 'js', 'css']);
