import axios from "axios";

const URL_BASE = "http://localhost:5000";
const INICIAR_SESION = "http://localhost:5000/login";
const CREAR_USUARIOS = "http://localhost:5000/register";
const API_URL = "http://localhost:5000/totales";

// Crear Usuarios
export const createUser = async (user) => {
  // console.log("📤 Enviando datos al backend:", user);
  return await axios.post(CREAR_USUARIOS, user);
};

// Validacion del Inicio de Sesion
export const loginUser = async (email, contrasena) => {
  try {
    const response = await axios.post(INICIAR_SESION, { email, contrasena });
    return response.data; // Devuelve el token y la info del usuario
  } catch (error) {
    console.error("❌ Error en el login:", error.response?.data || error.message);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Obtener Datos Para la Pagina de Inicio
export const getTotales = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener los totales:", error);
    return { totalLibros: 0, totalUsuarios: 0, totalAdmins: 0 }; // Valores por defecto en caso de error
  }
};

// Verificar email y obtener pregunta de seguridad
export const verificarEmail = async (email) => {
  try {
    const response = await axios.post(`${URL_BASE}/verificar-email`, { email });
    return response.data;
  } catch (error) {
    console.error("❌ Error al verificar email:", error.response?.data || error.message);
    return null;
  }
};

// Cambiar contraseña
export const cambiarContrasena = async (email, respuestaSeguridad, nuevaContrasena) => {
  try {
    const response = await axios.post(`${URL_BASE}/cambiar-contrasena`, {
      email,
      respuestaSeguridad,
      nuevaContrasena,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al cambiar la contraseña:", error.response?.data || error.message);
    return null;
  }
};

// Obtener Generos
export const getGeneros = async () => {
  try {
    const response = await axios.get(`${URL_BASE}/generos`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener los géneros:", error);
    return [];
  }
};

// 📌 Obtener lista de autores
export const getAutores = async () => {
  try {
    const response = await axios.get(`${URL_BASE}/autores`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener los autores:", error);
    return [];
  }
};

// 📌 Agregar un nuevo autor
export const addAutor = async (nombre) => {
  try {
    const response = await axios.post(`${URL_BASE}/autores`, { nombre });
    return response.data; // Devuelve el autor agregado
  } catch (error) {
    console.error("❌ Error al agregar el autor:", error);
    return null;
  }
};