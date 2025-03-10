import { useParams } from "react-router-dom";
import { useState } from "react";
import LibrosSimulados from "../data/json/librosimulados";
import DeleteBookModal from "../components/modals/delete_book";
import LeedBookModal from "../components/modals/leed_book";
import useAuthStore from "../store/authstore"

function Books_information() {
  const { id } = useParams();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isLeedOpen, setLeedOpen] = useState(false);
  const {isAdmin} = useAuthStore(); // Obtenemos el estado de Zustand

  

  // Encuentra el libro por su ID
  const libro = LibrosSimulados.find(libro => libro.id === parseInt(id, 10));

  // Muestra un mensaje si el libro no se encuentra
  if (!libro) {
    return <p>Libro no encontrado.</p>;
  }

  const handleDelete = () => {
    console.log(`Libro "${libro.titulo}" eliminado.`);
    // Aquí puedes agregar la lógica para eliminar el libro, como una llamada a la API
    setDeleteOpen(false); // Cierra la modal después de confirmar
  };

  const LeedBook = () => {
    console.log(`El libro "${libro.titulo}" ha sido tomado prestado.`);
    // Aquí puedes agregar lógica para actualizar el estado del libro o registrar la acción en el backend
    setLeedOpen(false);
  };

  return (
    <div className="books-information-container">
      <h2>Información del libro</h2>
      <div className="books-information">
        <section className="book-image">
          <img src={libro.imagen} alt={`Imagen de ${libro.titulo}`} />
        </section>
        <section className="book-actions-content">
          <article className="row row-one">
            <p>
              Titulo: <span>{libro.titulo || "No disponible "}.</span>
            </p>
            <p>
              Estado: <span>{libro.estado || "No disponible "}.</span>
            </p>
          </article>
          <article className="row row-two">
            <p>
              Género: <span>{libro.genero || "No disponible "}.</span>
            </p>
            <p>
              Autor: <span>{libro.autor || "No disponible "}.</span>
            </p>
          </article>
          <article className="row row-three">
            <p>
              Categoria: <span>{libro.categoria || "No disponible "}.</span>
            </p>
            <p>
              ID: <span>{libro.id || "No disponible "}.</span>
            </p>
          </article>
          <article className="row row-four">
            <p>
              Descripcion: <span>{libro.descripcion || "No disponible "}.</span>
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
            <button className="btn btn-color" onClick={() => setLeedOpen(true)}>
              Tomar Prestado
            </button>
          </article>
        </section>
      </div>
      {/* Modal para eliminar */}
      <DeleteBookModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        bookTitle={libro.titulo}
      />
      {/* Modal para tomar prestado */}
      <LeedBookModal
        isOpen={isLeedOpen}
        onClose={() => setLeedOpen(false)}
        onConfirm={LeedBook}
        bookTitle={libro.titulo}
      />
    </div>
  );
}

export default Books_information;
