import { useEffect, useState } from "react";
import Cards_books from "../components/cards/cards_books";

function Catalogo() {
  const [libros, setLibros] = useState([]);

  // 📌 Obtener libros desde la API
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch("http://localhost:5000/libros");
        if (!response.ok) throw new Error("Error al obtener los libros");
        const data = await response.json();
        setLibros(data);

        // console.log(data)
      } catch (error) {
        console.error("❌ Error cargando libros:", error);
      }
    };

    fetchLibros();
  }, []);

  // 📌 Función para filtrar libros por género
  const librosPorGenero = (genero) =>
    libros.filter((libro) => libro.generos === genero);

  return (
    <div className="views view-catalogo">
      <h2>Catálogo</h2>

      {/* 📌 Terror */}
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Narrativa</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("Narrativa").map((libro) => (
            <Cards_books key={libro.id} book={libro} />
          ))}
        </section>
      </div>

      {/* 📌 Comedia */}
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Tragedia</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("Tragedia").map((libro) => (
            <Cards_books key={libro.id} book={libro} />
          ))}
        </section>
      </div>

      {/* 📌 Ficción */}
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Terror</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("ficcion").map((libro) => (
            <Cards_books key={libro.id} book={libro} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Catalogo;
