import { useForm } from "react-hook-form";
import icon_bibliogestor from "../../assets/imgs/Logo_Bibliogestor.png";

function Form_new_book() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
                {...register("nombre", { required: "El nombre es obligatorio" })}
              />
              {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
              <br />
              <label className="form-label labels-form-book">Autor:</label>
              <input
                placeholder="Autor Libro"
                type="text"
                className="form-control inputs-form-book"
                {...register("autor", { required: "El autor es obligatorio" })}
              />
              {errors.autor && <p className="error-message">{errors.autor.message}</p>}
              <br />
              <label className="form-label labels-form-book">Género:</label>
              <input
                placeholder="Género Libro"
                type="text"
                className="form-control inputs-form-book"
                {...register("genero", { required: "El género es obligatorio" })}
              />
              {errors.genero && <p className="error-message">{errors.genero.message}</p>}
            </div>
          </section>
          <section className="form-register-inputs">
            <div className="mb-3">
              <label className="form-label labels-form-book">Imagen de Portada:</label>
              <input
                type="file"
                className="form-control inputs-form-book"
                {...register("portada", { required: "La imagen es obligatoria" })}
              />
              {errors.portada && <p className="error-message">{errors.portada.message}</p>}
              <br />
              <label className="form-label labels-form-book">Categoría:</label>
              <input
                placeholder="Nombrar Categoría"
                type="text"
                className="form-control inputs-form-book"
                {...register("categoria", { required: "La categoría es obligatoria" })}
              />
              {errors.categoria && <p className="error-message">{errors.categoria.message}</p>}
              <br />
              <label className="form-label labels-form-book">Ingresar Descripción:</label>
              <input
                placeholder="Descripción"
                type="text"
                className="form-control inputs-form-book"
                {...register("descripcion", { required: "La descripción es obligatoria" })}
              />
              {errors.descripcion && <p className="error-message">{errors.descripcion.message}</p>}
            </div>
          </section>
        </div>
        <button type="submit" className="btn btn-color-small">
          Agregar
        </button>
      </form>
    </div>
  );
}

export default Form_new_book;