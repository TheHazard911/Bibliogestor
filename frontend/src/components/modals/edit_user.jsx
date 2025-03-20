import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../assets/imgs/Logo_BiblioGestor.png";

function EditUserModal({ isOpen, onClose, user }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            // Set form values when the user object changes
            setValue("id", user.id || "");
            setValue("nombres", user.nombres || "");
            setValue("apellidos", user.apellidos || "");
            setValue("cedula", user.cedula || "");
            setValue("genero", user.genero || "");
            setValue("correo", user.correo || "");
            setValue("fechaNacimiento", user.fechaNacimiento || "");
            setValue("librosPrestados", user.librosPrestados || "");
            setValue("password", user.password || "");
            setValue("pregunta_seguridad", user.pregunta_seguridad || "");
            setValue("respuesta_seguridad", user.respuesta_seguridad || "");
        }
    }, [user, setValue]);

    const onSubmit = (data) => {
        console.log("Usuario actualizado:", data);
        onClose();
    };

    return (
        <div className={`modal fade ${isOpen ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose} />
                        <img className="modal-image" src={Logo} alt="Logo" />
                        <h5 className="modal-title">Editar Usuario</h5>
                    </div>
                    <div className="modal-body-edit-user">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <section className="container-form-edit-user">
                                <div className="mb-3">
                                    <label className="form-label">Nombres:</label>
                                    <input type="text" className="form-control" {...register("nombres", { required: "Este campo es obligatorio" })} />
                                    {errors.nombres && <p className="error">{errors.nombres.message}</p>}
                                    <br />
                                    
                                    <label className="form-label">Apellidos:</label>
                                    <input type="text" className="form-control" {...register("apellidos", { required: "Este campo es obligatorio" })} />
                                    {errors.apellidos && <p className="error">{errors.apellidos.message}</p>}
                                    <br />
                                    
                                    <label className="form-label">Fecha de Nacimiento:</label>
                                    <input type="date" className="form-control" {...register("fechaNacimiento", { required: "Este campo es obligatorio" })} />
                                    {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento.message}</p>}
                                    <br />
                                    
                                    <label className="form-label">Cédula:</label>
                                    <input type="text" className="form-control" {...register("cedula", { required: "Este campo es obligatorio" })} />
                                    {errors.cedula && <p className="error">{errors.cedula.message}</p>}
                                    <br />
                                    
                                    <label className="form-label">Género:</label>
                                    <select className="form-control" {...register("genero", { required: "Este campo es obligatorio" })}>
                                        <option value="">Seleccione...</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    {errors.genero && <p className="error">{errors.genero.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Correo:</label>
                                    <input type="email" className="form-control" {...register("correo", { required: "Este campo es obligatorio" })} />
                                    {errors.correo && <p className="error">{errors.correo.message}</p>}
                                    <br />
                                    
                                    <label className="form-label">Contraseña:</label>
                                    <input type="password" className="form-control" {...register("password")} />
                                    <br />
                                    
                                    <label className="form-label">Pregunta de Seguridad:</label>
                                    <input type="text" className="form-control" {...register("pregunta_seguridad")} />
                                    <br />
                                    
                                    <label className="form-label">Respuesta:</label>
                                    <input type="text" className="form-control" {...register("respuesta_seguridad")} />
                                    <br />
                                    
                                    <label className="form-label">ID:</label>
                                    <input disabled type="number" className="form-control" {...register("id")} />
                                </div>
                            </section>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-color">Guardar Cambios</button>
                                <button type="button" className="btn btn-color" onClick={onClose}>Cancelar</button>
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
    user: PropTypes.object
};

export default EditUserModal;
