import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminPetCard = ({ info }) => {
  const { _id, img, sex, description, age, breed, type, name, isLost } = info;
  const [isLostState, setIsLostState] = useState(isLost);

  const handlesubmit = async () => {
    try {
      await fetch(`http://localhost:3030/api/pet/${_id}`, {
        method: "PATCH",
        //mode: "no-cors",
        headers: {
          "Content-type": "application/json",
        },
      });

      setIsLostState(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isClientMobile = () => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      return true;
    } else return false;
  };

  return (
    <React.Fragment>
      {isClientMobile() ? (
        <div className="flex w-full h-53 mb-4 px-4">
          <img
            src={img}
            alt=""
            className="w-2/5 h-full object-cover rounded-l-lg shadow-lg "
          />
          <div className="flex flex-col w-3/5 overflow-hidden rounded-r-lg shadow-lg text-gray-700 bg-gray-100 justify-between">
            <div className="flex p-4">
              <div className="w-1/3">
                <div className="flex items-center mb-1">
                  <p className="text-xl font-semibold">{name}</p>
                  <Link to={`/newPetForm/${_id}`}>
                    <p className="ml-2">⚙</p>
                  </Link>
                </div>
                <div className="text-sm">
                  <p>{type}</p>
                  <p>{breed}</p>
                  <p>{sex}</p>
                  <p>{age} años</p>
                </div>
              </div>
              <p className="w-2/3 ml-5 mt-8 truncate text-gray-600 text-base leading-tight">
                {description}
              </p>
            </div>
            <div className="flex justify-end py-2 border-t-2 bg-gray-200 overflow-hidden ">
              {isLostState ? (
                <div className="mr-5">
                  <button
                    onClick={handlesubmit}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Me encontraron
                  </button>
                </div>
              ) : (
                <div className="mr-5">
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
      ) : (
        <div className="flex w-full h-56 mb-4 px-4 ">
          <img
            src={img}
            alt=""
            className="w-1/3 h-full object-cover rounded-l-lg shadow-lg "
          />
          <div className="flex flex-col w-2/3 overflow-hidden rounded-r-lg shadow-lg text-gray-700 bg-gray-100 justify-between">
            <div className="flex p-5">
              <div className="w-1/3">
                <div className="flex items-center mb-1">
                  <p className="text-3xl font-semibold">{name}</p>
                  <Link to={`/newPetForm/${_id}`}>
                    <p className="ml-2">⚙</p>
                  </Link>
                </div>

                <p className="text-sm">
                  {type} • {breed}{" "}
                </p>
                <p className="text-sm mb-3">
                  {sex} de {age} {age === 1 ? "año" : "años"} de edad{" "}
                </p>
              </div>
              <p className="w-2/3 ml-3 mt-2 break-words text-gray-600 text-base leading-tight">
                {description}
              </p>
            </div>
            <div className="flex justify-end py-2 border-t-2 bg-gray-200 overflow-hidden ">
              {isLostState ? (
                <div className="mr-5">
                  <button
                    onClick={handlesubmit}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Me encontraron
                  </button>
                </div>
              ) : (
                <div className="mr-5">
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
      )}
    </React.Fragment>
    // <div className="flex w-full h-40 lg:h-48 mb-4 px-4">
    //   <img src={img} alt="" className="w-1/3 object-cover rounded-l-lg shadow-lg" />
    //   <div className="flex flex-col w-2/3 rounded-r-lg overflow-hidden shadow-lg">
    //     <div className="bg-gray-100 h-full w-full p-2">
    //       <div className="flex items-center mb-1">
    //         <p className="text-xl text-gray-700 font-semibold">{name}</p>
    //         <Link to={`/newPetForm/${_id}`}>
    //           <p className="ml-2">⚙</p>
    //         </Link>
    //       </div>

    //       <div className="flex justify-between">
    //         <div className="w-1/3">
    //           <p className="text-sm text-gray-600">
    //             {type} • {breed}
    //           </p>

    //           <p className="text-sm text-gray-600">{age} años de edad</p>
    //         </div>
    //         <p className="w-2/3 truncate break-all overflow-hidden text-sm text-gray-600">
    //           {description}
    //         </p>
    //       </div>
    //     </div>

    //     <div className="flex h-full bg-gray-100 w-full p-2 justify-end items-end">
    //       {isLostState ? (
    //         <div className=" ">
    //           <button
    //             onClick={handlesubmit}
    //             className="bg-green-600 text-white font-bold py-2 px-4 rounded"
    //           >
    //             Me encontraron
    //           </button>
    //         </div>
    //       ) : (
    //         <div className="flex justify-between items-center">
    //           <Link className="w-full" to={`/lostPetForm/${_id}`}>
    //             <button className="bg-red text-white font-bold py-2 px-4 rounded">
    //               Me perdí
    //             </button>
    //           </Link>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminPetCard;
