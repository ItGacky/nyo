var BIN_DIR = "./bin/";
var DEBUG_DIR = "./bld/";
var DEBUG_FILE = "main.js";
var WRAPPED_DIR = DEBUG_DIR;
var WRAPPED_FILE = "wrapped.js";
var RELEASE_DIR = "./assets/";
var RELEASE_FILE = "main.js";

var assert = require("assert");
assert.notEqual(DEBUG_DIR + DEBUG_FILE, WRAPPED_DIR + WRAPPED_FILE);
assert.notEqual(DEBUG_DIR + DEBUG_FILE, RELEASE_DIR + RELEASE_FILE);

var gulp = require("gulp");
var ts = require("gulp-typescript");
var rename = require("gulp-rename");
var insert = require("gulp-insert");
var minify = require("gulp-closurecompiler");
var open = require("gulp-open");
var del = require("del");

gulp.task("build", function () {
	var project = ts.createProject("./src/tsconfig.json", {
		outFile: DEBUG_FILE
	});
	return project.src().
		pipe(ts(project)).
		pipe(gulp.dest(DEBUG_DIR));
});

gulp.task("release", function () {
	return gulp.
		src(DEBUG_DIR + DEBUG_FILE).
		pipe(insert.wrap("(function() {\nvar NDEBUG=true;\n", "\n})();")).
		pipe(rename(WRAPPED_FILE)).
		pipe(gulp.dest(WRAPPED_DIR)).
		pipe(minify({ fileName: WRAPPED_FILE }, {
			compilation_level: "ADVANCED_OPTIMIZATIONS"
		})).
		pipe(rename(RELEASE_FILE)).
		pipe(gulp.dest(RELEASE_DIR));
});

gulp.task("test", function () {
	gulp.src("./index-debug.html").pipe(open());
});

gulp.task("default", function () {
	gulp.src("./index.html").pipe(open());
});

gulp.task("clean", function(cb) {
	del([BIN_DIR, DEBUG_DIR, WRAPPED_DIR], cb);
});
