const gulp = require('gulp');
const path = require('path');

const core = require(path.normalize(__dirname + '/src/core/gulpfile.js'));
const sound = require(path.normalize(__dirname + '/src/sound/gulpfile.js'));

gulp.task('default', function() {
	core();
	sound();
});