import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Logo from "../../assets/imgs/Logo_BiblioGestor.png";
import useAuthStore from "../../store/authstore"; // ✅ Importar el store de autenticación

function LeedBookModal({ isOpen, onClose, onConfirm, bookTitle, bookId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuthStore(); // ✅ Obtener el usuario autenticado

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
            <h5 className="modal-title">Préstamo del libro</h5>
            <p>
              Estás tomando prestado: <strong>{bookTitle}</strong>
            </p>
          </div>
          <div className="modal-body">
            <h5 className="modal-title">Fecha de Devolución Estimada</h5>
            <form className="form-leed-book" onSubmit={handleSubmit(onConfirm)}>
              <div className="position-form-books-leed">
                <label className="form-label">Fecha de Préstamo:</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("loanDate", {
                    required: "La fecha de préstamo es obligatoria",
                  })}
                />
                {errors.loanDate && (
                  <p className="error">{errors.loanDate.message}</p>
                )}
              </div>
              <div className="position-form-books-leed">
                <label className="form-label">Fecha de Devolución:</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("returnDate", {
                    required: "La fecha de devolución es obligatoria",
                  })}
                />
                {errors.returnDate && (
                  <p className="error">{errors.returnDate.message}</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-color-small">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Agrega `bookId` a las props
LeedBookModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  bookTitle: PropTypes.string.isRequired,
  bookId: PropTypes.number.isRequired, // 🔹 Asegurar que bookId es obligatorio
};
export default LeedBookModal;
