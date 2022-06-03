import gulp from "gulp";

// Конфигурация
import path from "../gulpfile.babel.js/config/path.js";
import app from "../gulpfile.babel.js/config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fileInclude from "gulp-file-include";
import size from "gulp-size";
import htmlmin from "gulp-htmlmin";
import webpHtml from "gulp-webp-html";

// Обработка HTML
const html = () => {
  return gulp.src(path.html.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "HTML",
        message: error.message
      }))
    }))
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(size({ title: "Before" }))
    .pipe(htmlmin(app.htmlmin))
    .pipe(size({ title: "After" }))
    .pipe(gulp.dest(path.html.dest))
}

export default html