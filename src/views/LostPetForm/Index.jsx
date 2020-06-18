import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import Modal from "react-modal";

//Modal.setAppElement("#root");
const Index = () => {
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setMapPosition({});
    setIsModalOpen(false);
  };

  const aceptMapPosition = () => {
    if (isEmpty(position)){
      alert("no selecciono");
    } else setIsModalOpen(false);
  };

  const buttonStyle = {
    backgroundColor: "#306060",
    borderRadius: "1rem",
  };

  const mapButtonStyle = {
    backgroundColor: "#306060",
    
    borderTopRightRadius: "1rem"
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
        action=""
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
              htmlFor="grid-first-name"
            >
              Fecha de extravío
            </label>
            <input
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="date"
            ></input>
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="grid-last-name"
            >
              Lugar de pérdida
            </label>
            <div
              style={inputStyle}
              className="flex justify-center appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onClick={openModal}
            >
              Selecciona la ubicación
            </div>
          </div>

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
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <button
            style={buttonStyle}
            className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Reportar Pérdida
          </button>
        </div>
      </form>

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
