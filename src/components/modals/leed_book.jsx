import PropTypes from "prop-types";
import Logo from "../../assets/imgs/Logo_BiblioGestor.png";

function LeedBookModal({ isOpen, onClose, onConfirm, bookTitle }) {
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
              aria-label="Cerrar"
              onClick={onClose}
            />
            <img className="modal-image" src={Logo} alt="Logo" />
            <h5 className="modal-title">Prestamo del libro</h5>
            <p>
              La toma de libro: {bookTitle} abarca las siguientes condiciones:
            </p>
            <ul>
              <li>No presentar daños del libro</li>
              <li>Fecha de Devolucion</li>
              <li>Fecha de prestamo</li>
            </ul>
          </div>
          <div className="modal-body">
            <h5 className="modal-title">Fecha de Devolucion Estimada</h5>
            <form className="form-leed-book">
              <div className="position-form-books-leed">
                <label className="form-label labels-form-book">Prestamo:</label>
                <input
                  placeholder="Fecha Prestamo"
                  type="date"
                  className="form-control inputs-form-book"
                  id=""
                  aria-describedby=""
                />
              </div>
              <div className="position-form-books-leed">
                <label className="form-label labels-form-book">
                  Devolucion:
                </label>
                <input
                  placeholder="Fecha Devolucion"
                  type="date"
                  className="form-control inputs-form-book"
                  id="exampleInputPassword1"
                />
              </div>
            </form>
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
              Confirmar
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
LeedBookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  bookTitle: PropTypes.string.isRequired
};

export default LeedBookModal;
