//Text Variables
var strt = '>---Starting ',
  end = ' Task---<';

//Dependencies Needed
var gulp = require('gulp');
var rename = require('gulp-rename');// not sure I need this
var concat = require('gulp-concat');// not sure I need this
var srcMaps = require('gulp-sourcemaps');
var del = require('del');
var zip = require('gulp-zip');

//HTML Dependencies
var minifyHTML = require('gulp-htmlmin');
var inlineSource = require('gulp-inline-source');


//Scripts Dependencies
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

//Styles Dependencies
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

//Image Dependencies
var imgS = require('gulp-image');

//Servers Dependencies
var browserSync = require('browser-sync').create();

/*============
= File Paths =
=============*/


//Source
var SCRIPTS_PATH = 'src/js/*.js',
  HTML_PATH = 'src/*.html',
  IMG_PATH = 'src/images/*.{png,jpeg,jpg,gif,svg}',
  SCSS_PATH = 'src/scss/{*,**/*}.scss',
  JAS_PATH = 'src/jasmine/{*,**/*,**/**/*}',
  AUD_PATH = 'src/audio/*.mp3';


//Distribution
var DIST_DIR = 'live',
  DIST_CSS = DIST_DIR+'/css',
  DIST_JS = DIST_DIR+'/js',
  DIST_IMG = DIST_DIR+'/images',
  DIST_AUD = DIST_DIR+'/audio';

//Testing
var TEST_DIR = 'test',
  TEST_CSS = TEST_DIR+'/css',
  TEST_JS = TEST_DIR+'/js',
  TEST_IMG = TEST_DIR+'/images',
  TEST_AUD = TEST_DIR+'/audio';


