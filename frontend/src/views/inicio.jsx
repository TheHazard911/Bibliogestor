import React from "react";
import Card_inicio from "../components/cards/cards_inicio";
import useAuthStore from "../store/authstore"; // Importamos Zustand

import { useState, useEffect } from "react";
import { getTotales } from "../services/api";

function Inicio() {
  const { isAdmin } = useAuthStore(); // Obtenemos el estado de Zustand

  const [totales, setTotales] = useState({
    totalLibros: 0,
    totalUsuarios: 0,
    totalAdmins: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTotales();
      setTotales(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {!isAdmin && (
        <div className="views view-inicio-user">
          <h2>Inicio</h2>
          <p className="title-orange">¡Bienvenido/a a BiblioGestor!</p>
          <p>
            Explora nuestra colección, realiza préstamos de libros y haz un
            seguimiento de tus lecturas. Tu próxima gran aventura literaria está
            a solo un clic.
          </p>
          <p>
            En el menú, ubicado en la barra lateral izquierda, encontrarás los
            íconos que te permitirán navegar fácilmente por toda la aplicación.{" "}
          </p>
          <br />
          <p>
            Explora nuestras diferentes secciones, como el Catálogo de libros,
            donde puedes descubrir nuevas lecturas, la sección de Libros
            Guardados o Prestados, ideal para gestionar tus préstamos, y el
            apartado de Información de tu cuenta, donde podrás consultar y
            actualizar tus datos personales. Todo lo que necesitas está a tu
            alcance, diseñado para ofrecerte una experiencia fluida y sencilla.
          </p>
          <div className="content-cards"></div>
        </div>
      )}
      {isAdmin && (
        <div className="views view-inicio-admin">
          <h2>Inicio</h2>
          <p>¡Bienvenido/a al panel de administración de BiblioGestor!.</p>
          <p>
            Aquí podrás gestionar los libros, los usuarios y los administradores
            del sistema de manera eficiente. Mantén tu biblioteca organizada y
            en crecimiento desde un solo lugar.
          </p>
          <div className="content-cards">
            <Card_inicio
              icon={'<i class="bi bi-book-half"></i>'}
              title={`Libros`}
              data={totales.totalLibros}
            />
            <Card_inicio
              icon={'<i class="bi bi-person-circle"></i>'}
              title={`Usuarios`}
              data={totales.totalUsuarios}
            />
            <Card_inicio
              icon={'<i class="bi bi-person-fill-gear"></i>'}
              title={`Admin`}
              data={totales.totalAdmins}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Inicio;
