///////////////////////////////
// VAR
//////////////////////////////
var gulp        = require('gulp')
var stylus      = require('gulp-stylus')
var nib         = require('nib');
var cssmin      = require('gulp-cssmin')
var rename      = require('gulp-rename')
var htmlmin     = require('gulp-htmlmin')
var uglify      = require('gulp-uglify')
var notify      = require('gulp-notify')
var browserSync = require('browser-sync')
var reload      = browserSync.reload;


///////////////////////////////
// CSS
//////////////////////////////
gulp.task('styles', function(){
    gulp.src('./src/stylus/main.styl')
    //.pipe(sass())
    //.on('error', sass.logError)
    .pipe( stylus({
            use:[nib()]
        }).on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Stylus Error!"
      } ) )
    )
    .pipe(gulp.dest('./src/css'))
    .pipe(notify('STYLUS - хорошая работа!'))
    .pipe(reload({stream:true}))

})
gulp.task('cssmin', function(){
    gulp.src('./src/css/*.css')    
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
})
///////////////////////////////
// HTML
//////////////////////////////

gulp.task('html', function(){
  gulp.src('./src/index.html')
  .pipe(reload({stream:true}))
})
gulp.task('htmlmin', function() {
     gulp.src('./src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
})
///////////////////////////////
// JS
//////////////////////////////

gulp.task('js', function(){
  gulp.src('./src/js/*.js')
  .pipe(reload({stream:true}))
})
gulp.task('jsmin', function () {
    gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
})

///////////////////////////////
// DEV-SERVER
//////////////////////////////
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});


///////////////////////////////
// WATCH
//////////////////////////////
gulp.task('watcher', function(){
    gulp.watch('./src/stylus/**/*.styl', ['styles'])    
    gulp.watch('./src/js/*.js', ['js'])
    gulp.watch('./src/index.html', ['html'])
})

gulp.task('default',['watcher', 'server'])
gulp.task('build',['cssmin', 'htmlmin', 'jsmin'])