const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta de la base de datos SQLite
const dbPath = path.resolve(__dirname, "Biblioteca.db");

// Crear conexión a la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al conectar a SQLite:", err.message);
  } else {
    console.log("✅ Conexión a SQLite exitosa");
  }
});

// Promisify db operations for easier async/await usage
const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = { db, dbRun, dbAll, dbGet };