import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: registersErrors } = useUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    signup(values);
    navigate("/listProducts");
  });

  function justLetters(event) {
    const letra = event.key;
    const esLetra = /[a-zA-ZñÑá-úÁ-Ú ]/.test(letra);
    if (!esLetra) {
      event.preventDefault(); // activa el metodo de forma que no deja escribir letras
    }
  }

  return (
    <div className="">
      <Sidebar />
      <div className="container-registerProduct    mt-10">
        <div className="bg-blue-200 max-w-md p-10  z-10 rounded-md margin-registerProduct">
          {registersErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))}
          <h1 className="text-3xl font-bold my-2">Registrar usuario</h1>
          <form onSubmit={onSubmit} className="z-10 ">
            <input
              type="text" onKeyDown={justLetters}
              {...register("name", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
              placeholder="Nombre"
            />
            {errors.name && (
              <p className="text-red-500">El nombre es requerido</p>
            )}

            <input
              type="text" onKeyDown={justLetters}
              {...register("lastname", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
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
            

            <div className="flex gap-10">

              <button
                className="bg-sky-500 text-white px-4 py-2 rounded-md my-2 "
                type="submit"
              >
                Registrar usuario
              </button>
              <button className=" bg-orange-500 text-white px-4 py-2 rounded-md my-2"><Link to={"/listUsers"}>Cancelar</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
