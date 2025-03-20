import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import icon_bibliogestor from "../../assets/imgs/Logo_Bibliogestor.png";
import { getGeneros, getAutores, addAutor } from "../../services/api"; // Importa la función
import { useNavigate } from "react-router-dom";
// import { getAutores, addAutor } from "../api/requests"; // Importar las funciones

function Form_new_book() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // 🔹 Asegúrate de extraer setValue aquí
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const [nuevoAutor, setNuevoAutor] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 📌 Cargar lista de autores al montar el componente
  useEffect(() => {
    const cargarAutores = async () => {
      const data = await getAutores();
      setAutores(data);
      setValue("autor", ""); // Restablece el valor del select al cargar
    };
    cargarAutores();
  }, []);

  // 📌 Función para agregar un nuevo autor
  const handleAddAutor = async (e) => {
    e.preventDefault();
    if (!nuevoAutor.trim()) return alert("El nombre del autor es obligatorio");

    const autorAgregado = await addAutor(nuevoAutor);
    if (autorAgregado) {
      const nuevosAutores = [...autores, autorAgregado];
      setAutores(nuevosAutores); // Agregar el nuevo autor a la lista
      setValue("autor", autorAgregado.id); // Seleccionar automáticamente el nuevo autor
      setNuevoAutor(""); // Limpiar el input
      setModalOpen(false); // Cerrar el modal
    }
  };

  // 📌 Cuando la lista de autores cambia, seleccionar solo si el usuario no ha hecho una elección
  useEffect(() => {
    if (!getValues("autor") && autores.length > 0) {
      setValue("autor", "");
    }
  }, [autores]); // Se ejecuta cuando `autores` cambia

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("titulo", data.nombre);
      formData.append("autor_id", data.autor);
      formData.append("descripcion", data.descripcion);
      formData.append("categoria", data.categoria);
      formData.append("imagen", data.portada[0]); // 🔹 Asegurar que se llama "imagen"
      formData.append("genero_id", data.genero); // 🔹 Agregar el género

      const response = await fetch("http://localhost:5000/libros", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al agregar el libro");

      navigate("/nav/catalogo"); // 🔹 Redirigir al catálogo tras éxito
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar el libro");
    }
  };

  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const cargarGeneros = async () => {
      const data = await getGeneros();
      setGeneros(data);
    };
    cargarGeneros();
  }, []);

  return (
    <div className="form-book">
      <section className="image-form-register">
        <img src={icon_bibliogestor} alt="Bibliogestor" />
      </section>
      <section className="title-form-book">
        <h2>Agregar libro | Datos del libro</h2>
      </section>
      <form className="form-action-book" onSubmit={handleSubmit(onSubmit)}>
        <div className="position-form-books">
          <section className="form-books-inputs">
            <div className="mb-3">
              <label className="form-label labels-form-book">Nombre:</label>
              <input
                placeholder="Nombre Libro"
                type="text"
                className="form-control inputs-form-book"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
              />
              {errors.nombre && (
                <p className="error-message">{errors.nombre.message}</p>
              )}
              <br />
              {/* 📌 Select para elegir un autor */}
              <label className="form-label labels-form-book">Autor:</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <select
                  className="form-control inputs-form-book"
                  // value={autorSeleccionado}
                  onChange={(e) => setAutorSeleccionado(e.target.value)}
                  {...register("autor", {
                    required: "El autor es obligatorio",
                  })}
                >
                  <option value="">Selecciona un autor</option>
                  {autores.map((autor, index) => (
                    <option key={autor.id ?? `autor-${index}`} value={autor.id}>
                      {autor.nombre}
                    </option>
                  ))}
                </select>

                {/* Botón para abrir el modal */}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    setModalOpen(true);
                    // setAutorSeleccionado(""); // Restablece el valor del select al abrir el modal
                  }}
                >
                  +
                </button>
              </div>
              {errors.autor && (
                <p className="error-message">{errors.autor.message}</p>
              )}

              <br />
              <label className="form-label labels-form-book">Género:</label>
              <select
                className="form-control inputs-form-book"
                {...register("genero", {
                  required: "El género es obligatorio",
                })}
              >
                <option value="">Selecciona un género</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.nombre} {/* No necesitas decodificar aquí */}
                  </option>
                ))}
              </select>
              {errors.genero && (
                <p className="error-message">{errors.genero.message}</p>
              )}
              {/* <label className="form-label labels-form-book">Género:</label>
              <input
                placeholder="Género Libro"
                type="text"
                className="form-control inputs-form-book"
                {...register("genero", { required: "El género es obligatorio" })}
              />
              {errors.genero && <p className="error-message">{errors.genero.message}</p>} */}
            </div>
          </section>
          <section className="form-register-inputs">
            <div className="mb-3">
              <label className="form-label labels-form-book">
                Imagen de Portada:
              </label>
              <input
                type="file"
                className="form-control inputs-form-book"
                {...register("portada", {
                  required: "La imagen es obligatoria",
                })}
              />

              <br />
              <label className="form-label labels-form-book">Categoría:</label>
              <input
                placeholder="Nombrar Categoría"
                type="text"
                className="form-control inputs-form-book"
                {...register("categoria", {
                  required: "La categoría es obligatoria",
                })}
              />
              {errors.categoria && (
                <p className="error-message">{errors.categoria.message}</p>
              )}
              <br />
              <label className="form-label labels-form-book">
                Ingresar Descripción:
              </label>
              <input
                placeholder="Descripción"
                type="text"
                className="form-control inputs-form-book"
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                })}
              />
              {errors.descripcion && (
                <p className="error-message">{errors.descripcion.message}</p>
              )}
            </div>
          </section>
        </div>

        <br />
        <button type="submit" className="btn btn-color-small">
          Agregar
        </button>
      </form>

      {/* 📌 Modal para agregar un nuevo autor */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleAddAutor}>
              <h2>Agregar Nuevo Autor</h2>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del Autor"
                value={nuevoAutor}
                onChange={(e) => setNuevoAutor(e.target.value)}
              />
              <div className="modal-buttons">
                <button className="btn btn-primary" type="submit">
                  Agregar
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form_new_book;
