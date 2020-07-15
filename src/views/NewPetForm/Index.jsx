import React, { useState, useEffect } from "react";
import modal from "react-modal";
import { Redirect } from "react-router-dom";
const Index = ({ match, user }) => {
  const isEditig = Object.entries(match.params).length === 0 ? false : true;
  const method = isEditig ? "PUT" : "POST";
  const [redirect, setRedirect] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    breed: "",
    description: "",
    age: "",
    img: "",
  });

  const [imgState, setImgState] = useState({});
  const [form, setForm] = useState({
    _ownerId: user._id,
    name: "",
    sex: "Macho",
    type: "Perro",
    breed: "",
    description: "",
    age: "",
    isLost: false,
  });

  useEffect(() => {
    if (isEditig) {
      getPet().then((pet) => {
        // setForm((prevForm) => {
        //   pet._ownerId = user._id;
        //   return pet;
        // });
        pet._ownerId = user._id;
        setForm(pet);
      });
    }
  }, []);

  const getPet = async () => {
    const response = await fetch(
      `http://localhost:3030/api/pet/${match.params.id}`
    );
    const data = await response.json();
    console.log("gett petts");
    return data[0];
  };

  const updatePet = async () => {
    try {
      let resutl = await fetch(
        `http://localhost:3030/api/pet/update/${form._id}`,
        {
          method: "put",
          //mode: "no-cors",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      console.log(resutl);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePet = async () => {
    try {
      let resutl = await fetch(`http://localhost:3030/api/pet/${form._id}`, {
        method: "delete",
        cors: "no-cors",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(form),
      });
      console.log(resutl);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  const submitData = async () => {
    const formData = new FormData();
    for (const prop in form) {
      formData.append(prop, form[prop]);
      console.log("prop", prop);
      console.log("form[prop]", form[prop]);
    }
    formData.append("img", imgState);

    try {
      let resutl = await fetch("http://localhost:3030/api/pet", {
        method: method,
        cors: "no-cors",
        headers: {
          //accept: "application/json",
          //"Content-Type": "multipart/form-data", //"application/json",
        },
        body: formData, //JSON.stringify(form),
      });
      console.log(resutl);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    let errors = formErrors;

    switch (name) {
      case "name": {
        errors.name =
          value.length < 3
            ? "El nombre debe contener al menos 3 caracteres"
            : "";
        break;
      }
      case "breed": {
        errors.breed =
          value.length < 2 ? "La raza debe contener al menos 2 caracteres" : "";
        break;
      }
      case "description": {
        errors.description =
          value.length < 15
            ? "La descripcion deb contener al menos 15 caracteres"
            : "";
        break;
      }
      case "age": {
        errors.age = value.length > 0 ? "" : "La edad no puede estar vacia";
        break;
      }
      case "img": {
        errors.img = value.length > 0 ? "" : "Debe subir una imagen";
        break;
      }
    }

    setForm((prevForm) => {
      let aux = Object.assign({}, prevForm);
      if (name === "img") {
        setImgState(files[0]);
      } else {
        aux[name] = value;
      }
      return aux;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid()) {
      submitData();
      setRedirect(true);
    } else {
      setFormErrors((prevErrors) => {
        let aux = Object.assign({}, prevErrors);
        if (form.name === "")
          aux.name = "El nombre debe contener al menos 3 caracteres";
        if (form.breed === "")
          aux.breed = "La raza debe contener al menos 2 caracteres";
        if (form.description === "")
          aux.description =
            "La descripcion deb contener al menos 15 caracteres";
        if (form.age === "") aux.age = "La edad no puede estar vacia";
        if (Object.keys(imgState).length === 0)
          aux.img = "Debe subir una imagen";

        return aux;
      });
    }
  };

  const formValid = () => {
    let valid = true;

    Object.values(formErrors).forEach((error) => {
      error.length > 0 && (valid = false);
    });

    Object.values(form).forEach((val) => {
      val === "" && (valid = false);
    });

    Object.values(imgState).forEach((val) => {
      val === "" && (valid = false);
    });

    return valid;
  };

  return (
    <div className="flex justify-center items-center mx-3 mt-12 p-5">
      {redirect && <Redirect to="/petadmin" />}
      <form
        noValidate
        onSubmit={handleSubmit}
        // style={formStyle}
        className="bg-transparent border border-gray-500 shadow w-full rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              maxLength="15"
              onChange={onHandleChange}
              noValidate
              value={form.name}
              // style={inputStyle}
              className="appearance-none border rounded-sm h-12 w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none"
              name="name"
              type="text"
            />

            {formErrors.name.length > 0 && (
              <span className="text-red-500">{formErrors.name}</span>
            )}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="type"
            >
              Tipo
            </label>
            <div className="relative">
              <select
                onChange={onHandleChange}
                noValidate
                value={form.type}
                // style={inputStyle}
                className="appearance-none border bg-white rounded-sm h-12 w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none"
                name="type"
              >
                <option>Perro</option>
                <option>Gato</option>
                <option>Otro</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="sex"
            >
              Sexo
            </label>
            <div className="relative">
              <select
                onChange={onHandleChange}
                noValidate
                value={form.sex}
                className="appearance-none border rounded-sm h-12 w-full bg-white py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none"
                name="sex"
              >
                <option>Macho</option>
                <option>Hembra</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="breed"
            >
              Raza
            </label>
            <input
              maxLength="15"
              onChange={onHandleChange}
              value={form.breed}
              noValidate
              className="appearance-none border rounded-sm h-12 w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none"
              name="breed"
              type="text"
            />
            {formErrors.breed.length > 0 && (
              <span className="text-red-500">{formErrors.breed}</span>
            )}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="age"
            >
              Edad
            </label>
            <input
              onChange={onHandleChange}
              noValidate
              value={form.age}
              className="appearance-none border rounded-sm h-12 w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none"
              name="age"
              type="number"
            />
            {formErrors.age.length > 0 && (
              <span className="text-red-500">{formErrors.age}</span>
            )}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="description"
            >
              Descripción general
            </label>
            <textarea
              name="description"
              onChange={onHandleChange}
              value={form.description}
              noValidate
              className="h-40 p-3 leading-tight appearance-none border rounded-sm  w-full text-gray-700 border-gray-400 leading-tight focus:outline-none"
              maxLength="225"
            />
            {formErrors.description.length > 0 && (
              <span className="text-red-500">{formErrors.description}</span>
            )}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="img"
            >
              Foto
            </label>
            <input
              onChange={onHandleChange}
              // value={form.img}
              name="img"
              noValidate
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="file"
              accept="image/*"
            />
            {formErrors.img.length > 0 && (
              <span className="text-red-500">{formErrors.img}</span>
            )}
          </div>
        </div>

        {/* <div className="flex justify-center lg:justify-center">
          <button
            
            className="w-1/2 bg-red text-white font-bold py-2 px-4 rounded shadow"
            type="submit"
          >
            Bienvenido
          </button>
        </div> */}
        {isEditig ? (
          <div className="flex justify-center lg:justify-center">
            <button
              className="w-1/2 bg-red text-white font-bold mx-4 py-2 px-4 rounded shadow"
              onClick={deletePet}
              type="button"
            >
              Eliminar Mascota
            </button>

            <button
              className="w-1/2 bg-red text-white font-bold mx-4 py-2 px-4 rounded shadow"
              type="button"
              onClick={updatePet}
            >
              Guardar cambios
            </button>
          </div>
        ) : (
          <div className="flex justify-center lg:justify-center">
            <button
              className="w-1/2 bg-red text-white font-bold py-2 px-4 rounded shadow"
              type="submit"
            >
              Crear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default Index;
