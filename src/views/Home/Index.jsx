import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import Modal from "react-modal";
import { Link } from "react-router-dom";
//Modal.setAppElement("#root");
const Index = ({ setUserLocationInMap }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({});

  const setMapPosition = (position) => {
    setPosition(position);
  };

  function isEmpty(val) {
    return Object.entries(val).length === 0 ? true : false;
  }

  const openModal = () => {
    setMapPosition({});
    //setUserLocationInMap(position)
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setMapPosition({});
    setIsModalOpen(false);
  };

  const aceptMapPosition = () => {
    if (isEmpty(position)) {
      alert("no selecciono");
    } else {
      setUserLocationInMap(position)
      setIsModalOpen(false);
    }
  };

  const mapButtonStyle = {
    backgroundColor: "#306060",

    borderTopRightRadius: "1rem",
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
    <div>
      <div className="w-full md:w-1/2 mb-6 px-3">
        <h1>Busqueda de mascotas perdidas</h1>
        <p>Haremos todo para ayudarte!</p>

        <button
          style={buttonStyle}
          className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
          onClick={openModal}
        >
          Definir mi ubicacion
        </button>

        <Link
          style={mapButtonStyle}
          className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
          to={"/missingPets"}
        >
          Ver lista de mascotas
        </Link>
      </div>

      <Modal
        onRequestClose={closeModal}
        isOpen={isModalOpen}
        className="overflow-hidden"
      >
        <div className="flex flex-col realtive">
          <button onClick={closeModal} className="absolute z-40">
            X
          </button>
          <Map setMapPosition={setMapPosition} circleOn={true} />

          <button
            onClick={aceptMapPosition}
            style={mapButtonStyle}
            className="w-40 absolute z-40 bottom-0 hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Index;
