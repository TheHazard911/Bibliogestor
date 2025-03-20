import React, { useState, useEffect } from "react";

function EditBookModal({ book, onClose, autores }) {
  console.log("🟢 Renderizando modal con libro:", book);
  if (!book) return null; // Evitar errores si no hay libro seleccionado

  const [formData, setFormData] = useState({
    titulo: book.titulo || "",
    autor_id: book.autor_id || "",
    descripcion: book.descripcion || "",
    categoria: book.categoria || "",
    disponible: book.disponible || false,
    imagen_url: book.imagen_url || "",
  });

  useEffect(() => {
    setFormData({
      titulo: book.titulo || "",
      autor_id: book.autor_id || "",
      descripcion: book.descripcion || "",
      categoria: book.categoria || "",
      disponible: book.disponible || false,
      imagen_url: book.imagen_url || "",
    });
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/libros/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al actualizar el libro");

      alert("Libro actualizado correctamente");
      onClose();
    } catch (error) {
      console.error("❌ Error al actualizar el libro:", error);
    }
  };

  return (
    <div className="modal">
      <h2>Editar Libro</h2>
      <label>Título:</label>
      <input
        type="text"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
      />

      <label>Autor:</label>
      <select name="autor_id" value={formData.autor_id} onChange={handleChange}>
        {autores.map((autor) => (
          <option key={autor.id} value={autor.id}>
            {autor.nombre}
          </option>
        ))}
      </select>

      <label>Descripción:</label>
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <label>Categoría:</label>
      <input
        type="text"
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
      />

      <label>Disponible:</label>
      <input
        type="checkbox"
        name="disponible"
        checked={formData.disponible}
        onChange={handleChange}
      />

      <label>Imagen URL:</label>
      <input
        type="text"
        name="imagen_url"
        value={formData.imagen_url}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Guardar Cambios</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default EditBookModal;
