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

///
/// We use this task to generate the settings file
///
gulp.task('sass:settings', function() {
  octophant([
    // 'test/scss/_variables.scss',
    'test/scss/_button.scss',
    'test/scss/*.scss'
  ], {
    title: 'One Arizona Settings'.toUpperCase(),
    /// Path to source files containing 
    partialsPath: 'test/docs/', // This will folder contains html files with the scss variables (which seems kinda pointless...)
    /// Path to where the _settings.scss file will be stored
    settingsPath: 'test/scss'
  });
});


// Compile Sass into CSS
gulp.task('sass', function() {
  return gulp.src('./test/scss/style.scss')
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
    // '../node_modules/jquery/dist/jquery.js',
    // '../js/foundation.core.js',
    // '../js/foundation.util.*.js',
    // '../node_modules/motion-ui/motion-ui.js',
    // Third Party
    'test/js/jquery-2.1.1.js',
    'test/js/masonry.pkgd.min.js',
    'test/js/jquery.flexslider-min.js',
    // Main
    'test/js/main.js',
    // 'js/*.js'
    // 'js/**/*.js'
  ])
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('test/js/'));
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
