import React from 'react'
import icon_bibliogestor from '../../assets/imgs/Logo_Bibliogestor.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function Form_recovery() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault(); // Evita el comportamiento predeterminado del formulario
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
            <form onSubmit={handleSubmit}>
                <div className="position-form-register">
                    <section className='form-register-inputs'>
                        <div className="mb-3">
                            <label for="" className="form-label labels-form">Ingresar Correo:</label>
                            <input placeholder='Correo' type="email" className="form-control inputs-form" id="" aria-describedby="" />
                            <br />
                            <label for="" className="form-label labels-form">Pregunta de Seguridad:</label>
                            <input placeholder='Pregunta' type="text" className="form-control inputs-form" id="" aria-describedby="" />
                            <br />
                            <label for="" className="form-label labels-form">Respuesta:</label>
                            <input placeholder='Respuesta' type="text" className="form-control inputs-form" id="" aria-describedby="" />
                            <br />
                        </div>
                    </section>
                    <section className='form-register-inputs'>
                        <div className="mb-3">
                            <label for="" className="form-label labels-form">Ingresar Cedula:</label>
                            <input placeholder='Cedula' type="number" className="form-control inputs-form" id="" aria-describedby="" />
                            <br />
                            <label for="exampleInputPassword1" className="form-label labels-form">Nueva Contraseña:</label>
                            <input placeholder='Contraseña' type="password" className="form-control inputs-form" id="exampleInputPassword1" />
                            <br />
                            <label for="exampleInputPassword1" className="form-label labels-form">Repetir Contraseña:</label>
                            <input placeholder='Repetir' type="password" className="form-control inputs-form" id="exampleInputPassword1" />
                            <br />
                        </div>
                    </section>
                </div>
                <button type="submit" className="btn btn-color">Recuperar</button>
            </form>
        </div>
    )
}

export default Form_recovery
