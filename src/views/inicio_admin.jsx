import React from 'react';
import Card_inicio from '../components/cards/cards_inicio';

function Inicioadmin() {
  return (
    <div className='views view-inicio'>
      <h2>Inicio</h2>
      <div className="content-cards">
        <Card_inicio icon={'<i class="bi bi-book-half"></i>'} title={`Libros`} data={`100`} />
        <Card_inicio icon={'<i class="bi bi-person-circle"></i>'} title={`Usuarios`} data={`20`} />
      </div>
    </div>
  );
}

export default Inicioadmin;
