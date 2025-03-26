import { useEffect, useState } from "react";
import useAuthStore from "../store/authstore"; // ✅ Importar el store de autenticación
import Cards_simple from "../components/cards/cards_simple";

function Read_books() {
  const [librosLeidos, setLibrosLeidos] = useState([]);
  const { user } = useAuthStore();

  if (!user || !user.id) {
    alert("⚠️ Debes iniciar sesión para ver tus libros leídos.");
    return null;
  }

  // 📌 Obtener los libros leídos por el usuario
  useEffect(() => {
    const fetchLibrosLeidos = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/lecturas/${user.id}`
        );
        if (!response.ok) throw new Error("Error al obtener los libros leídos");

        const data = await response.json();

        // ✅ Ordenar por la fecha en que fueron leídos (más recientes primero)
        const librosOrdenados = data.sort(
          (a, b) => new Date(b.fecha_lectura) - new Date(a.fecha_lectura)
        );

        setLibrosLeidos(librosOrdenados);
      } catch (error) {
        console.error("❌ Error cargando libros leídos:", error);
      }
    };

    fetchLibrosLeidos();
  }, [user.id]);

  return (
    <div className="views views-favorite-book">
      <h2>📖 Libros Leídos</h2>

      {/* 📌 Mostrar libros leídos */}
      <div className="content-catalogo">
        <section className="row-cards">
          {librosLeidos.length > 0 ? (
            librosLeidos.map((libro) => (
              <Cards_simple key={libro.id} book={libro} />
            ))
          ) : (
            <p>No has marcado libros como leídos aún.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Read_books;
