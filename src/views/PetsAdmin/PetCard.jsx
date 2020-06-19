import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PetCard = ({ info }) => {
  const {
    img,
    sex,
    date,
    description,
    ownerName,
    age,
    location,
    phone,
    breed,
    type,
    name,
    distance,
  } = info;

  const cardStyle = {
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
  };

  return (
    <div className="w-full">
      <div className="my-6">
        <div className="flex items-center">
          <img
            style={{ borderRadius: "1rem" }}
            className="h-48 w-40 shadow-lg"
            src={img}
          />
          <div
            style={cardStyle}
            className="flex flex-col justify-between shadow-md p-2 bg-white w-full h-40"
          >
            <h1 className="text-lg">{name}</h1>
            {/* <Link to={{ pathname: "/newPetForm", state: { info } }}>
              <button className="text-xs w-full bg-green-200">Modificar</button>
            </Link> */}

            <Link
              to={{
                pathname: "/newPetForm",
                state: {
                  info: info,
                },
              }}
            >
              Tyler McGinnis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PetCard;
