var gulp    = require('gulp'),
    util    = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    compass = require('gulp-compass'),
    minCSS  = require('gulp-minify-css'),
    rename  = require('gulp-rename'),
    colors  = require('colors'),
    replace = require('gulp-replace'),
    superv  = require('gulp-supervisor'),
    crypto  = require('crypto'),
    fs      = require('fs');

var paths   = {
  scripts: {
      app: [
        'app/assets/js/**/*.js',
        '!app/assets/js/views'
      ],
      vendor: [
        'bower_components/modernizr/modernizr.js',
        'bower_components/requirejs/require.js'
      ],
      backbone: [
        'bower_components/underscore/underscore.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/backbone/backbone.js',
        'bower_components/requirejs-text/text.js',
        'bower_components/requirejs/require.js',
      ],
      views: "app/assets/js/views/*.js",
      templates: "app/assets/templates/**/*.html",
      dest: {
        app: 'public/javascripts',
        templates: 'public/templates',
        views: 'public/javascripts/views',
        vendor: 'app/assets/js/vendor'
      }
    },
  styles: {
      app: 'app/assets/sass/*.sass',
      vendor: [
      // compile vendor sass libraries here
      ],
      src: 'app/assets/sass',
      dest: {
        app: 'public/stylesheets',
        vendor: 'app/assets/sass/vendor'
      }
  }
};

// Run server
gulp.task("supervisor", function() {
    superv("./server.js");
});

// Backbone scripts
gulp.task('backbone', function() {
  gulp.src(paths.scripts.backbone)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest.vendor));
  console.log('[' + '.js'.green + '] - Backbone          Finished');
});

// Application scripts
gulp.task('application', function() {
  gulp.src(paths.scripts.app)
    // For production
    // .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest.app));
  console.log('[' + '.js'.green + '] - Application       Finished');
});

gulp.task('views', function() {
  gulp.src(paths.scripts.views)
    // For production
    // .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest.views));
  console.log('[' + '.js'.green + '] - Views             Finished');
});

// Vendor Scripts
gulp.task('vendor', function() {
  gulp.src(paths.scripts.vendor)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.scripts.dest.app));
  console.log('[' + '.js'.green + '] - vendor.min.js     Finished');
});

// Templates
gulp.task('templates', function() {
  gulp.src(paths.scripts.templates)
    .pipe(gulp.dest(paths.scripts.dest.templates));
  console.log('[' + '.html'.green + '] - templates       Finished');
});

// Sass
gulp.task('sass', function () {
  // Application styles
  gulp.src(paths.styles.app)
    .pipe(compass({
      css: './public/stylesheets',
      sass: './app/assets/sass',
      image: './public/images'
    }))
    .on('error', function (err) {
      return console.log('[' + '.css'.green + '] - ' + err);
    })
    // Production
    // .pipe(minCSS())
    .pipe(gulp.dest(paths.styles.dest.app));
  console.log('[' + '.css'.green + '] - app.css          Finished');
});

// Watch
gulp.task('watch', function () {
  gulp.watch(paths.scripts.backbone, ['backbone']);
  gulp.watch(paths.scripts.app, ['application']);
  gulp.watch(paths.scripts.vendor, ['vendor']);
  gulp.watch(paths.scripts.templates, ['templates']);
  gulp.watch(paths.scripts.views, ['views']);
  gulp.watch(paths.styles.vendor, ['sass']);
  gulp.watch(paths.styles.app, ['sass']);
});

gulp.task('default', ['supervisor', 'sass', 'watch', 'application', 'backbone', 'vendor', 'templates', 'views']);
