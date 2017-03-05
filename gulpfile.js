/**
 * Created by vova on 05.03.17.
 */
'use strict';

const gulp = require('gulp'),
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync('package.json')),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css'),
    babel = require('gulp-babel');

const prName = pkg.name,
    WATCHING_CSS = [
        'themes/' + prName + '/frontend/sass/**/*',
        'themes/' + prName + '/frontend/sass/*'],
    OUTPUT_CSS = 'themes/' + prName + "/stylesheets",
    inputJsLibraries = 'themes/' + prName + '/frontend/javascript/*.js',
    outputJsLibraries = 'themes/' + prName + "/js",
    layoutsPath = 'themes/' + prName + '/views/layouts';

const COMPONENTS_JS_LIST = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/slick-carousel/slick/slick.js',
    'bower_components/bootstrap/js/transition.js',
    'bower_components/bootstrap/js/tab.js',
    'bower_components/bootstrap/js/modal.js'
];

const WATCHING_JS = ['themes/' + prName + '/frontend/javascript/*', 'themes/' + prName + '/frontend/javascript/**/*'];

const COMPONENTS_CSS_LIST = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
];

const sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },
    autoprefixerOptions = {
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    };

gulp.task('sass', function () {
    return gulp
        .src('themes/' + prName + '/frontend/sass/constructor.*')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest(OUTPUT_CSS))
        .resume();
});
gulp.task('css_concat', function () {
    return gulp
        .src(COMPONENTS_CSS_LIST)
        .pipe(concatCss("vendors.css", {rebaseUrls: false}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cleanCss({debug: true}, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(OUTPUT_CSS))
        .resume();
});


gulp.task('watch', function () {
    gulp.watch(WATCHING_CSS, ['sass'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(WATCHING_JS, ['js']);
});


gulp.task('js', function () {
    return gulp.src('themes/' + prName + '/frontend/javascript/index.js')
        .pipe(babel())
        // .pipe(uglify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(outputJsLibraries));

});

gulp.task('js_concat', function () {
    return gulp.src(COMPONENTS_JS_LIST)
        .pipe(concat(pkg.name + '.js'))
        .pipe(uglify())
        .pipe(rename('vendors.min.js'))
        .pipe(gulp.dest(outputJsLibraries));
});

gulp.task('js-dev', function (cb) {
    gulp.src(COMPONENTS_JS_LIST)
        .pipe(concat('vendor.lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest(outputJsLibraries))
        .on('end', function () {

            const jsFiles = [
                outputJsLibraries + '/vendor.lib.js',
                'themes/' + prName + '/dev_source/js/**/*.js',
            ];

            const layoutFile = gulp.src(layoutsPath + '/main.php');

            layoutFile
                .pipe(inject(gulp.src(jsFiles, {read: false})))
                .pipe(gulp.dest(layoutsPath))
                .on('end', cb);
        });
});


gulp.task('default', ['develop']);

gulp.task('develop', ['sass', 'css_concat', 'js', 'js_concat', 'watch']);