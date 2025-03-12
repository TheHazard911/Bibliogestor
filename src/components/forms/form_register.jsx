import React from 'react';
import icon_bibliogestor from '../../assets/imgs/Logo_Bibliogestor.png';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Form_register() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data); // Aquí puedes hacer lo que necesites con los datos
        navigate('/'); // Redirige a la ruta /dashboard
    };

    return (
        <div className="form-register">
            <section className='image-form-register'>
                <img src={icon_bibliogestor} alt="Bibliogestor" />
            </section>
            <section className='title-form-register'>
                <h2>Crear Cuenta</h2>
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="position-form-register">
                    <section className='form-register-inputs'>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label labels-form">Ingresar Correo:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder='Correo'
                                className="form-control inputs-form"
                                {...register("email", { required: "El correo es obligatorio", pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, message: "Correo inválido" } })}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                            <br />

                            <label htmlFor="password" className="form-label labels-form">Ingresar Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder='Contraseña'
                                className="form-control inputs-form"
                                {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                            <br />

                            <label htmlFor="repeatPassword" className="form-label labels-form">Repetir Contraseña:</label>
                            <input
                                id="repeatPassword"
                                type="password"
                                placeholder='Repetir'
                                className="form-control inputs-form"
                                {...register("repeatPassword", { required: "Debes repetir la contraseña", validate: value => value === getValues("password") || "Las contraseñas no coinciden" })}
                            />
                            {errors.repeatPassword && <p className="error">{errors.repeatPassword.message}</p>}
                            <br />

                            <label htmlFor="securityQuestion" className="form-label labels-form">Pregunta de Seguridad:</label>
                            <input
                                id="securityQuestion"
                                type="text"
                                placeholder='Pregunta'
                                className="form-control inputs-form"
                                {...register("securityQuestion", { required: "La pregunta es obligatoria" })}
                            />
                            {errors.securityQuestion && <p className="error">{errors.securityQuestion.message}</p>}
                            <br />

                            <label htmlFor="securityAnswer" className="form-label labels-form">Respuesta:</label>
                            <input
                                id="securityAnswer"
                                type="text"
                                placeholder='Respuesta'
                                className="form-control inputs-form"
                                {...register("securityAnswer", { required: "La respuesta es obligatoria" })}
                            />
                            {errors.securityAnswer && <p className="error">{errors.securityAnswer.message}</p>}
                            <br />
                        </div>
                    </section>
                    <section className='form-register-inputs'>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label labels-form">Ingresar Nombres:</label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder='Nombres'
                                className="form-control inputs-form"
                                {...register("firstName", { required: "El nombre es obligatorio" })}
                            />
                            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                            <br />

                            <label htmlFor="lastName" className="form-label labels-form">Ingresar Apellidos:</label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder='Apellidos'
                                className="form-control inputs-form"
                                {...register("lastName", { required: "El apellido es obligatorio" })}
                            />
                            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                            <br />

                            <label htmlFor="birthDate" className="form-label labels-form">Ingresar Fecha Nacimiento:</label>
                            <input
                                id="birthDate"
                                type="date"
                                className="form-control inputs-form"
                                {...register("birthDate", { required: "La fecha de nacimiento es obligatoria" })}
                            />
                            {errors.birthDate && <p className="error">{errors.birthDate.message}</p>}
                            <br />

                            <label htmlFor="gender" className="form-label labels-form">Ingresar Genero:</label>
                            <select
                                id="gender"
                                className="form-select inputs-form"
                                {...register("gender", { required: "El género es obligatorio" })}
                            >
                                <option value="" disabled>Genero</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                            </select>
                            {errors.gender && <p className="error">{errors.gender.message}</p>}
                            <br />

                            <label htmlFor="cedula" className="form-label labels-form">Ingresar Cedula:</label>
                            <input
                                id="cedula"
                                type="number"
                                placeholder='Cedula'
                                className="form-control inputs-form"
                                {...register("cedula", { required: "La cédula es obligatoria" })}
                            />
                            {errors.cedula && <p className="error">{errors.cedula.message}</p>}
                            <br />
                        </div>
                    </section>
                </div>
                <button type="submit" className="btn btn-color">Registrar</button>
            </form>
        </div>
    );
}

export default Form_register;
