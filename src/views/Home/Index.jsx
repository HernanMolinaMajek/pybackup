import React from "react";

import fondo from "./fondo2.png";
import newImg from "./new4.png";
import lostImg from "./lost4.png";
import foundImg from "./found4.png";

const Index = () => {
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
        </div>

        <div className="flex flex-col w-full ">
          <div className="px-4 mt-6 lg:mt-6 mb-16 lg:px-0 font-medium">
            <h1 className="text-3xl text-center text-gray-800 leading-none lg:text-center lg:text-6xl">
              Cómo funciona?
            </h1>
          </div>

          <div className="flex flex-col lg:-mx-32  bg-orange items-center p-8 lg:flex-row lg:justify-around">
            <div className="flex flex-col bg-white shadow-lg rounded-xl w-70 mb-12 p-5 lg:mb-0">
              <h1 className="mt-4 text-center lg:text-center text-2xl font-bold text-gray-800 mb-10">
                Crear mascota
              </h1>

              <img className="w-full h-full" src={newImg} alt="" />
              <p className="mt-2 p-3 text-center lg:text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
                Añade a tus mejores amigos y manten a la comunidad informados
                sobre el estado de ellos.
              </p>
            </div>

            <div className="flex flex-col bg-white shadow-lg rounded-xl w-70 mb-12 p-5 lg:mb-0">
              <h1 className="mt-4 text-center lg:text-center text-2xl font-bold text-gray-800 mb-10">
                Declarar perdida
              </h1>
              <img className="w-full h-full" src={lostImg} alt="" />
              <p className="mt-2 p-3 text-center lg:text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
                Declara el extravio de tu mascota lo antes posible asi entre
                todos podemos ayudarte.
              </p>
            </div>

            <div className="flex flex-col bg-white shadow-lg rounded-xl w-70 p-5 lg:mb-0">
              <h1 className="mt-4 text-center lg:text-center text-2xl font-bold text-gray-800 mb-10">
                Contactar con dueño
              </h1>
              <img className="w-full h-full" src={foundImg} alt="" />
              <p className="mt-2 p-3 text-center lg:text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
                Dale un vistazo a la lista de mascotas perdidas y contacta
                inmediatamente a sus dueños si los ves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
