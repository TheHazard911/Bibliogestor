const express = require("express");
const router = express.Router();
const { dbRun, dbGet, dbAll } = require("../db");

let URL = "http://localhost:5000"; // Ajusta esto según tu dominio

// 📌 Registrar un nuevo préstamo
router.post("/", async (req, res) => {
  try {
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;

    console.log(fecha_devolucion)

    // 🔍 Verificar si el libro tiene un préstamo anterior marcado como devuelto
    const prestamoAnterior = await dbGet(
      "SELECT id FROM prestamos WHERE libro_id = ? AND devuelto = TRUE",
      [libro_id]
    );

    if (prestamoAnterior) {
      // 🗑️ Eliminar el préstamo anterior devuelto
      await dbRun("DELETE FROM prestamos WHERE id = ?", [prestamoAnterior.id]);
    }

    // 🔍 Verificar si el libro sigue teniendo un préstamo activo (no devuelto)
    const prestamoActivo = await dbGet(
      "SELECT id FROM prestamos WHERE libro_id = ? AND devuelto = FALSE",
      [libro_id]
    );

    if (prestamoActivo) {
      return res.status(400).json({
        mensaje: "Este libro ya está prestado y no ha sido devuelto.",
      });
    }

    // ✅ Insertar el nuevo préstamo
    await dbRun(
      "INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, devuelto) VALUES (?, ?, ?, ?, FALSE)",
      [usuario_id, libro_id, fecha_prestamo, fecha_devolucion]
    );

    // 🚫 Marcar el libro como no disponible
    await dbRun("UPDATE libros SET disponible = FALSE WHERE id = ?", [
      libro_id,
    ]);

    res.status(201).json({ mensaje: "📚 Préstamo registrado con éxito." });
  } catch (error) {
    console.error("❌ Error al registrar el préstamo:", error);
    res.status(500).json({ mensaje: "Error al registrar el préstamo." });
  }
});

router.get("/", async (req, res) => {
  try {
    const { usuario_id } = req.query;
    if (!usuario_id) {
      return res.status(400).json({ mensaje: "Se requiere el ID del usuario" });
    }

    let prestamos = await dbAll(
      `SELECT 
        prestamos.fecha_prestamo,
        prestamos.fecha_devolucion,
        libros.id, 
        libros.titulo, 
        libros.imagen_url, 
        libros.categoria,
        autores.nombre AS autor
        FROM prestamos
        JOIN libros ON prestamos.libro_id = libros.id
        LEFT JOIN autores ON libros.autor_id = autores.id
        WHERE prestamos.usuario_id = ? 
        AND prestamos.fecha_devolucion IS NOT NULL  -- Asegura que el libro ya fue devuelto
        AND libros.disponible = 0  -- Solo libros que están disponibles
        ORDER BY prestamos.fecha_prestamo DESC;
        `,
      [usuario_id]
    );

    // 🔹 Agregar URL completa a la imagen y estado de préstamo
    prestamos = prestamos.map((libro) => ({
      ...libro,
      imagen_url: libro.imagen_url ? `${URL}${libro.imagen_url}` : null,
    }));
    res.json(prestamos);
    // console.log(prestamos);
  } catch (error) {
    console.error("❌ Error al obtener libros prestados:", error);
    res.status(500).json({ mensaje: "Error al obtener libros prestados" });
  }
});

module.exports = router;
