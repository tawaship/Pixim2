const gulp = require('gulp');
const plumber = require('gulp-plumber');
const jsdoc = require('gulp-jsdoc3');
const watch = require('gulp-watch');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const dir = path.normalize(__dirname + '/');

const webpackConfigDev = require('./webpack.config.dev');
const webpackConfigPro = require('./webpack.config.pro');

function initializer() {
	watch([dir + 'src/**/*.js'], function() {
		gulp.start(['core_webpackDev', 'core_doc']);
		gulp.start(['core_webpackPro']);
	});
}

gulp.task('default', initializer);

gulp.task('core_webpackDev', () => {
	return plumber()
		.pipe(webpackStream(webpackConfigDev, webpack))
		.pipe(gulp.dest(dir + 'dist'))
});

gulp.task('core_webpackPro', () => {
	return plumber()
		.pipe(webpackStream(webpackConfigPro, webpack))
		.pipe(gulp.dest(dir + 'dist'))
});

gulp.task('core_doc', ['core_webpackDev'], function () {
	gulp.src([dir + 'src/**/*.js'], {read: false})
		.pipe(jsdoc(require(dir + 'jsdoc.json')));
});

module.exports = initializer;