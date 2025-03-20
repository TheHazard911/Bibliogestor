const express = require("express");
const cors = require("cors"); // 👈 Importar cors
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { dbRun, dbAll, dbGet } = require("./db");
require("dotenv").config();

const app = express();

// 🔹 Habilita CORS para permitir acceso a la imagen
app.use(
  cors({
    origin: "*", // Permite cualquier origen (ajústalo si es necesario)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// 📌 Servir la carpeta 'uploads' de manera estática
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET no está definido en .env");
  process.exit(1);
}

// ✅ Registro de usuario (POST)
app.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      securityQuestion,
      securityAnswer,
      gender,
      cedula,
    } = req.body;

    // Validar si el email ya existe
    const existeUsuario = await dbGet(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (existeUsuario) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario en la base de datos
    await dbRun(
      `INSERT INTO usuarios 
      (nombre, apellidos, email, contrasena, fecha_nacimiento, pregunta_seguridad, respuesta_seguridad, genero, cedula) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        hashedPassword,
        birthDate,
        securityQuestion,
        securityAnswer,
        gender,
        cedula,
      ]
    );

    res.status(201).json({ mensaje: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("❌ Error al registrar el usuario:", error);
    res.status(500).json({ mensaje: "Error al registrar el usuario" });
  }
});

// ✅ Login de usuario (POST)
app.post("/login", async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    // Buscar usuario por email
    const usuario = await dbGet("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Generar Token JWT
    const token = jwt.sign({ id: usuario.id, email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ mensaje: "Login exitoso", token, usuario });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Obtener totales
app.get("/totales", async (req, res) => {
  try {
    const libros = await dbGet("SELECT COUNT(*) AS count FROM libros");
    const usuarios = await dbGet("SELECT COUNT(*) AS count FROM usuarios");
    const admins = await dbGet(
      "SELECT COUNT(*) AS count FROM usuarios WHERE email = ?",
      ["admin123@gmail.com"]
    );

    res.json({
      totalLibros: libros.count,
      totalUsuarios: usuarios.count,
      totalAdmins: admins.count,
    });
  } catch (error) {
    console.error("❌ Error al obtener los totales:", error);
    res.status(500).json({ mensaje: "Error al obtener los totales" });
  }
});

// ✅ Verificar email
app.post("/verificar-email", async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await dbGet(
      "SELECT pregunta_seguridad FROM usuarios WHERE email = ?",
      [email]
    );
    if (!usuario) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }
    res.json({ preguntaSeguridad: usuario.pregunta_seguridad });
  } catch (error) {
    console.error("❌ Error al verificar email:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// ✅ Cambiar contraseña
app.post("/cambiar-contrasena", async (req, res) => {
  try {
    const { email, respuestaSeguridad, nuevaContrasena } = req.body;
    const usuario = await dbGet(
      "SELECT respuesta_seguridad FROM usuarios WHERE email = ?",
      [email]
    );
    if (!usuario) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }
    if (usuario.respuesta_seguridad !== respuestaSeguridad) {
      return res
        .status(401)
        .json({ mensaje: "Respuesta de seguridad incorrecta" });
    }
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    await dbRun("UPDATE usuarios SET contrasena = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);
    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error al cambiar la contraseña:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Obtener géneros
app.get("/generos", async (req, res) => {
  try {
    const generos = await dbAll("SELECT * FROM generos ORDER BY id");
    res.json(generos);
  } catch (error) {
    console.error("❌ Error al obtener los géneros:", error);
    res.status(500).json({ mensaje: "Error al obtener los géneros" });
  }
});

// 📌 Importar rutas
const librosRoutes = require("./routes/libros");
const autoresRoutes = require("./routes/autores");
const prestamosRoutes = require("./routes/prestamos");

// 📌 Usar las rutas importadas
app.use("/libros", librosRoutes);
app.use("/autores", autoresRoutes);
app.use("/prestamos", prestamosRoutes);

app.post("/sanciones", async (req, res) => {
  try {
    const { usuarioId, libroId, motivo } = req.body;

    if (!usuarioId || !libroId || !motivo) {
      return res
        .status(400)
        .json({ mensaje: "Faltan datos (usuario_id, libro_id o motivo)." });
    }

    // 🔹 Verificar si el préstamo aún no ha sido devuelto
    const prestamo = await dbGet(
      `SELECT * FROM prestamos 
       WHERE usuario_id = ? 
       AND libro_id = ? 
       AND devuelto = FALSE`,
      [usuarioId, libroId]
    );

    if (!prestamo) {
      return res.status(400).json({
        mensaje: "No se puede aplicar sanción: el libro ya fue devuelto.",
      });
    }

    // 🔍 **Verificar si ya existe una sanción activa para este usuario y libro**
    const sancionExistente = await dbGet(
      `SELECT * FROM sanciones 
       WHERE usuario_id = ? 
       AND libro_id = ? 
       AND fecha = CURRENT_DATE`, // ⏳ Evita sanciones repetidas en el mismo día
      [usuarioId, libroId]
    );

    if (sancionExistente) {
      console.warn("⚠️ Ya se aplicó una sanción hoy por este préstamo.");
      return res.status(400).json({
        mensaje: "⚠️ Ya se aplicó una sanción hoy por este préstamo.",
      });
    }

    // ✅ Registrar la sanción en la base de datos
    await dbRun(
      `INSERT INTO sanciones (usuario_id, libro_id, fecha, motivo) 
       VALUES (?, ?, CURRENT_DATE, ?)`,
      [usuarioId, libroId, motivo]
    );

    // ✅ Incrementar el número de sanciones del usuario
    await dbRun(
      `UPDATE usuarios 
       SET sanciones = sanciones + 1 
       WHERE id = ?`,
      [usuarioId]
    );

    res.json({ mensaje: "🚨 Sanción aplicada correctamente." });
  } catch (error) {
    console.error("❌ Error al aplicar sanción:", error);
    res.status(500).json({ mensaje: "Error al aplicar sanción." });
  }
});

app.post("/devolver/:id", async (req, res) => {
  try {
    const libroId = req.params.id;
    const { usuario_id } = req.body; // Se obtiene el usuario desde la solicitud

    // console.log(libroId, usuario_id)

    if (!libroId || !usuario_id) {
      return res
        .status(400)
        .json({ mensaje: "Se requiere el ID del libro y el usuario." });
    }

    // 🔹 Verificar si el libro existe
    const libro = await dbGet(`SELECT * FROM libros WHERE id = ?`, [libroId]);
    if (!libro) {
      return res.status(404).json({ mensaje: "El libro no existe." });
    }

    // console.log(libro)

    // 🔹 Verificar si el usuario tiene este libro prestado actualmente
    const prestamo = await dbGet(
      `SELECT * FROM prestamos 
       WHERE libro_id = ? 
       AND usuario_id = ?  
       AND devuelto = FALSE`,
      [libroId, usuario_id]
    );

    // console.log(prestamo)

    if (!prestamo) {
      return res.status(400).json({
        mensaje: "No tienes este libro prestado o ya ha sido devuelto.",
      });
    }

    // 🔹 Marcar el préstamo como devuelto
    await dbRun(
      `UPDATE prestamos 
       SET fecha_devolucion = DATE('now'), devuelto = TRUE 
       WHERE libro_id = ? AND usuario_id = ?`,
      [libroId, usuario_id]
    );

    // 🔹 Hacer que el libro vuelva a estar disponible
    await dbRun(`UPDATE libros SET disponible = 1 WHERE id = ?`, [libroId]);

    res.json({ mensaje: "📚 Libro devuelto exitosamente" });
  } catch (error) {
    console.error("❌ Error al devolver libro:", error);
    res
      .status(500)
      .json({ mensaje: "Error al procesar la devolución del libro." });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await dbAll("SELECT * FROM usuarios ORDER BY id ASC"); // ⬅ Cambia dbGet por dbAll
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});

app.get("/perfil/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Consulta principal del usuario
    const userResult = await dbGet("SELECT * FROM usuarios WHERE id = ?", [
      userId,
    ]);

    if (!userResult) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Contar libros prestados
    const prestamosResult = await dbGet(
      "SELECT COUNT(*) as librosPrestados FROM prestamos WHERE usuario_id = ?",
      [userId]
    );

    // Contar libros leídos (puedes definir una condición, como si han sido devueltos)
    const librosLeidosResult = await dbGet(
      "SELECT COUNT(*) as librosLeidos FROM lecturas WHERE usuario_id = ?",
      [userId]
    );

    // Agregar datos a la respuesta
    const userData = {
      ...userResult,
      librosPrestados: prestamosResult.librosPrestados || 0,
      librosLeidos: librosLeidosResult.librosLeidos || 0,
    };

    res.json(userData);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error al obtener perfil" });
  }
});

app.put("/libros/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, autor_id, descripcion, categoria, disponible, imagen_url } =
    req.body;

  try {
    await db.run(
      `UPDATE libros SET titulo = ?, autor_id = ?, descripcion = ?, categoria = ?, disponible = ?, imagen_url = ?
       WHERE id = ?`,
      [titulo, autor_id, descripcion, categoria, disponible, imagen_url, id]
    );

    res.json({ mensaje: "Libro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar libro:", error);
    res.status(500).json({ mensaje: "Error al actualizar libro" });
  }
});

// ✅ Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
