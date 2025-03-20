import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Cards_books({ book, enEstanteriaPersonal = false }) {
  return (
    <div className="cards-books">
      <div className="book-image-container">
        {/* ✅ Si el libro está prestado pero NO es de la estantería personal, mostrar el overlay */}
        {!enEstanteriaPersonal && book.estado === "Prestado" && (
          <div className="overlay-prestado">
            <p>📕 Prestado</p>
          </div>
        )}
        <img src={book.imagen_url} alt={book.titulo} />
      </div>

      <p>{book.titulo}</p>

      {/* ✅ Si está en la estantería personal, no mostrar "No disponible" */}
      {!enEstanteriaPersonal && book.estado === "Prestado" ? (
        <span className="disabled-link">No disponible</span>
      ) : (
        <Link to={`/nav/catalogo/book/${book.id}`}>Ver detalles</Link>
      )}
    </div>
  );
}

// Validación de las props
Cards_books.propTypes = {
  book: PropTypes.shape({
    imagen_url: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    estado: PropTypes.string,
  }).isRequired,
  enEstanteriaPersonal: PropTypes.bool, // ✅ Nueva prop
};

export default Cards_books;

// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// function Cards_books({ book }) {
//   return (
//     <div className="cards-books">
//       <div className="book-image-container">
//         {/* 🔹 Mostrar etiqueta si el libro está prestado */}
//         {!book.disponible && (
//           <div className="overlay-prestado">
//             <p>📕 Prestado</p>
//           </div>
//         )}
//         <img src={book.imagen_url} alt={book.titulo} />
//       </div>
//       <p>{book.titulo}</p>

//       {/* 🔹 Deshabilitar el botón si el libro no está disponible */}
//       {book.disponible ? (
//         <Link to={`/nav/catalogo/book/${book.id}`}>Ver detalles</Link>
//       ) : (
//         <span className="disabled-link">No disponible</span>
//       )}
//     </div>
//   );
// }

// // Validación de las props
// Cards_books.propTypes = {
//   book: PropTypes.shape({
//     imagen_url: PropTypes.string.isRequired, // ✅ Asegurar que 'imagen_url' sea obligatoria
//     titulo: PropTypes.string.isRequired, // ✅ 'titulo' debe ser una cadena obligatoria
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ✅ Puede ser string o número
//     disponible: PropTypes.bool.isRequired, // ✅ Indica si el libro está disponible o prestado
//   }).isRequired,
// };

// export default Cards_books;
