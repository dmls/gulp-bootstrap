var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('./config.js');

// CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// JS
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// processes scss files
gulp.task('styles', function() {
	gulp.src(config.scssSourceFile)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest(config.cssDir));
});

// runs on processed css files
gulp.task('post-styles', function() {
	gulp.src(config.assetsDir + 'css/styles.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false,
		}))
		.pipe(gulp.dest('assets/css/'));
});

// javascript
gulp.task('js', function() {
	gulp.src([config.assetsDir + 'js/lib/**/*.js', config.assetsDir + 'js/vendor/**/*.js', config.assetsDir + 'js/main.js'])
		.pipe(babel())
		.pipe(concat('main.js', {newLine: '\r\n'}))
		.pipe(uglify())
		.pipe(gulp.dest(config.jsReleaseDir));
});

gulp.task('default', function() {
	gulp.watch(config.scssDir, ['styles']);
	gulp.watch(config.assetsDir + 'css/**/*.css', ['post-styles']);
	gulp.watch(config.jsDir, ['js']);
});

