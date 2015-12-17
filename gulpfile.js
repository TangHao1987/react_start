/**
 * Created by tang.hao on 14/12/2015.
 */
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var express = require('express');
var clean = require('gulp-clean');
var tiny_lr = require('tiny-lr');
var webpack = require("webpack");
var less = require("gulp-less");

webpackConfig = require("./webpack.config.js");
if (gulp.env.production) {
    webpackConfig.plugins = webpackConfig.plugins.concat(new webpack.optimize.UglifyJsPlugin());
    webpackConfig.output.filename = "main-[hash].js"
}
var vendorPaths = ['es5-shim/es5-sham.js', 'es5-shim/es5-shim.js', 'bootstrap/dist/css/bootstrap.css'];
var copyPaths = ['src/**/*', '!src/scripts', '!src/scripts/**/*', '!src/styles', '!src/styles/**/*'];
var httpPort = 4000;
//Tasks

gulp.task('clean', function () {
    gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('less', function () {
    gulp.src('src/styles/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/assets'))
});

gulp.task('vendor', function () {
    var paths = vendorPaths.map(function (p) {
        return path.resolve("./bower_components", p)
    });
    gutil.log(paths);
    gulp.src(paths)
        .pipe(gulp.dest('dist/assets/vendor'));

    gulp.src('./bower_components/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copy', function(){
    gulp.src(copyPaths).pipe(gulp.dest('dist'))
});

gulp.task ('webpack', function(callback){
    execWebpack(webpackConfig);
    callback()
});

gulp.task('dev', ['build'], function() {
    var servers = createServers(httpPort, 35729);
// When /src changes, fire off a rebuild
    gulp.watch(['./src/**/*', './src/**/**/*'], function () {
        gulp.run('build')
    });
    gulp.watch(['./src/styles/less/*.less'], function () {
        gulp.run('less')
    });
// When /dist changes, tell the browser to reload
    gulp.watch(['./dist/**/*'], function (evt) {
        gutil.log(gutil.colors.cyan(evt.path), 'changed');
        servers.lr.changed({body: {files: [evt.path]}});
    });
});



gulp.task ('build', ['webpack', 'less', 'copy', 'vendor'], function(){});
gulp.task ('default', ['build'], function(){});

// Give first-time users a little help
setTimeout (function(){
    gutil.log ("**********************************************");
    gutil.log ("* gulp              (development build)");
    gutil.log ("* gulp clean        (rm /dist)");
    gutil.log ("* gulp --production (production build)");
    gutil.log ("* gulp dev          (build and run dev server)");
    gutil.log ("**********************************************");
});


//create both http server and livereload server
createServers = function(port, lrport){
    lr = tiny_lr();
    lr.listen(lrport, function(){gutil.log("LiveReload listening on", lrport)});
    app = express();
    app.use(express.static(path.resolve("./dist")));
    app.listen(port, function(){
        gutil.log("HTTP server listening on", port);
    });
    return {
        lr: lr,
        app: app
    }
};

execWebpack = function(config) {
    webpack(config, function(err, stats) {
        if (err) {throw new gutil.PluginError("execWebpack", err)}
        gutil.log("[execWebpack]", stats.toString({colors: true}))
    });
};


