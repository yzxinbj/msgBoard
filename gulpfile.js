var gulp = require('gulp');
var del = require('del');
//插件名称和对象key值相同，可以通过$获取插件引用
var $ = require('gulp-load-plugins')();

//删除文件夹
gulp.task('clean', del.bind(null, ['public/dist']));


gulp.task('minifyjs', function() {
    return gulp.src('src/*.js')
        .pipe($.concat('main.js'))    //合并所有js到main.js
        .pipe($.rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe($.uglify())    //压缩
        .pipe(gulp.dest('public/dist')); //输出
});


gulp.task('default', ['clean'], function () {
    gulp.start('minifyjs');
});
