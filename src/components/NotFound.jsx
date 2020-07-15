import React from "react";
import notFoundImg from "./notFound3.png";

const NotFound = () => {
  const fondoStyle = {
    backgroundImage: `url(${notFoundImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={fondoStyle} className="w-full h-screen">
      <div className="px-4 lg:px-0 font-medium">
        <h1 className="text-3xl text-center text-gray-800 leading-none lg:text-left lg:text-6xl lg:w-2/3">
          Error 404!
        </h1>
        <p className="mt-5 text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
          Lo sentimos, no encontramos la pagina.
        </p>
      </div>
    </div>
  );
};
export default NotFound;
