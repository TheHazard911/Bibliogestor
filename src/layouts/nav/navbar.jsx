import { useNavigate, Link, Outlet } from 'react-router-dom';
import icon_bibliogestor from "../../assets/imgs/Logo_Bibliogestor.png";
import Footer from '../footer/footer';
import useAuthStore from "../../store/authstore"; // Importamos Zustand

function Navbar() {
    const navigate = useNavigate(); // Hook para redirigir
    const { user, isAdmin, logout } = useAuthStore(); // Obtenemos el estado de Zustand

    const handleLogout = () => {
        logout(); // Cierra sesión
        navigate("/"); // Redirige a la página de inicio
    };

    return (
        <>
            <header className='header'>
                <section className='header-logo'>
                    <img src={icon_bibliogestor} alt="Bibliogestor" />
                </section>
                <section className='header-title'>
                    <p>BiblioGestor - Administra, Presta, Lee.</p>
                </section>
                <section className="header-info">
                    <div className="user-info">
                        <p>Bienvenido, {user || "Invitado"}</p>
                    </div>
                    <div className="click-info">
                        <a href="#"><i className="bi bi-question-circle"></i></a>
                    </div>
                </section>
            </header>

            <div className="nav-view">
                <nav className='navbar'>
                    <ul className='item-nav'>
                        <li>
                            <Link to="/nav"><i className="bi bi-house"></i></Link>
                        </li>
                        <li>
                            <Link to="catalogo"><i className="bi bi-book"></i></Link>
                        </li>
                        <li>
                            <Link to="favorites"><i className="bi bi-bookmark-heart"></i></Link>
                        </li>

                        {isAdmin && ( // Solo los admins pueden ver estos botones
                            <>
                                <li>
                                    <Link to="usuarios"><i className="bi bi-people"></i></Link>
                                </li>
                                <li>
                                    <Link to="estadisticas"><i className="bi bi-graph-up"></i></Link>
                                </li>
                                <li>
                                    <Link to="new_book"><i className="bi bi-journal-plus"></i></Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to="perfil"><i className="bi bi-person"></i></Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>
                                <i className="bi bi-door-closed"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="view">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Navbar;
