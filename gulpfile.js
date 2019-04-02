var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');

gulp.task('serve', [], function(){
	browserSync.init({
		server: "./src"
	});
	browserSync.stream();
});

gulp.task('default',['compress', 'compcss', 'comphtml', 'serve'], function() {
	gulp.watch('src/*.js', ['lint']);
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'dist/**/*.min.js']) 
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('compress', function(){
	return gulp.src(['src/*.js'])
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('compcss', function () {
	gulp.src('src/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});
gulp.task('comphtml', function(){
	return gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
});
gulp.task('serve:dist', function(){
	browserSync.init({
		server: "dist"
	});
	browserSync.stream();
});
