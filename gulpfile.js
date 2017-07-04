var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    sourcemap = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css');
    browserSync = require('browser-sync').create();

gulp.task('serve', ['styles', 'scripts'], function() {

    browserSync.init({
        server: {
            baseDir: "./",
            https: true
        },
        port: 3000
    });

    gulp.watch('src/sass/**/*.scss', ['styles']).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', ['scripts']);
  	gulp.watch('*.html').on('change', browserSync.reload);
  	gulp.watch('src/scss/**/*.scss').on('change', browserSync.reload);
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
    gulp.watch('src/img/*.*').on('change', browserSync.reload);
});

gulp.task('styles', function() {
      return gulp.src('src/sass/style.scss')
        .pipe(sourcemap.init())
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(sourcemap.write())
        .pipe(gulp.dest('dest/css/'))

});

gulp.task('scripts', function() {
  return gulp.src([
        'src/js/*.js'
    ])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js/'))
});

gulp.task('imgoptim', ['imgdel'], function () {
    return gulp.src('src/img/*.{jpg,png,svg}')
        .pipe(gulp.dest('dest/img/'))
        .pipe(imagemin());
        
});

gulp.task('imgdel', function () {
    return del('dest/img/*.*')
});


gulp.task('default', ['styles', 'imgdel', 'imgoptim', 'serve', 'scripts'], function() {
});