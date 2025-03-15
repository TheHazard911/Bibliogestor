import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/imgs/Logo_BiblioGestor.png"
import Footer from '../layouts/footer/footer'

function Blog() {
    return (
        <>
            <div className="views view-blog">
                <div className="column-contain-blog">
                    <section className='section-blog'>
                        <img src={logo} alt="bibliogestor" />
                        <h1><span className='span-orange'>BiblioGestor</span>, El mejor Administrador de libros.</h1>
                    </section>
                    <section className="section-blog-buttons">
                        <li className='btn btn-color'>
                            <Link to="/login">Ingresar</Link>
                        </li>
                    </section>
                </div>
                <div className="components-information-blog">
                    <div className="cards-blog">
                        <p>
                            <i className='bi bi-bookshelf'></i>
                        </p>
                        <p>Amplios Catalogos</p>
                    </div>
                    <div className="cards-blog">
                        <p>
                            <i className='bi bi-file-lock'></i>
                        </p>
                        <p>Seguridad Garantizada</p>
                    </div>
                    <div className="cards-blog">
                        <p>
                            <i className='bi bi-bookmark-check'></i>
                        </p>
                        <p>Prestamos Inmediatos</p>
                    </div>
                </div>
                <br /><br />
                <Footer></Footer>
            </div>
        </>
    )
}

export default Blog
