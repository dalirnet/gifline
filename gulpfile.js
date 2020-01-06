// gulp
const gulp = require('gulp');
const rename = require('gulp-rename');

// html
const htmlMin = require('gulp-htmlmin');

// style
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');

// script
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// image
const imageMin = require('gulp-tinify');


gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
    return gulp.src([
        'src/manifest.json',
        'src/browserconfig.xml'
    ])
        .pipe(gulp.dest('build'));
});

gulp.task('copy-js', function () {
    return gulp.src([
        'src/scripts/gif.js',
        'src/scripts/gif.worker.js'
    ])
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('css', function () {
    return gulp.src([
        'src/styles/*.css',
    ])
        .pipe(concatCss('bundle.css'))
        .pipe(cleanCSS({
            level: {
                2: {
                    all: true,
                    removeDuplicateRules: true
                }
            }
        }))
        .pipe(autoPrefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/styles'));
});

gulp.task('js-debug', function () {
    return gulp.src('src/scripts/index.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('js', function () {
    return gulp.src('src/scripts/index.js', {
        sourcemaps: false
    })
        .pipe(browserify())
        .pipe(babel({
            presets: ['@babel/env'],
            compact: false
        }))
        .pipe(uglify({
            mangle: {
                toplevel: true
            },
            sourceMap: true,
            toplevel: true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('build/scripts', {
            sourcemaps: false
        }));
});

gulp.task('img', function () {
    return gulp.src('src/images/**')
        .pipe(imageMin('ssWfmsQd-m_1ed6b7DSOP11WUCNU4NUm'))
        .pipe(gulp.dest('build/images'));
});

gulp.task('watch', function () {
    gulp.watch(['src/index.html'], gulp.registry().get('html'));
    gulp.watch(['src/styles/*.css'], gulp.registry().get('css'));
    gulp.watch(['src/scripts/**/*.js'], gulp.registry().get('js-debug'));
})


gulp.task('all', gulp.parallel('html', 'copy', 'copy-js', 'css', 'js', 'img'));
gulp.task('default', gulp.parallel('html', 'css', 'js-debug', 'watch'));