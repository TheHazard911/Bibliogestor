import Cards_books from "../components/cards/cards_books";
import LibrosSimulados from "../data/json/librosimulados";

function Catalogo() {
  const librosPorGenero = genero =>
    LibrosSimulados.filter(libro => libro.genero === genero);

  return (
    <div className="views view-catalogo">
      <h2>Catálogo</h2>
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Terror</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("terror").map(libro =>
            <Cards_books key={libro.id} book={libro} />
          )}
        </section>
      </div>
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Comedia</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("comedia").map(libro =>
            <Cards_books key={libro.id} book={libro} />
          )}
        </section>
      </div>
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Ficción</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("ficcion").map(libro =>
            <Cards_books key={libro.id} book={libro} />
          )}
        </section>
      </div>
    </div>
  );
}

export default Catalogo;
