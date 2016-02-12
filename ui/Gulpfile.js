var gulp = require( 'gulp' );
var jshint = require('gulp-jshint');
var less = require( 'gulp-less' );
var concat = require( 'gulp-concat' );
var ngAnnotate =require( 'gulp-ng-annotate' );
var cssmin =require( 'gulp-cssmin' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var flatten = require( 'gulp-flatten' );

gulp.task('lint', function() {
    return gulp.src(['./app/components/**/*.js','./app/app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

gulp.task('less', function () {
    return gulp.src(['./app/less/style.less', './app/less/vendor.less'])
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('min-less',[ 'less' ], function () {
    return gulp.src(['./dist/css/style.css', './dist/css/vendor.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('js-vendor', function () {
    return gulp.src([        
        './app/bower_components/angular/angular.js',
        './app/bower_components/angular-ui-router/release/angular-ui-router.js',
        './app/bower_components/angular-bootstrap/ui-bootstrap.js',
        './app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js-app', function () {
    return gulp.src(['./app/app.js', './app/components/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task( 'min-js',['js-vendor', 'js-app' ], function  (argument) {
    return gulp.src(['./dist/js/app.js', './dist/js/vendor.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js/'));
} );

gulp.task( 'partials', function() {
    return gulp.src( './app/components/**/*.html' )
    .pipe( flatten() )
    .pipe( gulp.dest( './dist/views/') );
} );

gulp.task( 'fonts', function  (argument) {
    return gulp.src( './app/fonts/icomoon/fonts/**' )
    .pipe( flatten() )
    .pipe( gulp.dest( './dist/css/fonts/') );
} )

gulp.task( 'default', [ 'min-js', 'min-less', 'partials' ] );