import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import DeleteBookModal from "../components/modals/delete_book";
import LeedBookModal from "../components/modals/leed_book";
import useAuthStore from "../store/authstore";
// import {isAdmin} from "../store/authstore";

function Books_information() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isLeedOpen, setLeedOpen] = useState(false);
  const { user, isAdmin } = useAuthStore(); // Obtiene el usuario actual
  const [esMiPrestamo, setEsMiPrestamo] = useState(false);
  const [mensajeDevolucion, setMensajeDevolucion] = useState("");

  // 📌 Obtener los detalles del libro desde la API
  // useEffect(() => {}, [id, user?.id]);

  // 🔄 Definir fetchLibro con useCallback
  const fetchLibro = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/libros/${id}`);
      if (!response.ok) throw new Error("Libro no encontrado");

      const data = await response.json();
      setLibro(data);

      // ✅ Verificar si el usuario actual tiene prestado el libro
      if (data.usuario_prestamo_id === user.id && data.disponible != 1) {
        setEsMiPrestamo(true);
      } else {
        setEsMiPrestamo(false);
      }

      // console.log("Disponible (antes de conversión):", data.disponible);
      // console.log("Fecha devolución (cruda):", data.fecha_devolucion);

      if (
        data.fecha_devolucion &&
        !isNaN(new Date(data.fecha_devolucion)) &&
        Number(data.disponible) !== 1
      ) {
        const fechaDevolucion = new Date(data.fecha_devolucion + "T00:00:00");
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Normalizar fecha actual

        const diasRestantes = Math.ceil(
          (fechaDevolucion - hoy) / (1000 * 60 * 60 * 24)
        );

        // console.log("Fecha de devolución:", fechaDevolucion);
        // console.log("Fecha actual:", hoy);
        // console.log("Días restantes:", diasRestantes);

        if (diasRestantes <= 7 && diasRestantes > 0) {
          setMensajeDevolucion(
            "⚠️ La fecha de devolución está próxima: " + data.fecha_devolucion
          );
        } else if (diasRestantes <= 0) {
          setMensajeDevolucion(
            "⏳ ¡El plazo de devolución ha vencido! Se ha aplicado una sanción."
          );
          aplicarSancion(user.id, data.id);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id, user?.id]); // Dependencias

  // Ejecutar fetchLibro al cargar el componente
  useEffect(() => {
    fetchLibro();
  }, [fetchLibro]);

  // 📌 Función para tomar prestado el libro
  const tomarPrestado = async () => {
    // console.log(libro.fecha_devolucion)
    try {
      const response = await fetch("http://localhost:5000/prestamos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: user.id,
          libro_id: libro.id,
          fecha_prestamo: new Date().toISOString().split("T")[0], // Fecha actual
          fecha_devolucion: libro.fecha_devolucion,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al tomar el libro prestado");
      }

      alert("📚 Has tomado prestado el libro.");
      setLeedOpen(false); // Cierra el modal
      fetchLibro(); // 🔄 Actualiza los datos sin recargar la página
    } catch (error) {
      console.error("❌ Error al tomar prestado el libro:", error);
      alert("Hubo un problema al tomar el libro prestado.");
    }
  };

  // 📌 Función para devolver el libro
  const devolverLibro = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/devolver/${libro.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: user.id,
            // motivo: "Retraso en devolución",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al devolver el libro");
      }

      alert("📚 El libro ha sido devuelto exitosamente.");
      window.location.reload(); // Recargar la página para actualizar el estado
    } catch (error) {
      console.error("❌ Error al devolver el libro:", error);
      alert("Hubo un problema al devolver el libro.");
    }
  };

  // 📌 Aplicar sanción al usuario
  const aplicarSancion = async (usuarioId, libroId) => {
    // console.log(usuarioId)
    // console.log(libroId)
    let motivo = "Retraso En La Devolucion Del Libro";
    try {
      const response = await fetch("http://localhost:5000/sanciones", {
        method: "POST",
        body: JSON.stringify({ usuarioId, libroId, motivo }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje);

      console.log("✅ Sanción aplicada:", data.mensaje);
    } catch (error) {
      console.error("❌ Error al aplicar sanción:", error.message);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!libro) return <p>Libro no encontrado.</p>;

  return (
    <div className="books-information-container">
      <h2>Información del libro</h2>
      <div className="books-information">
        <section className="book-image">
          <img
            src={`http://localhost:5000${libro.imagen_url}`}
            alt={`Imagen de ${libro.titulo}`}
          />
        </section>
        <section className="book-actions-content">
          <article className="row row-one">
            <p>
              Titulo: <span>{libro.titulo || "No disponible"}.</span>
            </p>
            <p>
              Estado:{" "}
              <span>
                {libro.disponible == 1 ? "Disponible" : "No Disponible"}.
              </span>
            </p>
          </article>

          {/* 📌 Mensajes de advertencia */}
          {mensajeDevolucion && (
            <p className="text-warning">{mensajeDevolucion}</p>
          )}

          <article className="row row-two">
            <p>
              Género: <span>{libro.generos || "No disponible"}.</span>
            </p>
            <p>
              Autor: <span>{libro.autor || "No disponible"}.</span>
            </p>
          </article>
          <article className="row row-three">
            <p>
              Categoria: <span>{libro.categoria || "No disponible"}.</span>
            </p>
            <p>
              ID: <span>{libro.id || "No disponible"}.</span>
            </p>
          </article>
          <article className="row row-four">
            <p>
              Descripción: <span>{libro.descripcion || "No disponible"}.</span>
            </p>
          </article>
          <article className="row-buttons">
            {isAdmin && (
              <>
                <button className="btn btn-color" id="btn-edit">
                  Editar
                </button>
                <button
                  id="btn-delete"
                  className="btn btn-color"
                  onClick={() => setDeleteOpen(true)}
                >
                  Eliminar
                </button>
              </>
            )}
            <button className="btn btn-color">Exportar</button>
            {esMiPrestamo ? (
              <button className="btn btn-color" onClick={devolverLibro}>
                Devolver Libro
              </button>
            ) : (
              <button
                className="btn btn-color"
                onClick={() => setLeedOpen(true)}
                disabled={libro.disponible == 0}
              >
                Tomar Prestado
              </button>
            )}
          </article>
        </section>
      </div>
      {/* Modal para eliminar */}
      <DeleteBookModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => console.log("Eliminar libro")}
        bookTitle={libro.titulo}
      />
      {/* Modal para tomar prestado */}
      <LeedBookModal
        isOpen={isLeedOpen}
        onClose={() => setLeedOpen(false)}
        onConfirm={tomarPrestado} // Llama a tomarPrestado()
        bookTitle={libro.titulo}
        bookId={libro.id}
      />
    </div>
  );
}

