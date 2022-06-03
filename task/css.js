import gulp from "gulp";

// Конфигурация
import path from "../gulpfile.babel.js/config/path.js";
import app from "../gulpfile.babel.js/config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import concat from "gulp-concat";
import cssImport from "gulp-cssimport";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import webpCss from "gulp-webp-css";
// import shorthand from "gulp-shorthand"; //Todo --> Некорректно работает плагин
// import groupCssMediaQueries from "gulp-group-css-media-queries"; //Todo --> Некорректно работает плагин


// Обработка CSS
const css = () => {
  return gulp.src(path.css.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "CSS",
        message: error.message
      }))
    }))
    .pipe(concat("main.css"))
    .pipe(cssImport())
    .pipe(webpCss())
    .pipe(autoprefixer())
    // .pipe(shorthand()) //Todo -->
    // .pipe(groupCssMediaQueries()) //Todo -->
    .pipe(size({ title: "Before"}))
    .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(csso())
    .pipe(size({ title: "After"}))
    .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }))
}

export default css