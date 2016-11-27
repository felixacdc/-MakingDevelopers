var gulp = require('gulp');

// Imported tasks
gulp.task('lint', require('./gulp/eslint'));

// tasks
gulp.task('analyze', ['lint']);
gulp.task('pre-push', ['lint']);

// Mocha task
gulp.task('test', () => {
  return gulp.src([
    'test/**/*Test.js'
  ])
  .pipe(mocha());
});