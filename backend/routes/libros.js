const express = require("express");
const upload = require("./multer"); // ⬅️ Importar multerConfig
const { dbRun, dbGet, dbAll } = require("../db");
const router = express.Router();

const BASE_URL = "http://localhost:5000"; // Ajusta esto según tu dominio

router.get("/", async (req, res) => {
  try {
    let libros = await dbAll(`
      SELECT 
        libros.id, 
        libros.titulo, 
        libros.descripcion, 
        libros.categoria, 
        libros.imagen_url, 
        libros.disponible, -- 🔹 Agregamos el estado de disponibilidad
        autores.nombre AS autor, 
        GROUP_CONCAT(generos.nombre, ', ') AS generos
      FROM libros
      LEFT JOIN autores ON libros.autor_id = autores.id
      LEFT JOIN libro_genero ON libros.id = libro_genero.libro_id
      LEFT JOIN generos ON libro_genero.genero_id = generos.id
      GROUP BY libros.id
    `);

    // 🔹 Agregar URL completa a la imagen y estado de préstamo
    libros = libros.map((libro) => ({
      ...libro,
      imagen_url: libro.imagen_url ? `${BASE_URL}${libro.imagen_url}` : null,
      estado: libro.disponible ? "Disponible" : "Prestado", // ✅ Agregamos estado en texto
    }));

    res.json(libros);
  } catch (error) {
    console.error("❌ Error al obtener libros:", error);
    res.status(500).json({ mensaje: "Error al obtener libros" });
  }
});

// 📌 Obtener un libro por su ID, incluyendo quién lo tiene prestado
router.get("/:id", async (req, res) => {
  try {
    const libroId = req.params.id;

    const libro = await dbGet(
      `SELECT 
          libros.id, 
          libros.titulo, 
          libros.descripcion, 
          libros.categoria, 
          libros.disponible, 
          libros.imagen_url, 
          autores.nombre AS autor,  -- ✅ Obtenemos el nombre del autor
          prestamos.usuario_id AS usuario_prestamo_id, 
          prestamos.fecha_prestamo, 
          prestamos.fecha_devolucion,
          GROUP_CONCAT(generos.nombre, ', ') AS generos -- ✅ Concatenamos los géneros en una sola columna
        FROM libros
        LEFT JOIN prestamos ON libros.id = prestamos.libro_id 
        LEFT JOIN autores ON libros.autor_id = autores.id  -- ✅ Corregimos el JOIN con autores
        LEFT JOIN libro_genero ON libros.id = libro_genero.libro_id
        LEFT JOIN generos ON libro_genero.genero_id = generos.id
        WHERE libros.id = ? 
        GROUP BY libros.id, prestamos.usuario_id, prestamos.fecha_prestamo, prestamos.fecha_devolucion
        ORDER BY prestamos.fecha_prestamo DESC 
        LIMIT 1`,
      [libroId]
    );

    // console.log("📚 Libro encontrado:", libro);

    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado." });
    }

    res.json(libro);
  } catch (error) {
    console.error("❌ Error al obtener información del libro:", error);
    res.status(500).json({ mensaje: "Error al obtener libro." });
  }
});

router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { titulo, autor_id, descripcion, categoria, genero_id } = req.body;

    const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

    // 🔹 Insertar el libro en la base de datos
    await dbRun(
      "INSERT INTO libros (titulo, autor_id, descripcion, categoria, imagen_url) VALUES (?, ?, ?, ?, ?)",
      [titulo, autor_id, descripcion, categoria, imagen_url]
    );

    // 🔹 Obtener el último libro insertado
    const newBook = await dbGet(
      "SELECT * FROM libros ORDER BY id DESC LIMIT 1"
    );

    // 🔹 Asignar género al libro si `genero_id` está presente
    if (genero_id) {
      await dbRun(
        "INSERT INTO libro_genero (libro_id, genero_id) VALUES (?, ?)",
        [newBook.id, genero_id]
      );
    }

    res.status(201).json(newBook);
  } catch (error) {
    console.error("❌ Error al agregar libro:", error);
    res.status(500).json({ mensaje: "Error al agregar libro" });
  }
});

module.exports = router;
