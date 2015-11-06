var $      = require('gulp-load-plugins')();
var gulp   = require('gulp');
var rimraf = require('rimraf');
var sequence = require('run-sequence');
var octophant   = require('octophant');

// Delete the "_build" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf('./_build', done);
});



// Compile Sass into CSS
gulp.task('sass', function() {
  return gulp.src('./test/scss/testimonial-slider.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./test/css/'));
});

// Combine JavaScript into one file
gulp.task('javascript', function() {
  return gulp.src([

    // Third Party
    'test/js/jquery-2.1.1.js',

    /// THEME JS
    'test/theme/jquery.ui.effect.min.js',
    'test/theme/jquery.ui.effect-slide.min.js',
    'test/theme/staged-donations.js',
    'test/theme/collective.js',

    // For the Slider
    //'test/js/masonry.pkgd.min.js',
    'test/js/jquery.flexslider-min.js',

    // Text Effect
    'test/theme/typed.js',
    'test/theme/typewriter.js',

    // 'jquery.fittext.js'
    // 'jquery.lettering.js'
    // 'jquery.textillate.js'

    // For graph
      // 'test/theme/raphael.js',
      // 'test/theme/morris.min.js',



    // Main
    'test/js/main.js',
    // 'js/*.js'
    // 'js/**/*.js'
  ])
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('onearizona-561696b322139356d5000001'/*'test/js/'*/));
});



// Create the "_build" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['copy', 'sass', 'javascript'], done);
});

// Starts a BrowerSync instance
gulp.task('server', ['build'], function() {
  browser.init({server: './_build', port: '3000'});
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['javascript','sass'], function() {
  // gulp.watch(['./*.html'], ['copy']);
  // gulp.watch(['./scss/**/*.scss'], ['sass']);
  // gulp.watch(['./js/**/*.js'], ['javascript']);
});
