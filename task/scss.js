import gulp from "gulp";

// Конфигурация
import path from "../gulpfile.babel.js/config/path.js";
import app from "../gulpfile.babel.js/config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import size from "gulp-size";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import webpCss from "gulp-webp-css"; //Todo --> нужно проверить этот плагин
const sass = require("gulp-sass")(require("sass"));

// Обработка SCSS
const scss = () => {
  return gulp.src(path.scss.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "SCSS",
        message: error.message
      }))
    }))
    .pipe(sass())
    // .pipe(webpCss()) //Todo --> нужно проверить этот плагин
    .pipe(autoprefixer())
    .pipe(size({ title: "main.css"}))
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(size({ title: "main.min.css"}))
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
}

export default scss