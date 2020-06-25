import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminPetCard = ({ info }) => {
  const { _id, img, sex, age, breed, type, name, isLost } = info;
  const [isLostState, setIsLostState] = useState(isLost);

  const handlesubmit = async () => {
    //esta api esta muy fea cambiar y ver como re renderizar al padre
    try {
      let result = await fetch(`http://localhost:3030/api/pet/${_id}`, {
        method: "PATCH",
        //mode: "no-cors",
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log(result);
      setIsLostState(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-40 mb-4 px-4">
      <img src={img} className="w-1/3 rounded-l-lg" />
      <div className="flex flex-col w-2/3 rounded-r-lg overflow-hidden">
        <div className="bg-white h-full w-full p-2">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xl text-gray-700 font-semibold">{name}</p>
            <Link to={`/newPetForm/${_id}`}>
              <p>M</p>
            </Link>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-600">{breed}</p>
            <p className="text-sm text-gray-600">{age} años de edad</p>
          </div>
          <p className="text-sm text-gray-600">algo</p>
        </div>

        <div className="bg-gray-200 h-full w-full p-2">
          {isLostState ? (
            <div className="flex justify-between items-center">
              <button
                onClick={handlesubmit}
                className="bg-white rounded-lg text-green-500 font-bold py-1 px-3"
              >
                Me encontraron
              </button>
              
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <Link className="w-full" to={`/lostPetForm/${_id}`}>
                <button className="bg-white rounded-lg text-red-500 font-bold py-1 px-5">
                  Me perdí
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPetCard;
