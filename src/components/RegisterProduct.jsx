import { useForm } from "react-hook-form";
import { useProduct } from "../context/ProductContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import configFirebase from "../firebase/firebase";

function RegisterProduct({onSuccess, onClose}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { errors: registersErrors, registerProduct } = useProduct();
  const navigate = useNavigate();
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(configFirebase);
    const folder = fileType === "imgUrl" ? "images/" : "videos/";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : // eslint-disable-next-line no-undef
            setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log(error);
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL - ", downloadURL);
          setInputs((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };

  const onSubmit = handleSubmit(async (values) => {
    values.image = inputs.imgUrl;
    setSubmitted(true);
    await registerProduct(values);
  });

  useEffect(() => {
    if (submitted && registersErrors.length === 0) {
      onSuccess();
      setSubmitted(false);
    }
  }, [registersErrors, submitted, onSuccess, navigate]);

  return (
    <div className="test">
      <div className="container-registerProduct ">
        <div className=" bg-blue-100 max-w-md p-10 rounded-md margin-registerProduct ">
          {/* {
                            registersErrors.map((error, i) => (
                                <div className='bg-red-500 p-2 text-white' key={i}>
                                    {error}
                                </div>
                            ))
                        } */}
          <h1 className="text-3xl font-bold my-2 text-center -mt-6 text-blue-600">Registrar producto</h1>
          <div className="">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                {...register("id_product", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="id producto"
              />
              {errors.name && (
                <p className="text-red-500">
                  El identicador del producto es requerido
                </p>
              )}
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="nombre"
              />
              {errors.name && (
                <p className="text-red-500">El nombre es requerido</p>
              )}
              <input
                type="Number"
                {...register("price", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="precio"
              />
              {errors.name && (
                <p className="text-red-500">El precio es requerido</p>
              )}
              <input
                type="text"
                {...register("description", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Descripción"
              />
              {errors.name && (
                <p className="text-red-500">La descripción es requerido</p>
              )}
              <div>
                <label htmlFor="img">Image:</label>{" "}
                {imgPerc > 0 && "Uploading: " + imgPerc + "%"}
                <br />
                <input
                  {...register("image", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  type="file"
                  accept="image/*"
                  id="img"
                  onChange={(e) => setImg((prev) => e.target.files[0])}
                />
              </div>
              <input
                type="Number"
                {...register("quantity", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Cantidad"
              />
              {errors.name && (
                <p className="text-red-500">La cantidad es requerido</p>
              )}

              <select
                {...register("type", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Partes pc">Partes pc</option>
                <option value="Monitores">Monitores</option>
                <option value="Perifericos">Perifericos</option>
                <option value="Portátiles">Portátiles</option>
              </select>
              {errors.type && (
                <p className="text-red-500">El tipo es requerido</p>
              )}

              <br />
              <br />
              <div className="flex gap-6 md:ml-6">
                <button className=" bg-orange-400 text-white px-4 py-2 rounded-md my-2" onClick={onClose}>
                  Cancelar
                </button>
                <button
                  className="bg-sky-400 text-white px-4 py-2 rounded-md my-2"
                  type="submit"
                >
                  Registrar producto
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterProduct;
