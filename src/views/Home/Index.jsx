import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import fondo from "./fondo2.png";
import newImg from "./new4.png";
import lostImg from "./lost4.png";
import foundImg from "./found4.png";

//Modal.setAppElement("#root");
const Index = ({ setUserLocationInMap }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [position, setPosition] = useState({});

  // const setMapPosition = (position) => {
  //   setPosition(position);
  // };

  // function isEmpty(val) {
  //   return Object.entries(val).length === 0 ? true : false;
  // }

  // const openModal = () => {
  //   setMapPosition({});
  //   //setUserLocationInMap(position)

  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setMapPosition({});
  //   setIsModalOpen(false);
  // };

  // const aceptMapPosition = () => {
  //   if (isEmpty(position)) {
  //     alert("no selecciono");
  //   } else {
  //     setUserLocationInMap(position);
  //     setIsModalOpen(false);
  //   }
  // };

  // const mapButtonStyle = {
  //   backgroundColor: "#306060",

  //   borderTopRightRadius: "1rem",
  // };

  // const buttonStyle = {
  //   backgroundColor: "#306060",
  //   borderRadius: "1rem",
  // };

  // const formStyle = {
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: "2.5rem",
  // };
  // const alertStyle = {
  //   color: "#306060",
  // };
  // const inputStyle = {
  //   borderRadius: "1rem",
  // };

  // const modalStyle = {
  //   content: {
  //     position: "absolute",
  //     top: "0px",
  //     left: "0px",
  //     right: "0px",
  //     bottom: "0px",
  //     //border: "1px solid rgb(204, 204, 204)",
  //     //background: "rgb(255, 255, 255)",
  //     overflow: "auto",
  //     //borderRadius: "4px",
  //     //outline: "none",
  //     padding: "0px",
  //   },
  // };

  const fondoStyle = {
    backgroundImage: `url(${fondo})`,

    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      <div className="flex flex-col w-full mb-6">
        <div style={fondoStyle} className="w-full h-screen">
          <div className="px-4 lg:px-0 font-medium">
            <h1 className="text-3xl text-center text-gray-800 leading-none lg:text-left lg:text-6xl lg:w-2/3">
              Encontrá a tu mascota mucho más rapido!
            </h1>
            <p className="mt-5 text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
              Podemos ayudarte brindando un espacio para que vos y otros puedan
              encontrar a nuestros mejores amigos.
            </p>
          </div>
          {/* <img className="w-full h-full" src={fondo} alt="" /> */}
        </div>

        {/* <div className="flex w-full -mt-24 lg:-mt-12 mb-12 lg:mb-16 ">
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
        </div> */}

        <div className="flex flex-col w-full ">
          <div className="px-4 mt-6 lg:mt-6 mb-16 lg:px-0 font-medium">
            <h1 className="text-3xl text-center text-gray-800 leading-none lg:text-center lg:text-6xl">
              Cómo funciona?
            </h1>
            {/* <p className="mt-5 text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
              Distintos usuarios publican sus mascotas extraviadas en un area
              geografica aproximada a su perdida.
            </p>
            <p className="mt-5 text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
              Al mismo tiempo que la comunidad puede ver una lista ordenada por
              proximidad de ellos y dar aviso al dueño si los llega a encontrar
            </p> */}
          </div>

          <div className="flex flex-col lg:-mx-32 lg:px-40 bg-orange items-center p-8 lg:flex-row lg:justify-around">
            <div className="flex flex-col bg-white shadow-lg rounded-xl w-70 mb-12 p-5 lg:mb-0">
              <h1 className="mt-4 text-center lg:text-center text-2xl font-bold text-gray-800 mb-10">Crear mascota</h1>

              <img className="w-full h-full" src={newImg} alt="" />
              <p className="mt-2 p-3 text-center lg:text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
                Añade a tus mejores amigos y manten a la comunidad informados sobre el estado de ellos. 
              </p>
            </div>

            <div className="flex flex-col bg-white shadow-lg rounded-xl w-70 mb-12 p-5 lg:mb-0">
              <h1 className="mt-4 text-center lg:text-center text-2xl font-bold text-gray-800 mb-10">Declarar perdida</h1>
              <img className="w-full h-full" src={lostImg} alt="" />
              <p className="mt-2 p-3 text-center lg:text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
                Declara el extravio de tu mascota lo antes posible asi entre todos podemos ayudarte.
              </p>
            </div>

            <div className="flex flex-col bg-white shadow-lg rounded-xl w-70 p-5 lg:mb-0">
              <h1 className="mt-4 text-center lg:text-center text-2xl font-bold text-gray-800 mb-10">Contactar con dueño</h1>
              <img className="w-full h-full" src={foundImg} alt="" />
              <p className="mt-2 p-3 text-center lg:text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
                Dale un vistazo a la lista de mascotas perdidas y contacta inmediatamente a sus dueños si los ves.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
        
        onRequestClose={closeModal}
        isOpen={isModalOpen}
        className="overflow-hidden"
      >
        <div className="flex flex-col realtive">
          <button onClick={closeModal} className="absolute z-40">
            X
          </button>

          <Map setMapPosition={setMapPosition} circleOn={false} />

          <button
            onClick={aceptMapPosition}
            style={mapButtonStyle}
            className="w-40 absolute z-40 bottom-0 hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Aceptar
          </button>
        </div>
      </Modal> */}
    </div>
  );
};
export default Index;
