import React from 'react';
import Card_inicio from '../components/cards/cards_inicio';

function Inicioadmin() {
  return (
    <div className='views view-inicio-admin'>
      <h2>Inicio</h2>
      <p>¡Bienvenido/a al panel de administración de BiblioGestor!.</p>
      <p>
        Aquí podrás gestionar los libros, los usuarios y los administradores del sistema de manera eficiente. Mantén tu biblioteca organizada y en crecimiento desde un solo lugar.
      </p>
      <div className="content-cards">
        <Card_inicio icon={'<i class="bi bi-book-half"></i>'} title={`Libros`} data={`100`} />
        <Card_inicio icon={'<i class="bi bi-person-circle"></i>'} title={`Usuarios`} data={`20`} />
        <Card_inicio icon={'<i class="bi bi-person-fill-gear"></i>'} title={`Admin`} data={`2`} />
      </div>
    </div>
  );
}

export default Inicioadmin;
