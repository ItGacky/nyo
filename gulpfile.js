var BIN_DIR = "./bin/";
var DEBUG_DIR = "./bld/";
var WRAPPED_DIR = DEBUG_DIR + "wrapped/";
var RELEASE_DIR = "./assets/";
var OUT_NAME = "main.js";

var gulp = require("gulp");
var ts = require("gulp-typescript");
var newer = require("gulp-newer");
var insert = require("gulp-insert");
var minify = require("gulp-closurecompiler");
var open = require("gulp-open");
var del = require("del");

gulp.task("build", function () {
	var project = ts.createProject("./src/tsconfig.json", {
		typescript: require('typescript'),
		outFile: OUT_NAME
	});
	return project.src().
		pipe(newer(DEBUG_DIR + OUT_NAME)).
		pipe(project()).
		pipe(gulp.dest(DEBUG_DIR));
});

gulp.task("release", ["build"], function () {
	return gulp.
		src(DEBUG_DIR + OUT_NAME).
		pipe(newer(RELEASE_DIR)).
		pipe(insert.wrap("(function() {\nvar NDEBUG=true;\n", "\n})();")).
		pipe(gulp.dest(WRAPPED_DIR)).
		pipe(minify({ fileName: OUT_NAME })).
		pipe(gulp.dest(RELEASE_DIR));
});

gulp.task("test", ["build"], function () {
	gulp.src("./index-debug.html").pipe(open());
});

gulp.task("default", ["release"], function () {
	gulp.src("./index.html").pipe(open());
});

gulp.task("clean", function(cb) {
	del([BIN_DIR, DEBUG_DIR], cb);
});
