var gulp = require('gulp');
var watchLess = require('gulp-watch-less');
var watch = require('gulp-watch');
//var less = require('gulp-less');
//var less = require('gulp-less-sourcemap');
var sass = require('gulp-sass');
var sourcemaps	= require('gulp-sourcemaps');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var compass = require('gulp-compass');


gulp.task('deploy', ['sass'], function() {
 
    var conn = ftp.create( {
        host:     'www.benmango.co.uk',
        user:     'u56392646',
        password: 'anais123',		  
        parallel: 10,
        log: gutil.log
    } );
 
    var globs = [
        //'src/**',
        'css/**'
        //'js/**',
        //'fonts/**',
        //'index.html'
    ];
 
    // using base = '.' will transfer everything to /public_html correctly 
    // turn off buffering in gulp.src for best performance 
 
    return gulp.src( globs, { base: '.', buffer: false } )
        //.pipe( conn.newer( '/public_html' ) ) // only upload newer files 
        .pipe( conn.dest( '/carerregister/sites/all/themes/cr/' ) );
 
});

gulp.task('watch', function() {
   // Watch sass files
	//watch('less/*.less', function() {
  watch('css/sass/**/*.scss', function() {
	//gulp.start('less');
	//gulp.start('deploy');
	//gulp.start('sass');
	gulp.start('compass');
	});
 });
 
gulp.task('sass', function() {
    gulp.src('css/sass/**/*.scss')
		 .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
		  .pipe(sourcemaps.write())
        //.pipe(gulp.dest('./css/'));
		  .pipe(gulp.dest('css/'));
});

 
gulp.task('compass', function() {
  gulp.src('css/sass/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'css/sass'
    }))
    .pipe(gulp.dest('./temp'));
});


gulp.task('default', ['watch']);

/*

 gulp.task('less', function() {
    return gulp.src('less/style.less')
       .pipe(less({
			  sourceMap: {
					sourceMapRootpath: 'less' // Optional absolute or relative path to your LESS files 
			  }
		 }))
		  
		  
			.on('error', function (error) {
				 gutil.log(gutil.colors.red(error.message))
				 // Notify on error. Uses node-notifier 
				 notifier.notify({
					  title: 'Less compilation error',
					  message: error.message
				 })
			})
			        
			
		.pipe(gulp.dest('css'));
});


gulp.task('less', function() {
    return gulp.src('less/style.less')
        .pipe(watchLess('less/style.less'))
        .pipe(less())
        .pipe(gulp.dest('css'))
		.pipe(deploy())
		/*
		.pipe(ftp({
		
			// using base = '.' will transfer everything to /public_html correctly 
			// turn off buffering in gulp.src for best performance 
		 
			return gulp.src( 'css/**', { base: '.', buffer: false } )
				//.pipe( conn.newer( '/public_html' ) ) // only upload newer files 
				//.pipe( conn.dest( '/signamicdev/sites/all/themes/signamic/') );
				.pipe( ftp.create( {
				host:     'signamic.co.uk',
				user:     'u68979641',
				password: 'sign123',
				parallel: 10,
				log: gutil.log
			} ).dest( '/signamicdev/sites/all/themes/signamic/');
		});
*/
/*
});

gulp.task('default', ['less']);
*/
 
