import React, { useState, useEffect } from "react";
//import fakePets from "../../fakePets.json";
import PetCard from "../../components/AdminPetCard";
import { Link } from "react-router-dom";
import nothing from "./nothing.png";

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
  const fondoStyle = {
    backgroundImage: `url(${nothing})`,
    width: "100%",
    height: "90vh",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="flex flex-col">
      {userPets.length > 0 ? (
        userPets.map((pet) => <PetCard key={pet._id} info={pet} />)
      ) : (
        <div style={fondoStyle} className="">
          <h1 className="px-4 text-3xl lg:px-0 text-center font-medium text-gray-800 leading-none lg:text-left lg:text-6xl lg:w-2/3">
            No tienes ninguna mascota todavia!
          </h1>
        </div>
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
