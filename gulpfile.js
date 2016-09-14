//Starting Gulp Project
// npm init
// npm install gulp gulp-electron gulp-livereload gulp-sass gulp-autoprefixer gulp-run gulp-useref gulp-uglify gulp-cssnano gulp-imagemin gulp-cache del run-sequence gulp-plumber --save-dev


var gulp = require('gulp'), // npm install gulp --save-dev
	electron = require('gulp-electron'), //npm install gulp-electron --save-dev
	packageJson = require('./package.json'),
	sass = require('gulp-sass'), // npm install gulp-sass --save-dev
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'), // npm install gulp-livereload
	connect = require('electron-connect').server.create(),
	// run = require('gulp-run'), // npm install gulp-run
	useref = require('gulp-useref'), // npm install gulp-useref --save-dev
	uglify = require('gulp-uglify'), // npm install gulp-uglify --save-dev
	cssnano = require('gulp-cssnano'), // npm install gulp-cssnano
	gulpIf = require('gulp-if'),
	imagemin = require('gulp-imagemin'), // npm install gulp-imagemin --save-dev
	cache = require('gulp-cache'), // npm install gulp-cache --save-dev
	del = require('del'), // npm install del --save-dev
	runSequence = require('run-sequence'), // npm install run-sequence --save-dev
	plumber = require('gulp-plumber'); // npm install gulp-plumber --save-dev

// Gulp tasks

// Electron - Creates Electron based distributable applications
gulp.task('electron', function() {
	gulp.src('./package.json')
	.pipe(electron({
		src: '',
		packageJson: packageJson,
		release: './release',
		cache: './cache',
		version: 'v0.37.4',
		packaging: true,
		// token: 'abc123',
		platforms: ['darwin','win32','linux','darwin-x64','linux-ia32',
		'linux-x64','win32-ia32','win64-64'],
		platformResources: {
			darwin: {
				CFBundleDisplayName: packageJson.name,
					CFBundleIdentifier: packageJson.name,
					CFBundleName: packageJson.name,
					CFBundleVersion: packageJson.version,
					icon: 'gulp-electron.icns'
			},
			win: {
				"version-string": packageJson.version,
					"file-version": packageJson.version,
					"product-version": packageJson.version,
					"icon": 'gulp-electron.ico'
			}
		}
	}))
	.pipe(gulp.dest(''));
});


// Gulp Plumber Variable for errors
var onError = function(err) {
	console.log(err.toString());
	this.emit('end');
};

// Sass - Compiles Sass or SCSS files
gulp.task('sass', function () {
	return gulp.src('main/sass/**/*.sass')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())
		.pipe(gulp.dest('main/css'))
		.pipe(livereload());
});

// Autoprefixer - Uses prefixes for CSS rules
gulp.task('auto', function() {
	return gulp.src('main/*.css')
		.pipe(autoprefixer({
			browers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('main/*.css'));
});

// Electron Connect - Live reloads Electron app
gulp.task('serve', function() {
	connect.start();
	gulp.watch('*.js', connect.restart);
	gulp.watch(['./main.js', './index.html'], connect.reload);
})

// Useref - Concatenate CSS and JS files
gulp.task('useref', function() {
	return gulp.src('./*.html')
		.pipe(useref())
		// Only minifies JS files
		.pipe(gulpIf('*.js', uglify()))
		// Only minfies CSS files
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('app/'))
});

// ImageMin - Minifies images
gulp.task('images', function() {
	return gulp.src('main/img/**/*.+(png|jpg|gif|svg)')
		// Caches images that run through imagemin
		.pipe(cache(imagemin({
			interlaced: true
	})))
		.pipe(gulp.dest('main/img'))
});

// Fonts - Copies fonts to dist
gulp.task('fonts', function() {
	return gulp.src('main/fonts/**/*')
		.pipe(gulp.dest('main/fonts'))
});

// // Delete - Cleans up generated files
// gulp.task('clean:dist', function() {
// 	return del.sync('app/dist');
// });

// Run Sequence - Runs a sequence of tasks
gulp.task('build', function(callback) {
	runSequence(//'clean:dist',
		['sass', 'auto', 'useref', 'images', 'fonts'],
				  callback
	)
});

// Run Sequence 2 - Runs sequence
gulp.task('default', function(callback) {
	runSequence(['sass', 'serve', 'watch'],
		callback
	)
});

//This lets Gulp watch and update any Sass and JS files
gulp.task('watch', ['sass'], function () {
	livereload.listen();
	gulp.watch('main/sass/**/*.sass', ['sass']);
	gulp.watch('./*.html');
	gulp.watch('main/js/**/*.js')
})
