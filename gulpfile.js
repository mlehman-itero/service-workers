const { 
    src, 
    dest, 
    parallel
} = require('gulp');

function copyCss(cb) {
    return src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/bootstrap/dist/css/bootstrap.css.map',
        './src/css/**/*.css'
    ]).pipe(dest('./public/dist/css/'));
}

function copyJs(cb) {
    return src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/bootstrap/dist/js/bootstrap.js.map',
        './src/js/**/*.js'
    ]).pipe(dest('./public/dist/js/'));
}

exports.default = parallel(copyCss, copyJs);