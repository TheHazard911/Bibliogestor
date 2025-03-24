import PropTypes from "prop-types";

function Cards_books_simple({ book }) {
  return (
    <div className="cards-books">
      <div className="book-image-container">
        <img src={`http://localhost:5000${book.imagen_url}`} alt={book.titulo} />
      </div>
      <p>{book.titulo}</p>
    </div>
  );
}

// Validación de las props
Cards_books_simple.propTypes = {
  book: PropTypes.shape({
    imagen_url: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards_books_simple;
