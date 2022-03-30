const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const tsify = require('tsify');
const fancy_log = require('fancy-log');

const paths = {
    pages: ['src/*.html'] 
};

//browserify will use tsify to compile typescript.
//watchify will check for changes and recompile the typescript files automatically.
let watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/app.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

//create a new gulp task called copy-html.
gulp.task('copy-html', function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

//A function that returns a watchify object.
function bundle() {
    return watchedBrowserify
        .bundle()
        .on('error', fancy_log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}

//create a dufault gulp task. 
gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundle));
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);