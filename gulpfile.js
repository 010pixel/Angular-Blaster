'use strict';

var gulp = require('gulp'),
	clean = require('gulp-clean'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-cssmin'),
	gcmq = require('gulp-group-css-media-queries'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	beautify = require('gulp-jsbeautify'),
	rename = require('gulp-rename'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	fontAwesome = require('node-font-awesome');

var env = process.env.NODE_ENV || 'dev';

var files = {
	js: {
		requiredLibraryList: [
			"node_modules/jquery/dist/jquery.min.js",
			"node_modules/jquery-confirm/dist/jquery-confirm.min.js",
			"node_modules/angular/angular.min.js",
			"node_modules/angular-ui-router/release/angular-ui-router.min.js",
			"node_modules/angular-animate/angular-animate.min.js",
			"node_modules/material-design-lite/material.min.js",
		],
		inputPath: "dev/js/",
		outputPath: "prod/js"
	},
	css: {
		required: [],
		inputPath: "dev/scss",
		outputPath: "prod/css"
	}
}

gulp.task('scripts-libs', function() {

	console.log("scripts libraries working");

	gulp.src('dev/*.json')
		.pipe(gulp.dest('prod/'));

	// Get and Combine all required Libraries
	gulp.src(files.js.requiredLibraryList)
		.pipe(concat("required-libs.js", {newLine: '\n; '}))
		.pipe(gulp.dest(files.js.outputPath));

	// Get and Combine all required Libraries
	gulp.src(files.js.inputPath + "/libs/**")
		.pipe(gulp.dest(files.js.outputPath + "/libs/"));
});

gulp.task('scripts', ['scripts-libs'], function() {

	var jsfiles = gulp.src(files.js.inputPath + "modules/**");
	
	// Concat and Beautify files
	var beautifiedConcatedFiles = jsfiles
		.pipe(concat("all.js", {newLine: '\n; '}))
		.pipe(beautify({indentSize: 2}))
		.pipe(gulp.dest(files.js.outputPath));

	// Minify files
	var minifiedFiles = beautifiedConcatedFiles
		.pipe(rename({suffix:".min"}))
		.pipe(uglify())
		.pipe(gulp.dest(files.js.outputPath));

	console.log("scripts working");

});

gulp.task('production', ['default'], function() {

	gulp.src("dev/images/**")
		.pipe(imagemin())
		.pipe(gulp.dest("prod/images"));

	setTimeout(function() {
		gulp.src([files.js.outputPath + '/required-libs.js', files.js.outputPath + '/all.min.js' ])
			.pipe(concat("scripts.min.js", {newLine: '\n; '}))
			.pipe(gulp.dest(files.js.outputPath));
	}, 500);

	setTimeout(function() {
		gulp.src([files.js.outputPath + '/all.js', files.js.outputPath + '/all.min.js', files.js.outputPath + '/required-libs.js'])
			.pipe(clean());
	}, 1000);

	console.log("production working");

});


gulp.task('clean', function() {

	setTimeout(function() {
		gulp.src([files.js.outputPath + '/all.js', files.js.outputPath + '/all.min.js', files.js.outputPath + '/required-libs.js'])
			.pipe(clean());
	}, 1000);

	console.log("clean working");

});

gulp.task('sass', function() {

	console.log("sass (styles) working");

	var sassOptions = {
		errLogToConsole: true,
		outputStyle: 'nested',
		includePaths: [
			'node_modules/compass-mixins/lib/'
		]//'compressed'
	};

	gulp.src(files.css.inputPath + "/*.css")
		.pipe(gulp.dest(files.css.outputPath));
	// Combile SCSS and Output to CSS
	gulp.src(files.css.inputPath + "/*.scss")
		.pipe(sass(sassOptions).on("error", sass.logError))
		.pipe(autoprefixer({browsers: ['last 4 version']}))
		.pipe(gcmq())
		.pipe(cssmin())
		.pipe(gulp.dest(files.css.outputPath));
});

gulp.task('html', function() {

	console.log("html working");

	var templates = gulp.src('dev/templates/**')
	.pipe(gulp.dest('prod/templates/'));

	return gulp.src(['dev/*.html','dev/*.php'])
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('prod'));

});

gulp.task('fonts', function() {
	gulp.src(fontAwesome.fonts)
		.pipe(gulp.dest('prod/fonts'));
});

gulp.task('images', function() {
	gulp.src("dev/images/**")
		// .pipe(imagemin())
		.pipe(gulp.dest("prod/images"))
});

gulp.task('default', ['scripts', 'scripts-libs', 'sass', 'html', 'fonts', 'images'], function() {
	console.log("default working");
});

gulp.task('watcher', function() {
	// If any HTML file changes, update html
	var htmlWatcher = gulp.watch(["dev/*.html", "dev/*.php"], ['html']);
	htmlWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});

	// If any template file changes, update template
	var templateHtmlWatcher = gulp.watch(["dev/templates/**"], ['html']);
	templateHtmlWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});

	// If any SCSS file changes, update main stylesheet
	var sassWatcher = gulp.watch(files.css.inputPath + "/**/*.scss", ['sass']);
	sassWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});

	// If any JS file changes, update main stylesheet
	var jsWatcher = gulp.watch(files.js.inputPath + "/modules/**", ['scripts']);
	jsWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});