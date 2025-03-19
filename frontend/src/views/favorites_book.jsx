import { useEffect, useState } from "react";
import useAuthStore from "../store/authstore"; // ✅ Importar el store de autenticación
import Cards_books from "../components/cards/cards_books";

function Favorites_book() {
  const [librosPrestados, setLibrosPrestados] = useState([]);

  const { user } = useAuthStore();
  //   console.log(user);

  if (!user || !user.id) {
    alert("⚠️ Debes iniciar sesión para tomar prestado un libro.");
    return;
  }

  // 📌 Obtener los libros prestados por el usuario
  useEffect(() => {
    const fetchLibrosPrestados = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/prestamos?usuario_id=${user.id}`
        );
        if (!response.ok)
          throw new Error("Error al obtener los libros prestados");

        const data = await response.json();

        // ✅ Filtrar solo libros que no han sido devueltos (si `fecha_devolucion` es null)
        const librosFiltrados = data.filter((libro) => libro.fecha_devolucion);

        // ✅ Ordenar por fecha de préstamo (más reciente primero)
        const librosOrdenados = librosFiltrados.sort(
          (a, b) => new Date(b.fecha_prestamo) - new Date(a.fecha_prestamo)
        );

        setLibrosPrestados(librosOrdenados);
      } catch (error) {
        console.error("❌ Error cargando libros prestados:", error);
      }
    };

    if (user.id) fetchLibrosPrestados();
  }, [user.id]);

  return (
    <div className="views views-favorite-book">
      <h2>📚 Mi Estantería</h2>

      {/* 📌 Mostrar libros prestados */}
      <div className="content-catalogo">
        <section className="row-cards">
          {librosPrestados.length > 0 ? (
            librosPrestados.map((libro) => (
              <Cards_books
                key={libro.id}
                book={libro}
                enEstanteriaPersonal={true}
              />
            ))
          ) : (
            <p>No tienes libros prestados.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Favorites_book;
