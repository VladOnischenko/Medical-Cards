// Конфигурация
import path from "../gulpfile.babel.js/config/path.js";

// Плагины
import del from "del";

// Удаление директории
const clear = () => {
  return del(path.root)
}

export default clear