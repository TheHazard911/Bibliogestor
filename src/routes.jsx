// routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import Dashboard_admin from './views/dashboard_admin';
import Navbaradmin from './layouts/nav_admin/navbaradmin';
import Navbaruser from './layouts/nav_user/navbaruser';
import Inicio from './views/inicio_admin';
import Catalogo from './views/catalogo';
import Usuarios from './views/usuarios';
import Estadisticas from './views/estadisticas';
import New_book from './views/new_book';
import Recovery_password from './views/recovery_password';
import Perfil from './views/perfil';
import Favorites_book from './views/favorites_book';
import Iniciouser from './views/inicio_user';
import Inicioadmin from './views/inicio_admin';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery" element={<Recovery_password />} />
            <Route path="/dashboard" element={<Dashboard_admin />} />
            {/* panel de admin */}
            <Route path="/navadmin" element={<Navbaradmin />}> {/* Usamos una ruta específica para el layout */}
                <Route index element={<Inicioadmin />} /> {/* Ruta predeterminada */}
                <Route path="catalogo" element={<Catalogo />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="estadisticas" element={<Estadisticas />} />
                <Route path="new_book" element={<New_book />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="favorites" element={<Favorites_book />} />

            </Route>
            {/* panel de usuario */}
            <Route path="/navuser" element={<Navbaruser />}> {/* Usamos una ruta específica para el layout */}
                <Route index element={<Iniciouser />} /> {/* Ruta predeterminada */}
                <Route path="catalogo" element={<Catalogo />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="estadisticas" element={<Estadisticas />} />
                <Route path="new_book" element={<New_book />} />
                <Route path="favorites" element={<Favorites_book />} />
                <Route path="perfil" element={<Perfil />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
