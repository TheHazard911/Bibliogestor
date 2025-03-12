import React from 'react';
import icon_bibliogestor from '../../assets/imgs/Logo_Bibliogestor.png';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Form_recovery() {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
        <h2>Recuperar Contraseña</h2>
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
                {...register("email", { required: "El correo es obligatorio" })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}

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

              <label htmlFor="newPassword" className="form-label labels-form">Nueva Contraseña:</label>
              <input
                id="newPassword"
                type="password"
                placeholder='Contraseña'
                className="form-control inputs-form"
                {...register("newPassword", { required: "La contraseña es obligatoria" })}
              />
              {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}

              <br />

              <label htmlFor="repeatPassword" className="form-label labels-form">Repetir Contraseña:</label>
              <input
                id="repeatPassword"
                type="password"
                placeholder='Repetir'
                className="form-control inputs-form"
                {...register("repeatPassword", { required: "Debes repetir la contraseña" })}
              />
              {errors.repeatPassword && <p className="error">{errors.repeatPassword.message}</p>}

              <br />
            </div>
          </section>
        </div>
        <button type="submit" className="btn btn-color">Recuperar</button>
      </form>
    </div>
  );
}

export default Form_recovery;
