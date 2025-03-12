import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Logo from "../../assets/imgs/Logo_BiblioGestor.png";

function LeedBookModal({ isOpen, onClose, onConfirm, bookTitle }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Puedes hacer algo con los datos del formulario aquí
    console.log(data);
    onConfirm();
    onClose();
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
            <form className="form-leed-book" onSubmit={handleSubmit(onSubmit)}>
              <div className="position-form-books-leed">
                <label className="form-label labels-form-book">Prestamo:</label>
                <input
                  placeholder="Fecha Prestamo"
                  type="date"
                  className="form-control inputs-form-book"
                  {...register("loanDate", { required: "La fecha de préstamo es obligatoria" })}
                />
                {errors.loanDate && <p className="error">{errors.loanDate.message}</p>}
              </div>
              <div className="position-form-books-leed">
                <label className="form-label labels-form-book">Devolucion:</label>
                <input
                  placeholder="Fecha Devolucion"
                  type="date"
                  className="form-control inputs-form-book"
                  {...register("returnDate", { required: "La fecha de devolución es obligatoria" })}
                />
                {errors.returnDate && <p className="error">{errors.returnDate.message}</p>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-color-small"
              onClick={handleSubmit(onSubmit)}
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
