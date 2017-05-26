var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    htmlMin  = require('gulp-htmlmin'),
    imagemin  = require('gulp-imagemin'),
    del = require('del'); 
    
    //默认
    gulp.task('default', ['clean','minifycss', 'minifyjs','htmlMin','imagemin'], function() {
        gulp.start();
    });
    
    gulp.task('clean', function(cb) {
        del(['minified/css', 'minified/js','minified'], cb)
    });

    //压缩js
    gulp.task('minifyjs', function() {
        gulp.src('base/js/*.js')
           // .pipe(concat('main.js'))    //合并所有js到main.js
           // .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
           // .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
           .pipe(uglify())    //压缩
           .pipe(gulp.dest('minified/js'));  //输出
    });

    //压缩css
    gulp.task('minifycss', function() {
	  	gulp.src('base/css/*.css')      //压缩的文件
            // .pipe(rename({suffix: '.min'})) 
	        .pipe(minifycss())   //执行压缩
	        .pipe(gulp.dest('minified/css'));   //输出文件夹
	});

    //压缩html
    gulp.task('htmlMin', function () {
        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        gulp.src('*.html')
            .pipe(htmlMin(options))
            .pipe(gulp.dest('minified/'));
    });

    //图片压缩
    gulp.task('imagemin', function(){
        gulp.src('base/img/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('minified/img'))
    })
