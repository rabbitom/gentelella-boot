var gulp = require('gulp'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();

var DEST = 'dist/';

gulp.task('gentelella-vendors', function() {
    return gulp.src('node_modules/gentelella/vendors/**/*')
        .pipe(gulp.dest(DEST + 'vendors/'));
});

gulp.task('gentelella-build', function() {
    return gulp.src('node_modules/gentelella/build/**/*')
        .pipe(gulp.dest(DEST + 'vendors/gentelella/'));
});

gulp.task('gentelella-pages', function() {
    return gulp.src(['node_modules/gentelella/production/index.html', 'node_modules/gentelella/production/login.html', 'node_modules/gentelella/production/plain_page.html'])
        .pipe(replace('../vendors/', 'vendors/'))
        .pipe(replace('../build/', 'vendors/gentelella/'))
        .pipe(replace('images/img.jpg', 'https://gitee.com/uploads/87/333087_erabbit.png'))
        .pipe(gulp.dest(DEST));
});

gulp.task('gentelella', ['gentelella-vendors', 'gentelella-build', 'gentelella-pages']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: DEST
        }
    });
});

// Default Task
gulp.task('default', ['browser-sync']);