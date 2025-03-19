const express = require("express");
const { dbAll, dbRun, dbGet } = require("../db"); // Importar la conexión a SQLite
const router = express.Router();

// 📌 Obtener todos los autores
router.get("/", async (req, res) => {
  try {
    const autores = await dbAll("SELECT * FROM autores ORDER BY nombre ASC");
    res.json(autores);
  } catch (error) {
    console.error("❌ Error al obtener autores:", error);
    res.status(500).json({ mensaje: "Error al obtener autores" });
  }
});

// 📌 Agregar un nuevo autor
router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre.trim()) {
      return res.status(400).json({ mensaje: "El nombre del autor es obligatorio" });
    }

    // Insertar el nuevo autor y obtener el último ID insertado
    await dbRun("INSERT INTO autores (nombre) VALUES (?)", [nombre]);
    
    // Obtener el autor recién insertado
    const autorAgregado = await dbGet("SELECT * FROM autores ORDER BY id DESC LIMIT 1");

    res.status(201).json(autorAgregado); // 🔹 Enviar el nuevo autor con ID y nombre
  } catch (error) {
    console.error("❌ Error al agregar autor:", error);
    res.status(500).json({ mensaje: "Error al agregar autor" });
  }
});


module.exports = router;

