import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Logo from "../../assets/imgs/Logo_BiblioGestor.png";

function EditUserModal({ isOpen, onClose, user }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setValue("id", user.id || "");
      setValue("nombres", user.nombre || "");
      setValue("apellidos", user.apellidos || "");
      setValue("cedula", user.cedula || "");
      setValue("genero", user.genero || "");
      setValue("correo", user.email || "");
      setValue("fechaNacimiento", user.fecha_nacimiento || "");
      setValue("password", user.contrasena || "");
      setValue("pregunta_seguridad", user.pregunta_seguridad || "");
      setValue("respuesta_seguridad", user.respuesta_seguridad || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/editar_usuario/${data.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Error al actualizar usuario");

      alert("✅ Usuario actualizado exitosamente");
      onClose();

      window.location.reload(); // Recarga toda la página
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
              aria-label="Cerrar"
              onClick={onClose}
            />
            <img className="modal-image" src={Logo} alt="Logo" />
            <h5 className="modal-title">Editar Usuario</h5>
          </div>
          <div className="modal-body-edit-user">
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="container-form-edit-user">
                <div className="mb-3">
                  <label className="form-label">Nombres:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("nombres", {
                      required: "Este campo es obligatorio",
                    })}
                    defaultValue={user?.nombres} // Muestra el valor actual del campo
                  />
                  {errors.nombres && (
                    <p className="error">{errors.nombres.message}</p>
                  )}
                  <br />

                  <label className="form-label">Apellidos:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("apellidos", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.apellidos && (
                    <p className="error">{errors.apellidos.message}</p>
                  )}
                  <br />

                  <label className="form-label">Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("fechaNacimiento", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.fechaNacimiento && (
                    <p className="error">{errors.fechaNacimiento.message}</p>
                  )}
                  <br />

                  <label className="form-label">Cédula:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("cedula", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.cedula && (
                    <p className="error">{errors.cedula.message}</p>
                  )}
                  <br />

                  <label className="form-label">Género:</label>
                  <select
                    className="form-control"
                    {...register("genero", {
                      required: "Este campo es obligatorio",
                    })}
                  >
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {errors.genero && (
                    <p className="error">{errors.genero.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo:</label>
                  <input
                    type="email"
                    className="form-control"
                    {...register("correo", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.correo && (
                    <p className="error">{errors.correo.message}</p>
                  )}
                  <br />

                  <label className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    disabled
                    {...register("password")}
                  />
                  <br />

                  <label className="form-label">Pregunta de Seguridad:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("pregunta_seguridad")}
                  />
                  <br />

                  <label className="form-label">Respuesta:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("respuesta_seguridad")}
                  />
                  <br />

                  <label className="form-label">ID:</label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    {...register("id")}
                  />
                </div>
              </section>
              <div className="modal-footer">
                <button type="submit" className="btn btn-color">
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="btn btn-color"
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

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default EditUserModal;
