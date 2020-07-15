import React, { useState, useEffect } from "react";
import PetCard from "./AdminPetCard";
import { Link } from "react-router-dom";
import nothing from "./nothing2.png";

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
  
  const fondoStyle = {
    backgroundImage: `url(${nothing})`,
    width: "100%",
    height: "90vh",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="flex flex-col relative">
      {userPets.length > 0 ? (
        userPets.map((pet) => <PetCard key={pet._id} info={pet} />)
      ) : (
        <div style={fondoStyle} className="">
          <h1 className="px-4 text-3xl lg:px-0 text-center font-medium text-gray-800 leading-none lg:text-left lg:text-6xl lg:w-2/3">
            No tienes ninguna mascota todavia!
          </h1>
        </div>
      )}

      <Link
        to="/newPetForm"
        className="absolute sticky bottom-0 mb-12 right-0 z-10"
      >
        <button
          className="text-6xl text-link bg-gray-100 px-3 pb-1 leading-none rounded-full shadow-md"
          type="submit"
        >
          +
        </button>
      </Link>
    </div>
  );
};
export default Index;