/*============
=   Styles   =
=  for Dist  =
=============*/
gulp.task('sass-dist', function () {
  console.log(strt + 'SASS Styles for DIST' + end);

  return gulp.src(SCSS_PATH)
    .pipe(sass({
        outputStyle: 'compressed'
        }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(DIST_CSS));
});


/*============
=   Styles   =
=  for Dev   =
=============*/
gulp.task('sass-dev', function () {
  console.log(strt + 'SASS Styles for DEV' + end);

  return gulp.src(SCSS_PATH)
    .pipe(srcMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(srcMaps.write())
    .pipe(gulp.dest(TEST_CSS));
});

/*============
=   Scripts  =
=  for Dist  =
=============*/
gulp.task('library-dist', function () {
  console.log(strt + 'LIBRARY SCRIPTS DIST' + end);

  return gulp.src('src/js/library/*.js')
    .pipe(gulp.dest(DIST_JS));
});
gulp.task('scripts-dist',['lint-dist','library-dist'], function () {
  console.log(strt + 'SCRIPTS for DIST' + end);

  return gulp.src(SCRIPTS_PATH)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(DIST_JS));
});

/*============
=   Scripts  =
=   for Dev  =
=============*/
gulp.task('json-dev', function () {
  console.log(strt + 'LIBRARY SCRIPTS DEV' + end);

  return gulp.src('src/sample-json/*.json')
    .pipe(gulp.dest(TEST_DIR+'/json'));
});
gulp.task('library-dev', function () {
  console.log(strt + 'LIBRARY SCRIPTS DEV' + end);

  return gulp.src('src/js/library/*.js')
    .pipe(gulp.dest(TEST_JS));
});

gulp.task('scripts-dev',['lint-dev','library-dev','json-dev'], function () {
  console.log(strt + 'SCRIPTS DEV' + end);

  return gulp.src(SCRIPTS_PATH)
    .pipe(srcMaps.init())
    .pipe(babel())
    .pipe(srcMaps.write())
    .pipe(gulp.dest(TEST_JS));
});

/*============
=   JASMINE  =
=   Scripts  =
=   for Dev & Dist  =
=============*/
gulp.task('jasmine-dev', function () {
  console.log(strt + 'JASMINE TESTING ENVIRONMENT' + end);

  return gulp.src(JAS_PATH)
    .pipe(gulp.dest(TEST_DIR+'/jasmine'));
});

gulp.task('jasmine-dist', function () {
  console.log(strt + 'JASMINE TESTING ENVIRONMENT' + end);

  return gulp.src(JAS_PATH)
    .pipe(gulp.dest(TEST_DIR+'/jasmine'));
});

/*============
=    Lint    =
=============*/
gulp.task('lint-dist', function () {
  console.log(strt + 'Linting' + end);
  return gulp.src(SCRIPTS_PATH)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint-dev', function () {
  console.log(strt + 'Linting' + end);
  return gulp.src(SCRIPTS_PATH)
    .pipe(eslint({
      "rules": {
      'no-console': 0
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

/*============
=            =
=  RESOURCES =
=            =
=============*/
gulp.task('resources-dev', function () {
  console.log(strt + 'Moving project required resources' + end);

  return gulp.src('src/fonts/{*,**/*,**/**/*}')
    .pipe(gulp.dest(TEST_DIR+'/fonts'));
});

gulp.task('resources-dist', function () {
    console.log(strt + 'Moving project required resources' + end);

  return gulp.src('src/fonts/{*,**/*,**/**/*}')
    .pipe(gulp.dest(DIST_DIR+'/fonts'));
});

/*============
=    HTML    =
=  for Dist   =
=============*/

// Unfortunately inlinesource and htmlMinify don't play nice
//

gulp.task('html-dist', function () {
  console.log(strt + 'HTML for DIST' + end);

  return gulp.src(HTML_PATH)
    .pipe(inlineSource())
    .pipe(minifyHTML({
      collapseWhitespace:true,
      collapseInlineTagWhitespace:true,
      minifyJS:true,
      removeComments:true,
      removeEmptyAttributes:true
    }))
    .pipe(gulp.dest(DIST_DIR));
});

/*============
=    HTML    =
=  for Dev   =
=============*/

gulp.task('html-dev', ['sass-dev'], function () {
  console.log(strt + 'HTML for DEV' + end);

  return gulp.src(HTML_PATH)
    .pipe(inlineSource())
    .pipe(minifyHTML({
      collapseWhitespace:true,
      collapseInlineTagWhitespace:true,
      minifyJS:true,
      removeComments:true,
      removeEmptyAttributes:true
    }))
    .pipe(gulp.dest(TEST_DIR));
});

/*============
=   IMAGES   =
=  for Dist  =
=============*/

gulp.task('images-dist', function () {
  console.log(strt + 'Images for DIST' + end);

  return gulp.src(IMG_PATH)
    .pipe(imgS())
    .pipe(gulp.dest(DIST_IMG));
});

/*============
=   IMAGES   =
=  for Dev   =
=============*/
gulp.task('images-dev', function () {
  console.log(strt + 'Images for DEV' + end);

  return gulp.src(IMG_PATH)
    .pipe(imgS())
    .pipe(gulp.dest(TEST_IMG));
});

/*============
=   Server   =
=  for Dist  =
=============*/
gulp.task('serve:dist', function() {

  gulp.watch(SCRIPTS_PATH, ['scripts-dist']);
  gulp.watch(JAS_PATH,['jasmine-dist']);
  gulp.watch(SCSS_PATH, ['sass-dist']);
  gulp.watch(IMG_PATH, ['images-dist']);
  gulp.watch(HTML_PATH, ['html-dist']);

  browserSync.init({
  server: {
    baseDir: DIST_DIR+'/',
    domain: 'local.dev'
  }
  });

  gulp.watch([DIST_DIR+'/**/*.css', DIST_DIR+'/**/*.js', DIST_DIR+'/**/*.{png,jpeg,jpg,gif,svg}',DIST_DIR+'/{*.html,**/*.html}']).on('change', browserSync.reload);
});

/*============
=   Server   =
=  for Dev   =
=============*/
gulp.task('serve:dev', ['scripts-dev',
  'jasmine-dev',
  'resources-dev',
  'images-dev',
  'html-dev'],
  function() {

  browserSync.init({
      server: {
      baseDir: TEST_DIR+'/'
  }
  });

  gulp.watch(SCRIPTS_PATH, ['scripts-dev-watch']);
  gulp.watch(JAS_PATH,['jasmine-dev-watch']);
  gulp.watch(IMG_PATH, ['images-dev-watch']);
  gulp.watch(SCSS_PATH, ['html-dev-watch']);
  gulp.watch(HTML_PATH, ['html-dev-watch']);
});



/*============
=  WATCHING  =
=  Gulp      =
=   Serve    =
=============*/

gulp.task('scripts-dev-watch',['scripts-dev'], function(done) {
  browserSync.reload()
  done()
});

gulp.task('images-dev-watch',['images-dev'], function(done) {
  browserSync.reload()
  done()
});

gulp.task('css-dev-watch',['css-dev'], function(done) {
  browserSync.reload()
  done()
});

gulp.task('html-dev-watch',['html-dev'], function(done) {
  browserSync.reload()
  done()
});

/*============
=   Delete   =
=    Task    =
=============*/
gulp.task('clean', function () {
  return del.sync([
    DIST_DIR+'/**',
    TEST_DIR+'/**'
  ]);
});

/*=====================
=   Create Production =
=      Ready Site     =
=         Task        =
=====================*/
gulp.task('dist', ['sass-dist','jasmine-dist', 'resources-dist','scripts-dist', 'images-dist','html-dist'], function () {
  console.log('>---- Distribution  folder Created ----<');
});

/*=====================
=   Export Production =
=      Ready Site     =
=         Task        =
=====================*/
gulp.task('export', ['dist'], function () {
  return gulp.src('{dist/**,src/**,.babelrc,.eslintrc,gulpfile.js,package.json}')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'));
});

/*============
=  Default   =
=  Function  =
=============*/
//This function will clean out your distribution folder, and then update it with all the recent changes. After running this, it's best to run 'gulp serve' to get your live preview playing.
gulp.task('default', [
  'clean',
  'serve:dev'
]);

