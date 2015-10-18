var gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    htmlreplace = require('gulp-html-replace'),
    rename = require("gulp-rename"),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify');



// Generate sprite
gulp.task('sprite', function() {
    var spriteData = gulp.src('./sprite/*.png').pipe(spritesmith({
        retinaSrcFilter: ['./sprite/*-2x.png'],
        imgName: 'sprite.png',
        retinaImgName: 'sprite-2x.png',
        cssName: '_sprite.scss',
    }));

    var imgStream = spriteData.img
        .pipe(imagemin())
        .pipe(gulp.dest('./css/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('./scss/'));
});



// Compile SASS
gulp.task('sass', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(sass({
            //outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
});



// Prepare for production
// gulp.task('production', function() {

//     // Replace non-optimized styles and scripts
//     gulp.src('*.dev.html')
//         .pipe(htmlreplace({
//             'css': 'css/main.min.css',
//         }))
//         .pipe(rename(function(path) {
//             // Вырежем концову (dev) с имени файла
//             path.basename = path.basename.split('.')[0];
//         }))
//         .pipe(htmlmin({
//             collapseWhitespace: true
//         }))
//         .pipe(gulp.dest("./"));

//     // Autoprefix and optimize CSS
//     gulp.src('./css/main.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', '> 1%', 'ie > 8'],
//             cascade: false
//         }))
//         .pipe(rename(function(path) {
//             path.basename = "main.min";
//         }))
//         .pipe(csso())
//         .pipe(gulp.dest('./css'))

//     // Minify JS
//     gulp.src('./js/main.js')
//         .pipe(uglify())
//         .pipe(rename(function(path) {
//             path.basename = "main.min";
//         }))
//         .pipe(gulp.dest('./js'));
// });



// Default task
gulp.task('default', ['sass', 'sass:watch']);