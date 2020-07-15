import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminPetCard = ({ info }) => {
  const { _id, img, sex, description, age, breed, type, name, isLost } = info;
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
      setIsLostState(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-40 lg:h-48 mb-4 px-4">
      <img src={img} className="w-1/3 object-cover rounded-l-lg shadow-lg" />
      <div className="flex flex-col w-2/3 rounded-r-lg overflow-hidden shadow-lg">
        <div className="bg-gray-100 h-full w-full p-2">
          <div className="flex items-center mb-1">
            <p className="text-xl text-gray-700 font-semibold">{name}</p>
            <Link to={`/newPetForm/${_id}`}>
              <p className="ml-2">⚙</p>
            </Link>
          </div>

          <div className="flex justify-between">
            <div className="w-1/3">
              <p className="text-sm text-gray-600">
                {type} • {breed}
              </p>

              <p className="text-sm text-gray-600">{age} años de edad</p>
            </div>
            <p className="w-2/3 truncate break-all overflow-hidden text-sm text-gray-600" >{description}</p>
          </div>
        </div>

        <div className="flex h-full bg-gray-100 w-full p-2 justify-end items-end">
          {isLostState ? (
            <div className=" ">
              <button
                onClick={handlesubmit}
                className="bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Me encontraron
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <Link className="w-full" to={`/lostPetForm/${_id}`}>
                <button className="bg-red text-white font-bold py-2 px-4 rounded">
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
