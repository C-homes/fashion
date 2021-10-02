const gulp = require('gulp');
const config = {
    phpDir:'./src/api/*.php',
    phpDest:'./dist/api',
    imgDir:'./src/assets/img/*',
    imgDest:'./dist/img',
    scssDir:'./src/sass/dist/*.css',
    cssDest:'./dist/css',
    htmlDir:'./src/views/*.html',
    htmlDest:'./dist/html',
    jsDir:'./src/js/*.js',
    jsDest:'./dist/js',
    libDir:'./src/lib/*',
    libDest:'./dist/lib',
}

gulp.task('copy',(done)=>{
    gulp.src(config.phpDir)
    .pipe(gulp.dest(config.phpDest))
    gulp.src(config.imgDir)
    .pipe(gulp.dest(config.imgDest))
    gulp.src(config.scssDir)
    .pipe(gulp.dest(config.cssDest))
    gulp.src(config.htmlDir)
    .pipe(gulp.dest(config.htmlDest))
    gulp.src(config.jsDir)
    .pipe(gulp.dest(config.jsDest))
    gulp.src(config.libDir)
    .pipe(gulp.dest(config.libDest))
    done();
})