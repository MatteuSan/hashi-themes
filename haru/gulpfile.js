const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

const hashiExtractor = (content) => {
  return content.match(/[@]?[hs-]?[A-z0-9-:\/]+/g);
}

function compileSass() {
  return src(['css/main.scss'], { sourcemaps: true })
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(dest('./css', { sourcemaps: '.' }));
}

function purge() {
  return src('css/main.css')
    .pipe(purgecss({
      content: ['index.html'],
      safelist: ['html'],
      extractors: [
        { extractor: hashiExtractor, extensions: ['html'] },
      ],
    }))
    .pipe(dest('./css'))
}

exports.default = series(
  compileSass,
  purge
);