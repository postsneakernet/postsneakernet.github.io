/* jshint esversion: 6 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var del = require('del');

var pkg = require('./package.json');

var bower = './bower_components/';
var bootstrap = bower + 'bootstrap/dist/';
var jquery = bower + 'jquery/dist/';

var projectAssets = './project_assets/';
var assets = './assets/';

var gulpfile = './gulpfile.js';
var scripts = projectAssets + 'js/**/*.js';

var vendorPaths = {
    css: [
        bootstrap + 'css/*'
    ],
    fonts: bootstrap + 'fonts/*',
    js: [
        bootstrap + 'js/bootstrap.js',
        bootstrap + 'js/bootstrap.min.js',
        jquery + 'jquery.js',
        jquery + 'jquery.min.js'
    ]
};

var srcPaths = {
    css: projectAssets + 'css/custom.scss',
    img: [
        projectAssets + 'img/*.jpg',
        projectAssets + 'img/*.png',
        projectAssets + 'img/*.ico'
    ],
    js: [
            gulpfile,
            scripts
    ],
    scripts: scripts
};

var dstPaths = {
    css: assets + 'css',
    fonts: assets + 'fonts',
    lib: assets + 'lib',
    img: assets + 'img',
    js: assets + 'js',
    root: assets
};

var watchPaths = (function () {
    var result = [];
    Object.keys(srcPaths).forEach(function (k, i) {
        result.push(srcPaths[k]);
    });
    return {
        all: result
    };
})();

gulp.task('clean', function () {
    return del([dstPaths.root + '**']);
});

gulp.task('copyCss', function () {
    gulp.src(vendorPaths.css)
        .pipe(gulp.dest(dstPaths.css));
});

gulp.task('copyFonts', function () {
    gulp.src(vendorPaths.fonts)
        .pipe(gulp.dest(dstPaths.fonts));
});

gulp.task('copyLib', function () {
    gulp.src(vendorPaths.js)
        .pipe(gulp.dest(dstPaths.lib));
});

gulp.task('copyImg', function () {
    gulp.src(srcPaths.img)
        .pipe(gulp.dest(dstPaths.img));
});

gulp.task('copy', ['copyCss', 'copyFonts', 'copyLib', 'copyImg']);

gulp.task('sass', () =>
    sass(srcPaths.css)
        .on('error', sass.logError)
        .pipe(gulp.dest(dstPaths.css))
);

gulp.task('lint', function () {
    gutil.log('linting src', gutil.colors.magenta('js files...'));
    return gulp.src(srcPaths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
    gulp.watch(watchPaths.all, ['default']).on('change', function (event) {
        gutil.log(gutil.colors.magenta('Watch triggered by: '), event);
    });
});

gulp.task('scripts', ['lint'], function () {
    gutil.log('copying', gutil.colors.magenta('js files'));
    gulp.src(srcPaths.scripts)
        .pipe(gulp.dest(dstPaths.js));
});

gulp.task('default', ['scripts', 'sass', 'copy']);