export default Books_information;

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import DeleteBookModal from "../components/modals/delete_book";
// import LeedBookModal from "../components/modals/leed_book";
// import useAuthStore from "../store/authstore";

// function Books_information() {
//   const { id } = useParams();
//   const [libro, setLibro] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDeleteOpen, setDeleteOpen] = useState(false);
//   const [isLeedOpen, setLeedOpen] = useState(false);
//   const { isAdmin } = useAuthStore(); // Estado de autenticación

//   // 📌 Obtener los detalles del libro desde la API
//   useEffect(() => {
//     const fetchLibro = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/libros/${id}`);
//         if (!response.ok) throw new Error("Libro no encontrado");
//         const data = await response.json();
//         setLibro(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLibro();
//   }, [id]);

//   if (isLoading) return <p>Cargando...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!libro) return <p>Libro no encontrado.</p>;

//   const handleDelete = () => {
//     console.log(`Libro "${libro.titulo}" eliminado.`);
//     setDeleteOpen(false);
//   };

//   const LeedBook = () => {
//     console.log(`El libro "${libro.titulo}" ha sido tomado prestado.`);
//     setLeedOpen(false);
//   };

//   return (
//     <div className="books-information-container">
//       <h2>Información del libro</h2>
//       <div className="books-information">
//         <section className="book-image">
//           <img
//             src={`http://localhost:5000${libro.imagen_url}`}
//             alt={`Imagen de ${libro.titulo}`}
//           />
//         </section>
//         <section className="book-actions-content">
//           <article className="row row-one">
//             <p>
//               Titulo: <span>{libro.titulo || "No disponible"}.</span>
//             </p>
//             <p>
//               Estado:{" "}
//               <span>
//                 {libro.disponible == 1 ? "Disponible" : "No Disponible"}.
//               </span>
//             </p>
//           </article>

//           {/* 📌 Mensaje si el libro está prestado */}
//           {libro.disponible == 0 && (
//             <p className="text-warning">
//               ⚠️ Este libro está actualmente prestado y no puede ser tomado.
//             </p>
//           )}

//           <article className="row row-two">
//             <p>
//               Género: <span>{libro.genero || "No disponible"}.</span>
//             </p>
//             <p>
//               Autor: <span>{libro.autor || "No disponible"}.</span>
//             </p>
//           </article>
//           <article className="row row-three">
//             <p>
//               Categoria: <span>{libro.categoria || "No disponible"}.</span>
//             </p>
//             <p>
//               ID: <span>{libro.id || "No disponible"}.</span>
//             </p>
//           </article>
//           <article className="row row-four">
//             <p>
//               Descripción: <span>{libro.descripcion || "No disponible"}.</span>
//             </p>
//           </article>
//           <article className="row-buttons">
//             {isAdmin && (
//               <>
//                 <button className="btn btn-color" id="btn-edit">
//                   Editar
//                 </button>
//                 <button
//                   id="btn-delete"
//                   className="btn btn-color"
//                   onClick={() => setDeleteOpen(true)}
//                 >
//                   Eliminar
//                 </button>
//               </>
//             )}
//             <button className="btn btn-color">Exportar</button>
//             <button
//               className="btn btn-color"
//               onClick={() => setLeedOpen(true)}
//               disabled={libro.disponible == 0} // 🔹 Deshabilita el botón si el libro no está disponible
//             >
//               Tomar Prestado
//             </button>
//           </article>
//         </section>
//       </div>
//       {/* Modal para eliminar */}
//       <DeleteBookModal
//         isOpen={isDeleteOpen}
//         onClose={() => setDeleteOpen(false)}
//         onConfirm={handleDelete}
//         bookTitle={libro.titulo}
//       />
//       {/* Modal para tomar prestado */}
//       <LeedBookModal
//         isOpen={isLeedOpen}
//         onClose={() => setLeedOpen(false)}
//         onConfirm={LeedBook}
//         bookTitle={libro.titulo}
//         bookId={libro.id} // 🔹 Pasa el `id` correctamente
//       />
//     </div>
//   );
// }

// export default Books_information;
