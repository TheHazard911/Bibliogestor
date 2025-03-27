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

      {/* 📌 Narrativa */}
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

      {/* 📌 Tragedia */}
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

      {/* 📌 Terror */}
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Terror</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("Terror").map((libro) => (
            <Cards_books key={libro.id} book={libro} />
          ))}
        </section>
      </div>

      {/* 📌 Fantasia */}
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Fantasia</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("Fantasia").map((libro) => (
            <Cards_books key={libro.id} book={libro} />
          ))}
        </section>
      </div>

      {/* 📌 Aventuras */}
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Aventuras</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("Aventuras").map((libro) => (
            <Cards_books key={libro.id} book={libro} />
          ))}
        </section>
      </div>

      {/* 📌 ciencia ficcion */}
      <div className="content-catalogo">
        <section className="title-genero">
          <h3>Ciencia Ficcion</h3>
        </section>
        <section className="row-cards">
          {librosPorGenero("Ciencia ficción").map((libro) => (
            <Cards_books key={libro.id} book={libro} />
          ))}
        </section>
      </div>


    </div>
  );
}

export default Catalogo;
