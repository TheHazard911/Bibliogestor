import React, { useState } from 'react';
import icon_bibliogestor from '../../assets/imgs/Logo_Bibliogestor.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Form_login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Usuarios y contraseñas predeterminados
        const users = {
            'admin@gmail.com': '12345',
            'user@gmail.com': '12345'
        };

        if (users[email] && users[email] === password) {
            if (email === 'admin@gmail.com') {
                navigate('/navadmin'); // Redirige a la ruta /admin
            } else if (email === 'user@gmail.com') {
                navigate('/navuser'); // Redirige a la ruta /user
            }
        } else {
            alert('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className="form-login">
            <section className='image-form-login'>
                <img src={icon_bibliogestor} alt="Bibliogestor" />
            </section>
            <section className='title-form-login'>
                <h1>Iniciar Sesion</h1>
            </section>
            <section className='form-login-inputs'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label labels-form">Correo:</label>
                        <input
                            placeholder='Ingresa Correo'
                            type="email"
                            className="form-control inputs-form"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label htmlFor="exampleInputPassword1" className="form-label labels-form">Contraseña:</label>
                        <input
                            placeholder='Ingresa Contraseña'
                            type="password"
                            className="form-control inputs-form"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <Link to="/register">
                            <label htmlFor="text" className="form-label labels-form-two">Crear Cuenta</label>
                        </Link>
                        <br />
                        <Link to="/recovery">
                            <label htmlFor="text" className="form-label labels-form-two">Recuperar Cuenta</label>
                        </Link>
                    </div>
                    <button type="submit" className="btn btn-color">
                        Ingresar
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Form_login;
