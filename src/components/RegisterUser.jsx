import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function RegisterUser({onSuccess, onClose}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: registersErrors } = useUser();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    
    setSubmitted(true);
    await signup(values);
  });

  function justLetters(event) {
    const letra = event.key;
    const esLetra = /[a-zA-ZñÑá-úÁ-Ú ]/.test(letra);
    if (!esLetra) {
      event.preventDefault(); // activa el metodo de forma que no deja escribir letras
    }
  }

  useEffect(() => {
    if (submitted && registersErrors.length === 0) {
      onSuccess();
      // navigate("/listUsers");
      setSubmitted(false);
    }
  }, [registersErrors, submitted, onSuccess]);

  return (
    <div className="">
      <div className="container-registerProduct ">
        <div className="bg-blue-100 max-w-md p-12  z-10 rounded-md margin-registerProduct">
          {registersErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))}
          <h1 className="text-3xl font-bold my-2 text-center -mt-6 text-blue-600">Registrar usuario</h1>
          <form onSubmit={onSubmit} className="z-10 ">
            <input
              type="text" onKeyDown={justLetters}
              {...register("name", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3 "
              placeholder="Nombre"
            />
            {errors.name && (
              <p className="text-red-500">El nombre es requerido</p>
            )}

            <input
              type="text" onKeyDown={justLetters}
              {...register("lastname", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3"
              placeholder="Apellido"
            />
            {errors.lastname && (
              <p className="text-red-500">El apellido es requerido</p>
            )}

            <input
              type="number"
              {...register("phone", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Telefono"
            />
            {errors.phone && (
              <p className="text-red-500">El telefono es requerido</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Correo"
            />
            {errors.email && (
              <p className="text-red-500">El correo es requerido</p>
            )}

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <select
              {...register("role", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            >
              <option value="">Selecciona un role</option>
              <option value="employee">employee</option>
              <option value="administrator">administrator</option>
            </select>
            

            <div className="flex gap-6 md:ml-6">

              <button type="button" className=" bg-orange-400 text-white px-4 py-2 rounded-md my-2" onClick={onClose}>Cancelar
              </button>
              <button
                className="bg-sky-400 text-white px-4 py-2 rounded-md my-2 "
                type="submit"
              >
                Registrar usuario
              </button>
              
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
