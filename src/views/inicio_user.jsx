import React from 'react';

function Iniciouser() {
  return (
    <div className='views view-inicio-user'>
      <h2>Inicio</h2>
      <p className='title-orange'>¡Bienvenido/a a BiblioGestor!</p>
      <p>
        Explora nuestra colección, realiza préstamos de libros y haz un seguimiento de tus lecturas. Tu próxima gran aventura literaria está a solo un clic.
      </p>
      <p>En el menú, ubicado en la barra lateral izquierda, encontrarás los íconos que te permitirán navegar fácilmente por toda la aplicación. </p>
      <br />
      <p>Explora nuestras diferentes secciones, como el Catálogo de libros, donde puedes descubrir nuevas lecturas, la sección de Libros Guardados o Prestados, ideal para gestionar tus préstamos, y el apartado de Información de tu cuenta, donde podrás consultar y actualizar tus datos personales. Todo lo que necesitas está a tu alcance, diseñado para ofrecerte una experiencia fluida y sencilla.</p>
      <div className="content-cards">
      </div>
    </div>
  );
}

export default Iniciouser;
