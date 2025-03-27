import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../../assets/imgs/Logo_BiblioGestor.png";

const ADMIN_KEY = "ADMIN_DELETE"

function DeleteuserModal({ isOpen, onClose, onConfirm, user }) {
  const [adminKeyInput, setAdminKeyInput] = useState(""); // Estado para la clave ingresada
  const [error, setError] = useState(""); // Estado para errores

  const handleDelete = () => {

    if (adminKeyInput !== ADMIN_KEY) {
      setError("Clave incorrecta. Inténtalo de nuevo.");
      return;
    }

    if (user) {
      onConfirm(); // Llama la función onConfirm pasada como prop
    }
  };

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
            <h5 className="modal-title">Eliminar Usuario</h5>
          </div>
          <div className="modal-body">
            <p>
              ¿Estás seguro de que deseas eliminar el usuario {user?.nombre} {user?.apellidos}?
            </p>
            <form className="form-leed-book">
              <div className="position-form-books-leed">
                <label className="form-label labels-form-book">ADMIN KEY:</label>
                <input
                  placeholder="ADMIN KEY"
                  type="password"
                  className="form-control inputs-form-book"
                  value={adminKeyInput}
                  onChange={(e) => setAdminKeyInput(e.target.value)}
                />
                 {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
              </div>
            </form>
            <p>NOTA: La acción no tiene reversión.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-color-small"
              onClick={handleDelete}
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

DeleteuserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default DeleteuserModal;
