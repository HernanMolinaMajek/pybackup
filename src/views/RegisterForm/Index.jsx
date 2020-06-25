import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
const Index = ({ logIn }) => {
  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

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

  const onHandleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prevForm) => {
      let aux = Object.assign({}, prevForm);
      aux[name] = value;
      return aux;
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(data);
      if (data.Successful) {
        logIn(data.Owner);
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full p-8 ">
      <form
        noValidate
        onSubmit={onHandleSubmit}
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
            ></input>
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
              type="text"
            ></input>
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
            ></input>
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
            ></input>
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
