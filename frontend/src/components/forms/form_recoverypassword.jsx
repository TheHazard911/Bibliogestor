import React, { useState } from "react";
import icon_bibliogestor from "../../assets/imgs/Logo_Bibliogestor.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { verificarEmail, cambiarContrasena } from "../../services/api"; // Importa las peticiones

function Form_recovery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const [preguntaSeguridad, setPreguntaSeguridad] = useState("");
  const [emailVerificado, setEmailVerificado] = useState(false);

  // Función para verificar email
  const verificarUsuario = async (data) => {
    const response = await verificarEmail(data.email);
    if (response) {
      setPreguntaSeguridad(response.preguntaSeguridad);
      setEmailVerificado(true);
      setValue("securityQuestion", response.preguntaSeguridad); // Rellena la pregunta de seguridad
    } else {
      alert("Correo no encontrado");
    }
  };

  // Función para cambiar la contraseña
  const onSubmit = async (data) => {
    if (!emailVerificado) {
      alert("Debes verificar tu correo antes de continuar");
      return;
    }

    if (data.newPassword !== data.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const response = await cambiarContrasena(
      data.email,
      data.securityAnswer,
      data.newPassword
    );
    if (response) {
      alert("Contraseña actualizada correctamente");
      navigate("/login");
    } else {
      alert("Respuesta de seguridad incorrecta o error en el servidor");
    }
  };

  return (
    <div className="form-register">
      <h2>Recuperar Contraseña</h2>

      {/* Sección para verificar email */}
      {!emailVerificado ? (
        <form onSubmit={handleSubmit(verificarUsuario)}>
          <label>Ingresar Correo:</label>
          <input
            type="email"
            {...register("email", { required: "El correo es obligatorio" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <button type="submit">Verificar</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Pregunta de seguridad (rellena automáticamente) */}
          <label>Pregunta de Seguridad:</label>
          <input type="text" disabled {...register("securityQuestion")} />

          <label>Respuesta:</label>
          <input
            type="text"
            {...register("securityAnswer", {
              required: "La respuesta es obligatoria",
            })}
          />
          {errors.securityAnswer && <p>{errors.securityAnswer.message}</p>}

          <label>Nueva Contraseña:</label>
          <input
            type="password"
            {...register("newPassword", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}

          <label>Repetir Contraseña:</label>
          <input
            type="password"
            {...register("repeatPassword", {
              required: "Debes repetir la contraseña",
            })}
          />
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

          <button type="submit">Cambiar Contraseña</button>
        </form>
      )}
    </div>
  );
}

export default Form_recovery;

//   return (
//     <div className="form-register">
//       <section className="image-form-register">
//         <img src={icon_bibliogestor} alt="Bibliogestor" />
//       </section>
//       <section className="title-form-register">
//         <h2>Recuperar Contraseña</h2>
//       </section>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="position-form-register">
//           <section className="form-register-inputs">
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label labels-form">
//                 Ingresar Correo:
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Correo"
//                 className="form-control inputs-form"
//                 {...register("email", { required: "El correo es obligatorio" })}
//               />
//               {errors.email && <p className="error">{errors.email.message}</p>}

//               <br />

//               <label
//                 htmlFor="securityQuestion"
//                 className="form-label labels-form"
//               >
//                 Pregunta de Seguridad:
//               </label>
//               <input
//                 id="securityQuestion"
//                 type="text"
//                 placeholder="Pregunta"
//                 className="form-control inputs-form"
//                 {...register("securityQuestion", {
//                   required: "La pregunta es obligatoria",
//                 })}
//               />
//               {errors.securityQuestion && (
//                 <p className="error">{errors.securityQuestion.message}</p>
//               )}

//               <br />

//               <label
//                 htmlFor="securityAnswer"
//                 className="form-label labels-form"
//               >
//                 Respuesta:
//               </label>
//               <input
//                 id="securityAnswer"
//                 type="text"
//                 placeholder="Respuesta"
//                 className="form-control inputs-form"
//                 {...register("securityAnswer", {
//                   required: "La respuesta es obligatoria",
//                 })}
//               />
//               {errors.securityAnswer && (
//                 <p className="error">{errors.securityAnswer.message}</p>
//               )}

//               <br />
//             </div>
//           </section>
//           <section className="form-register-inputs">
//             <div className="mb-3">
//               <label htmlFor="cedula" className="form-label labels-form">
//                 Ingresar Cedula:
//               </label>
//               <input
//                 id="cedula"
//                 type="number"
//                 placeholder="Cedula"
//                 className="form-control inputs-form"
//                 {...register("cedula", {
//                   required: "La cédula es obligatoria",
//                 })}
//               />
//               {errors.cedula && (
//                 <p className="error">{errors.cedula.message}</p>
//               )}

//               <br />

//               <label htmlFor="newPassword" className="form-label labels-form">
//                 Nueva Contraseña:
//               </label>
//               <input
//                 id="newPassword"
//                 type="password"
//                 placeholder="Contraseña"
//                 className="form-control inputs-form"
//                 {...register("newPassword", {
//                   required: "La contraseña es obligatoria",
//                 })}
//               />
//               {errors.newPassword && (
//                 <p className="error">{errors.newPassword.message}</p>
//               )}

//               <br />

//               <label
//                 htmlFor="repeatPassword"
//                 className="form-label labels-form"
//               >
//                 Repetir Contraseña:
//               </label>
//               <input
//                 id="repeatPassword"
//                 type="password"
//                 placeholder="Repetir"
//                 className="form-control inputs-form"
//                 {...register("repeatPassword", {
//                   required: "Debes repetir la contraseña",
//                 })}
//               />
//               {errors.repeatPassword && (
//                 <p className="error">{errors.repeatPassword.message}</p>
//               )}

//               <br />
//             </div>
//           </section>
//         </div>
//         <button type="submit" className="btn btn-color">
//           Recuperar
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Form_recovery;
