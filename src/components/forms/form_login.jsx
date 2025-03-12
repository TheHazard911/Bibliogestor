import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authstore"; // Importamos el store de Zustand
import icon_bibliogestor from "../../assets/imgs/Logo_Bibliogestor.png";

function Form_login() {
  const navigate = useNavigate();
  const { login } = useAuthStore(); // Obtenemos login desde Zustand

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    if (login(email, password)) {
      navigate("/nav"); // Redirige si el login es exitoso
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="form-login">
      <section className="image-form-login">
        <img src={icon_bibliogestor} alt="Bibliogestor" />
      </section>
      <section className="title-form-login">
        <h1>Iniciar Sesión</h1>
      </section>
      <section className="form-login-inputs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label labels-form">
              Correo:
            </label>
            <input
              placeholder="Ingresa Correo"
              type="email"
              className="form-control inputs-form"
              id="email"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            
            <br />

            <label htmlFor="password" className="form-label labels-form">
              Contraseña:
            </label>
            <input
              placeholder="Ingresa Contraseña"
              type="password"
              className="form-control inputs-form"
              id="password"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            
            <br />

            <Link to="/register">
              <label className="form-label labels-form-two">Crear Cuenta</label>
            </Link>
            <br />
            <Link to="/recovery">
              <label className="form-label labels-form-two">Recuperar Cuenta</label>
            </Link>
          </div>
          <button type="submit" className="btn btn-color">
            Ingresar
          </button>
        </form>
      </section>
    </div>
  );
}

export default Form_login;
