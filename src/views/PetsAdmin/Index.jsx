import React, { useState, useEffect } from "react";
//import fakePets from "../../fakePets.json";
import PetCard from "../../components/AdminPetCard";
import { Link } from "react-router-dom";

const Index = ({ user }) => {
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    //getAndSetUserPets(_id);
    if (user._id === undefined) {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      user = Object.assign({}, loggedUser);
    }
    getUserPets()
      .then((data) => {
        setUserPets(data.Pets);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getUserPets = async () => {
    const response = await fetch(
      `http://localhost:3030/api/pet/userpets/${user._id}`
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

      <Link to="/newPetForm" className="absolute bottom-0 sticky z-0 w-full">
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
