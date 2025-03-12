import React from 'react'
import useAuthStore from "../store/authstore"
import { Link } from 'react-router-dom';

function Perfil() {
    const { user } = useAuthStore();
    return (
        <>
            <div className="views view-profile">
                <h2>Perfil</h2>
                <div className="content-perfil">
                    <div className="row-profile">
                        <p>Id: <span>{user.id}</span></p>
                        <p>Genero: <span>{user.genero}</span></p>
                    </div>
                    <div className="line"></div>
                    <div className="row-profile">
                        <p>Nombres: <span>{user.nombres}</span></p>
                        <p>Apellidos: <span>{user.apellidos}</span></p>
                    </div>
                    <div className="line"></div>

                    <div className="row-profile">
                        <p>correo: <span>{user.correo}</span></p>
                        <p>Cedula: <span>{user.cedula}</span></p>
                    </div>
                    <div className="line"></div>

                    <div className="row-profile">
                        <p>Contraseña: <span>{user.password}</span></p>
                        <p>Fecha de Nacimiento: <span>{user.fechaNacimiento}</span></p>
                    </div>
                    <div className="line"></div>

                    <div className="row-profile">
                        <p>Pregunta de Seguridad: <span>{user.pregunta_seguridad}</span></p>
                        <p>Respuesta de Seguridad: <span>{user.respuesta_seguridad}</span></p>
                    </div>
                    <div className="line"></div>
                </div>
                <br />
                <h2>Informacion de libros</h2>
                <div className="content-perfil">
                    <div className="row-profile">
                        <p>Libros Prestados: <span>{user.librosPrestados}</span></p>
                        <p>Libros Leidos: <span>{user.librosLeidos}</span></p>
                    </div>
                    <div className="line"></div>
                    <div className="row-profile">
                        <p>Sanciones: <span>{user.sanciones}</span></p>
                        <p>Edad: <span>00</span></p>
                    </div>
                <br /><br />
                    <div className="btn btn-color">Eliminar cuenta</div>
                    <div className="btn btn-color">Editar Datos</div>
                <br /><br />
                </div>
            </div>
        </>
    )
}

export default Perfil
