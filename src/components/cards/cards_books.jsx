import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Cards_books({ book }) {
  return (
    <div className="cards-books">
      <img src={book.imagen} alt={book.titulo} />
      <p>
        {book.titulo}
      </p>
      <Link to={`/nav/catalogo/book/${book.id}`}>Ver detalles</Link>
    </div>
  );
}

// Validación de las props
Cards_books.propTypes = {
  book: PropTypes.shape({
    imagen: PropTypes.string.isRequired, // Asegura que 'imagen' sea una cadena y obligatoria
    titulo: PropTypes.string.isRequired, // Asegura que 'titulo' sea una cadena y obligatoria
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired // Puede ser cadena o número, y es obligatorio
  }).isRequired
};

export default Cards_books;
