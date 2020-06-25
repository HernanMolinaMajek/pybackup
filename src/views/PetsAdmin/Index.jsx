import React, { useState, useEffect } from "react";
//import fakePets from "../../fakePets.json";
import PetCard from "../../components/AdminPetCard";
import { Link } from "react-router-dom";

const Index = ({ user }) => {
  const [userPets, setUserPets] = useState([]);
  const { _id } = user;

  useEffect(() => {
    //getAndSetUserPets(_id);
    getUserPets().then((data) => {
      setUserPets(data.Pets);
    });
  }, []);

  const getUserPets = async () => {
    const response = await fetch(
      `http://localhost:3030/api/pet/userpets/${_id}`
    );
    const data = await response.json();

    return data;
  };

  // const getAndSetUserPets = (userId) => {
  //   setUserPets(fakePets.filter((pet) => pet._ownerId === userId));
  // };

  const buttonStyle = {
    backgroundColor: "#306060",

    borderTopRightRadius: "1.5rem",
    borderTopLeftRadius: "1.5rem",
  };
  return (
    <div className="flex flex-col">
      {userPets.length > 0 ? (
        userPets.map((pet) => <PetCard key={pet._id} info={pet} />)
      ) : (
        <h1>no hay</h1>
      )}

      <Link to="/newPetForm" className="absolute bottom-0 sticky z-40 w-full">
        <button
          style={buttonStyle}
          className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Nueva mascota
        </button>
      </Link>
    </div>
  );
};
export default Index;
