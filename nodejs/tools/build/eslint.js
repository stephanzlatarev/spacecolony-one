const PATH = require('path');

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');

const ROOT = '../../';

const SERVER_PATHS = [
  'app/**/*.js',
  '!app/public/**',
  'gulpfile.js',
  'tools/**/*.js'
].map(function(path) {
  if (path.startsWith('!')) {
    return '!' + PATH.resolve(__dirname, ROOT, path.substr(1));
  }
  return PATH.resolve(__dirname, ROOT, path);
});

const CONFIG_PATH = PATH.resolve(__dirname, ROOT, 'tools/build/config/eslint-config.json');

gulp.task('lint:app', function() {
  return gulp.src(SERVER_PATHS)
    .pipe(plumber())
    .pipe(eslint({configFile: CONFIG_PATH}))
    .pipe(eslint.format());
});

gulp.task('lint:watch:app', [ 'lint:app' ], function() {
  gulp.watch(SERVER_PATHS, [ 'lint:app' ]);
});
