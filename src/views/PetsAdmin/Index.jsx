import React, { useState, useEffect } from "react";
import fakePets from "../../fakePets.json";
import PetCard from "./PetCard";

const Index = ({ user }) => {
  const [userPets, setUserPets] = useState([]);
  const { _id } = user;

  useEffect(() => {
    getAndSetUserPets(_id);
  }, []);

  const getAndSetUserPets = (userId) => {
    setUserPets(fakePets.filter((pet) => pet._ownerId === userId));
  };

  return (
    <div className="flex flex-col px-6">
      <h1>Mis mascotas</h1>
      {userPets.map((pet) => (
        <PetCard key={pet._id} info={pet} />
      ))}

      <button>Nueva mascota</button>
    </div>
  );
};
export default Index;
