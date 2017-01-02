const eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');
    notify = require('gulp-notify'),
    stylus = require('gulp-stylus'),
    mocha = require('gulp-mocha');

// tasks
gulp.task('analyze', ['lint']);
gulp.task('pre-push', ['lint']);

// Linter task
gulp.task('lint', function () {
    return gulp.src([
        'src/**/*.js',
        '!src/public/bower_components/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Stylus task
gulp.task('stylus', function () {
    return gulp.src('src/stylus/style.styl')
    .pipe(stylus({
        compress: true
    }))
    .pipe(livereload())
    .pipe(gulp.dest('src/public/css'));
});

gulp.task('livereload', () => {
    livereload({ start: true });
});

// Mocha task
gulp.task('test', () => {
  return gulp.src([
    'test/**/*Test.js'
  ])
  .pipe(mocha());
});