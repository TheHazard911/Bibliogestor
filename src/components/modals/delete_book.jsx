import PropTypes from "prop-types";
import Logo from "../../assets/imgs/Logo_BiblioGestor.png";

function DeleteBookModal({ isOpen, onClose, onConfirm, bookTitle }) {
  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Cerrar"
              onClick={onClose}
            />
            <img className="modal-image" src={Logo} alt="Logo" />
            <h5 className="modal-title">Eliminar Libro</h5>
          </div>
          <div className="modal-body">
            <p>
              ¿Estás seguro de que deseas eliminar el libro {bookTitle}?
            </p>
            <form className="form-leed-book">
              <div className="position-form-books-leed">
                <label className="form-label labels-form-book">
                  ADMIN KEY:
                </label>
                <input
                  placeholder="ADMIN KEY"
                  type="password"
                  className="form-control inputs-form-book"
                  id=""
                  aria-describedby=""
                />
              </div>
            </form>
            <p>NOTA: La accion no tiene reversion.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-color-small"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Sí, Eliminar
            </button>
            <button
              type="button"
              className="btn btn-color-small"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Validación de props con PropTypes
DeleteBookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  bookTitle: PropTypes.string.isRequired
};

export default DeleteBookModal;
