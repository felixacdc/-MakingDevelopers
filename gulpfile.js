import eslint from 'gulp-eslint';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import nodemon from 'gulp-nodemon';
import notify from 'gulp-notify';
import stylus from 'gulp-stylus';
import mocha from 'gulp-mocha';

// Linter task
gulp.task('eslint', function () {
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