import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import Modal from "react-modal";
import { Link, Redirect } from "react-router-dom";

//Modal.setAppElement("#root");
const Index = ({ match }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pet, setPet] = useState(null);
  const [position, setPosition] = useState({});
  const [redirect, setRedirect] = useState(false);

  const [form, setForm] = useState({
    date: null,
    position: null,
    formErrors: {
      date: "",
      position: "",
    },
  });

  useEffect(() => {
    getPet().then((data) => {
      setPet(data[0]);
    });
  }, []);

  // function isEmpty(val) {
  //   return Object.entries(val).length === 0 ? true : false;
  // }

  const getPet = async () => {
    const response = await fetch(
      `http://localhost:3030/api/pet/${match.params.id}`
    );
    const data = await response.json();
    return data;
  };

  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach((error) => {
      error.length > 0 && (valid = false);
    });

    Object.values(rest).forEach((val) => {
      val === null && (valid = false);
    });

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(form)) {
      submit();
      setRedirect(true);
    } else {
      setForm((prevForm) => {
        let aux = Object.assign({}, prevForm);
        if (aux.date === null) aux.formErrors.date = "Seleccione una fecha";
        if (aux.position === null)
          aux.formErrors.position = "Seleccione una posicion";
        return aux;
      });
    }
  };

  const submit = async () => {
    let data = {
      _petId: pet._id,
      _ownerId: pet._ownerId._id,
      date: form.date,
      lat: form.position.lat.toString(),
      lng: form.position.lng.toString(),
    };

    try {
      let result = await fetch("http://localhost:3030/api/lost", {
        method: "POST",
        //mode: "no-cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMapChange = (pos) => {
    setPosition(pos);
    if (position === null) form.formErrors.position = "Seleccione una posicion";
    else {
      setForm((prevForm) => {
        let aux = Object.assign({}, prevForm);
        aux.position = pos;
        aux.formErrors.position = "";
        return aux;
      });
    }
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    let dateError = form.formErrors.date;
    const { name, value } = e.target;
    if (name === "date") {
      dateError = value === null ? "Seleccione una fecha" : "";
    }

    setForm((prevForm) => {
      let aux = Object.assign({}, prevForm);
      aux.date = value;
      aux.formErrors.date = dateError;
      return aux;
    });
  };

  const openModal = () => {
    setForm((prevForm) => {
      let aux = Object.assign({}, prevForm);
      aux.position = null;
      aux.formErrors.position = "Seleccione una posicion";
      return aux;
    });
    setPosition({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const buttonStyle = {
    backgroundColor: "#306060",
    borderRadius: "1rem",
  };

  const mapButtonStyle = {
    backgroundColor: "#306060",

    borderTopRightRadius: "1rem",
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

  const modalStyle = {
    content: {
      position: "absolute",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      //border: "1px solid rgb(204, 204, 204)",
      //background: "rgb(255, 255, 255)",
      overflow: "auto",
      //borderRadius: "4px",
      //outline: "none",
      padding: "0px",
    },
  };

  return (
    <div className="flex justify-center items-center h-full mt-10 p-5 ">
      <form
        noValidate
        onSubmit={handleSubmit}
        style={formStyle}
        className="w-full max-w-lg shadow-md px-8 pt-6 pb-8 "
      >
        <div className="flex justify-center mt-1 mb-8">
          <p style={alertStyle} className="text-lg italic">
            Danos toda la información posible!
          </p>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="date"
            >
              Fecha de extravío
            </label>
            <input
              noValidate
              style={inputStyle}
              onChange={handleDateChange}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="date"
              type="date"
            ></input>
            {form.date === null ? form.formErrors.date : ""}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="map"
            >
              Lugar de pérdida
            </label>
            <div
              style={inputStyle}
              className={`${
                form.position === null ? "" : "bg-green-200"
              } flex justify-center appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              onClick={openModal}
            >
              Selecciona la ubicación
            </div>
            {form.position === null ? form.formErrors.position : ""}
          </div>
          {/* 
          <div className="w-full  mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="grid-last-name"
            >
              Particularidades
            </label>
            <input
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
            ></input>
          </div> */}
        </div>

        <div className="flex justify-center lg:justify-end">
          <button
            style={buttonStyle}
            className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reportar Pérdida
          </button>
          {redirect && <Redirect to={"/"} />}
        </div>
      </form>

      <Modal isOpen={isModalOpen} className="overflow-hidden">
        <div className="flex flex-col realtive">
          <Map setMapPosition={handleMapChange} circleOn={true} />

          <button
            onClick={closeModal}
            style={mapButtonStyle}
            className="w-40 absolute z-40 bottom-0 hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            {form.position ? "Aceptar" : "Seleccione"}
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Index;
