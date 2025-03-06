import React from 'react'
import icon_bibliogestor from "../../assets/imgs/Logo_Bibliogestor.png"
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer'
function Navbaruser() {
    let name = "nombre"
    let lastname = "apellido"
    return (
        <>
            <header className='header'>
                <section className='header-logo'>
                    <img src={icon_bibliogestor} alt="Bibliogestor" />
                </section>
                <section className='header-title'>
                    <p>BiblioGestor - Administra ,Presta ,Lee.</p>
                </section>
                <section className="header-info">
                    <div className="user-info">
                        <p>Bienvenido , {name} {lastname}</p>
                    </div>
                    <div className="click-info">
                        <a href=""><i class="bi bi-question-circle">
                        </i></a>
                    </div>
                </section>
            </header>
            <div className="nav-view">
                <nav className='navbar'>
                    <ul className='item-nav'>
                        <li>
                            <Link to="/navuser">
                                <i class="bi bi-house"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="catalogo">
                                <i class="bi bi-book"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="favorites">
                                <i class="bi bi-bookmark-heart"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="usuarios">
                                <i class="bi bi-people"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i class="bi bi-door-closed"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="view">
                    <Outlet />
                    <Footer></Footer>
                </div>
            </div>
        </>
    )
}

export default Navbaruser
