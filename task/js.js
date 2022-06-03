import gulp from "gulp";

// Конфигурация
import path from "../gulpfile.babel.js/config/path.js";
import app from "../gulpfile.babel.js/config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import babel from "gulp-babel";
// import uglify from "gulp-uglify"; //Todo --> (25) можно не использовать если есть webpack
import webpack from "webpack-stream";

// Обработка JavaScript
const js = () => {
  return gulp.src(path.js.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "JavaScript",
        message: error.message
      }))
    }))
    .pipe(babel())
    .pipe(webpack(app.webpack))
    .pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }))
}

export default js