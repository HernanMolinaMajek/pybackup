import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <h1 className="">Home</h1>
      <Link to={"/missingPets"}>Listado de mascotas perdidas</Link>
    </div>
  );
};

export default Index;
