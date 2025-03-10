import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authstore"; // Importamos el store de Zustand
import icon_bibliogestor from "../../assets/imgs/Logo_Bibliogestor.png";

function Form_login() {
  const navigate = useNavigate();
  const { login } = useAuthStore(); // Obtenemos login desde Zustand

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label labels-form">
              Correo:
            </label>
            <input
              placeholder="Ingresa Correo"
              type="email"
              className="form-control inputs-form"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password" className="form-label labels-form">
              Contraseña:
            </label>
            <input
              placeholder="Ingresa Contraseña"
              type="password"
              className="form-control inputs-form"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <Link to="/register">
              <label className="form-label labels-form-two">Crear Cuenta</label>
            </Link>
            <br />
            <Link to="/recovery">
              <label className="form-label labels-form-two">
                Recuperar Cuenta
              </label>
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
