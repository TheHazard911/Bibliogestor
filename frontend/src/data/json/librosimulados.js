import book1 from "../../assets/imgs/books/book_1.jpeg";
import book2 from "../../assets/imgs/books/book_2.jpeg";
import book3 from "../../assets/imgs/books/book_3.jpeg";

const LibrosSimulados = [
  {
    id: 1,
    titulo: "El Libro de Terror",
    genero: "terror",
    imagen: book1,
    estado: "Prestado",
    categoria: "real",
    autor: "dario avila",
    descripcion: "este libro es basado en hechos reales"
  },
  {
    id: 2,
    titulo: "Risas y Más Risas",
    genero: "comedia",
    imagen: book2,
    estado: "Disponible",
    categoria: "mixto",
    autor: "vicente vandola",
    descripcion: "este libro es totalmente comico y con mucha energia positiva"
  },
  {
    id: 3,
    titulo: "Aventuras Espaciales",
    genero: "ficcion",
    imagen: book3,
    estado: "Prestado",
    categoria: "Deslumbrante",
    autor: "Jhon wick",
    descripcion: "totalmente ciencia ficcion y bueno para pasar el rato"
  }
];

export default LibrosSimulados;
