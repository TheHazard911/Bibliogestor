const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta absoluta de la base de datos SQLite
const dbPath = path.resolve(__dirname, "Biblioteca.db");

// Crear conexión a SQLite con manejo de errores
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al conectar a SQLite:", err.message);
  } else {
    console.log("✅ Conexión a SQLite exitosa");
    
    // Habilitar claves foráneas en SQLite
    db.run("PRAGMA foreign_keys = ON;", (err) => {
      if (err) {
        console.error("⚠️ Error al habilitar claves foráneas:", err.message);
      }
    });
  }
});

// Convertir funciones SQLite a Promesas
const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        console.error("❌ Error en dbRun:", err.message);
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};

const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error("❌ Error en dbAll:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        console.error("❌ Error en dbGet:", err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Cerrar conexión correctamente cuando el proceso termine
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("❌ Error al cerrar SQLite:", err.message);
    } else {
      console.log("🔌 Conexión a SQLite cerrada");
    }
    process.exit(0);
  });
});

module.exports = { db, dbRun, dbAll, dbGet };
