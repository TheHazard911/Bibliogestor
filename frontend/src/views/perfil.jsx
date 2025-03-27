import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authstore";

function Perfil() {
  const { user, setUser } = useAuthStore(); // ✅ Ahora setUser existe
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/perfil/${user.id}`);
        if (!response.ok) throw new Error("Error al obtener datos del perfil");

        const data = await response.json();
        setUser(data); // ✅ Ya no da error
        // console.log(data)
      } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchUserData();
  }, [user?.id]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>No hay datos de usuario</p>;

  return (
    <div className="views view-profile">
      <h2>Perfil</h2>
      <div className="content-perfil">
        <div className="row-profile">
          <p>
            Id: <span>{user.id}</span>
          </p>
          <p>
            Genero: <span>{user.genero}</span>
          </p>
        </div>
        <div className="line"></div>
        <div className="row-profile">
          <p>
            Nombres: <span>{user.nombre}</span>
          </p>
          <p>
            Apellidos: <span>{user.apellidos}</span>
          </p>
        </div>
        <div className="line"></div>
        <div className="row-profile">
          <p>
            Correo: <span>{user.email}</span>
          </p>
          <p>
            Cédula: <span>{user.cedula}</span>
          </p>
        </div>
        <div className="line"></div>
        <div className="row-profile">
          <p>
            Contraseña: <span>********</span>
          </p>{" "}
          {/* Ocultando la contraseña */}
          <p>
            Fecha de Nacimiento: <span>{user.fecha_nacimiento}</span>
          </p>
        </div>
        <div className="line"></div>
        <div className="row-profile">
          <p>
            Pregunta de Seguridad: <span>{user.pregunta_seguridad}</span>
          </p>
          <p>
            Respuesta de Seguridad: <span>*****</span>
          </p>{" "}
          {/* Ocultar respuesta */}
        </div>
        <div className="line"></div>
      </div>

      <br />
      <h2>Información de Libros</h2>
      <div className="content-perfil">
        <div className="row-profile">
          <p>
            Libros Prestados: <span>{user.librosPrestados || 0}</span>
          </p>
          <p>
            Libros Leídos: <span>{user.librosLeidos || 0}</span>
          </p>
        </div>
        <div className="line"></div>
        <div className="row-profile">
          <p>
            Sanciones: <span>{user.sanciones}</span>
          </p>
          <p>
            Edad: <span>{calcularEdad(user.fecha_nacimiento)}</span>
          </p>
        </div>
        <br />
        <br />
        {/* <div className="btn btn-color">Eliminar cuenta</div>
        <div className="btn btn-color">Editar Datos</div> */}
        <br />
        <br />
      </div>
    </div>
  );
}

// Función para calcular la edad
const calcularEdad = (fecha) => {
  if (!fecha) return "Desconocido";
  const nacimiento = new Date(fecha);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  if (
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() &&
      hoy.getDate() < nacimiento.getDate())
  ) {
    edad--;
  }
  return edad;
};

export default Perfil;
