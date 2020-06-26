import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
const Index = ({ logIn }) => {
  const [redirect, setRedirect] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const formValid = () => {
    let valid = true;

    Object.values(formErrors).forEach((error) => {
      error.length > 0 && (valid = false);
    });

    Object.values(form).forEach((val) => {
      val === "" && (valid = false);
    });
    return valid;
  };

  const buttonStyle = {
    backgroundColor: "#306060",
    borderRadius: "1rem",
  };
  const formStyle = {
    backgroundColor: "#F6F6F6",
    borderRadius: "2.5rem",
  };
  const alertStyle = {
    color: "#306060",
  };
  const inputStyle = {
    borderRadius: "1rem",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid()) {
      submitData().then((data) => {
        if (data.Successful) {
          logIn(data.Owner);
          setRedirect(true);
        } else {
          console.log("usuerio ya existe");
        }
      });
    } else {
      setFormErrors((prevErrors) => {
        let aux = Object.assign({}, prevErrors);
        if (form.name === "") aux.name = "Debe ingresar un nombre";
        if (form.phone === "")
          aux.phone = "Debe ingresar un numero de telefono";
        if (form.email === "") aux.email = "Debe ingresar un email";
        if (form.password === "") aux.password = "Debe ingresar una contraseña";
        return aux;
      });
    }
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = formErrors;

    switch (name) {
      case "name": {
        errors.name =
          value.length < 5
            ? "El nombre debe contener al menos 5 caracteres"
            : "";
        break;
      }
      case "phone": {
        errors.phone =
          value.length > 0 ? "" : "El telefono no puede estar vacio";
        break;
      }
      case "password": {
        errors.password =
          value.length < 5
            ? "La contraseña debe contener al menos 5 caracteres"
            : "";
        break;
      }
      case "email": {
        errors.email = emailRegex.test(value) ? "" : "Debe ser un mail valido";
        break;
      }
      default:
        break;
    }

    setForm((prevForm) => {
      let aux = Object.assign({}, prevForm);
      aux[name] = value;
      return aux;
    });
  };

  // const onHandleChange = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setForm((prevForm) => {
  //     let aux = Object.assign({}, prevForm);
  //     aux[name] = value;
  //     return aux;
  //   });
  // };

  const submitData = async () => {
    try {
      let result = await fetch("http://localhost:3030/api/owner", {
        method: "post",
        //mode: "no-cors",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data = await result.json();
      // console.log(data);
      // if (data.Successful) {
      //   logIn(data.Owner);
      //   setRedirect(true);
      // }
      return data;
    } catch (error) {
      return error;
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full p-8 ">
      <form
        noValidate
        onSubmit={handleSubmit}
        style={formStyle}
        className="w-full max-w-lg bg-white shadow-md px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="name"
            >
              Nombre de usuario
            </label>
            <input
              onChange={onHandleChange}
              noValidate
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="name"
              type="text"
              maxLength="15"
            ></input>
            {formErrors.name.length > 0 && (
              <span className="text-red-500">{formErrors.name}</span>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="phone"
            >
              Numero de teléfono
            </label>
            <input
              noValidate
              onChange={onHandleChange}
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="phone"
              type="number"
            ></input>
            {formErrors.phone.length > 0 && (
              <span className="text-red-500">{formErrors.phone}</span>
            )}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              noValidate
              onChange={onHandleChange}
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="email"
              type="email"
              maxLength="20"
            ></input>
            {formErrors.email.length > 0 && (
              <span className="text-red-500">{formErrors.email}</span>
            )}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              noValidate
              onChange={onHandleChange}
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="password"
              type="password"
              maxLength="20"
            ></input>
            {formErrors.password.length > 0 && (
              <span className="text-red-500">{formErrors.password}</span>
            )}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <button
            style={buttonStyle}
            className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Finalizar
          </button>
          {redirect && <Redirect to={"/"} />}
        </div>
      </form>
    </div>
  );
};
export default Index;
