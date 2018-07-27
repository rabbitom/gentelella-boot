var gulp = require('gulp'),
    rename = require('gulp-rename'),
    useref = require('gulp-useref'),
    webpack = require('webpack-stream'),
    gulpif = require('gulp-if'),
    del = require('del'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();

var SRC = 'src/';

gulp.task('gentelella-vendors', function() {
    return gulp.src('node_modules/gentelella/vendors/**/*')
        .pipe(gulp.dest(SRC + 'vendors/'));
});

gulp.task('gentelella-build', function() {
    return gulp.src('node_modules/gentelella/build/**/*')
        .pipe(gulp.dest(SRC + 'vendors/gentelella/'));
});

gulp.task('gentelella-pages', function() {
    return gulp.src(['node_modules/gentelella/production/index.html', 'node_modules/gentelella/production/login.html', 'node_modules/gentelella/production/plain_page.html'])
        .pipe(replace('../vendors/', 'vendors/'))
        .pipe(replace('../build/', 'vendors/gentelella/'))
        .pipe(replace('images/img.jpg', 'https://gitee.com/uploads/87/333087_erabbit.png'))
        .pipe(gulp.dest(SRC));
});

gulp.task('init', ['gentelella-vendors', 'gentelella-build', 'gentelella-pages']);

gulp.task('src', function() {
    browserSync.init({
        server: {
            baseDir: SRC
        }
    });
});

var DEST = 'dist/';

gulp.task('build-html', function() {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest(DEST));
});

gulp.task('build-fonts', function() {
    return gulp.src(['src/vendors/font-awesome/fonts/*', 'src/vendors/bootstrap/fonts/*'])
        .pipe(gulp.dest(DEST + 'fonts/'));
});

gulp.task('build-images', function() {
    return gulp.src('src/vendors/iCheck/skins/flat/green@2x.png')
        .pipe(gulp.dest(DEST + 'css/'));
})

gulp.task('build', ['build-html', 'build-fonts', 'build-images']);

gulp.task('dist', function() {
    browserSync.init({
        server: {
            baseDir: DEST
        }
    });
    gulp.watch(DEST + '*.html').on('change', browserSync.reload);
    gulp.watch(DEST + 'css/*.css').on('change', browserSync.reload);
    gulp.watch(DEST + 'js/*.js').on('change', browserSync.reload);
});

gulp.task('clean', function() {
    return del(DEST);
});

// Default Task
gulp.task('default', ['build', 'dist'], function() {
    gulp.watch('src/*.html', ['build-html']);
});