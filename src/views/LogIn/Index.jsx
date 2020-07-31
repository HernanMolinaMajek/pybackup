import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

const Index = ({ logIn }) => {
  const [redirect, setRedirect] = useState(false);
  const [userNotFoundError, setUserNotFoundError] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    userNotFound: "",
  });
  const [form, setForm] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid()) {
      submitData().then((data) => {
        if (!data.Error) {
          logIn(data);
          setRedirect(true);
        } else {
          setUserNotFoundError(
            "Usuario no encontrado, Por favor revise su correo y contraseña"
          );
        }
      });
    } else {
      setFormErrors((prevErrors) => {
        let aux = Object.assign({}, prevErrors);
        if (form.email === "") aux.email = "Debe ingresar un Email";
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
      case "password": {
        errors.password =
          value.length < 5
            ? "La contraseña debe contener al menos 5 caracteres"
            : "";
        break;
      }
      case "email": {
        errors.email = emailRegex.test(value) ? "" : "Debe ser un Email valido";
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
      let result = await fetch("http://localhost:3030/api/owner/login", {
        method: "post",
        //mode: "no-cors",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data = await result.json();
      // if (!data.Error) {
      //   logIn(data);
      return data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="flex justify-center items-center mx-3 mt-20 p-5 ">
      {/* <form
        noValidate
        onSubmit={handleSubmit}
        //style={formStyle}
        className="w-full max-w-lg bg-gray-200 shadow-md px-8 pt-6 pb-8 "
      > */}
      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-transparent border border-gray-500 shadow lg:w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        {userNotFoundError.length > 0 && (
          <p className="text-center rounded-sm bg-red-200 mb-5 py-2 px-3 border border-red-400 text-red-700">
            {userNotFoundError}
          </p>
        )}
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              noValidate
              //style={inputStyle}
              onChange={onHandleChange}
              className="appearance-none border rounded-sm h-12 w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none"
              name="email"
              type="email"
            ></input>
            {formErrors.email.length > 0 && (
              <span className="text-red-500">{formErrors.email}</span>
            )}
          </div>

          <div className="w-full mt-3 lg:mt-6 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="password"
            >
              Contraseña
            </label>

            <input
              noValidate
              onChange={onHandleChange}
              className="appearance-none border rounded-sm h-12 w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none "
              name="password"
              type="password"
            ></input>
            {formErrors.password.length > 0 && (
              <span className="text-red-500">{formErrors.password}</span>
            )}
          </div>
        </div>

        <div className="flex justify-center lg:justify-center">
          <button
            className="w-1/2 bg-red text-white font-bold py-2 px-4 rounded shadow"
            type="submit"
          >
            Ingresar
          </button>
          {redirect && <Redirect to={"/"} />}
        </div>

        <h1 className="text-gray-700 text-center mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register">
            <span className="font-bold">Regístrate</span>
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Index;
