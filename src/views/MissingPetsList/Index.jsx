import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";

import LossesPets from "../../fakeLosses.json";
import Pets from "../../fakePets.json";

import Modal from "react-modal";

Modal.setAppElement("#root");
const Index = () => {
  const [missingPets, setMissingPets] = useState([]);
  

  useEffect(() => {
    setPets();
  }, []);

  const setPets = () => {
    let ListOfLossesPetsId2 = LossesPets.map((lp) => {
      return { _petId: lp._petId, date: lp.date, location: lp.location };
    });

    let LstOfLossesPetsData2 = ListOfLossesPetsId2.map((pet) => {
      let aux = Pets.find((p) => p._id === pet._petId);
      if (aux) {
        pet["_id"] = aux._id;
        pet["name"] = aux.name;
        pet["img"] = aux.img;
        pet["sex"] = aux.sex;
        pet["age"] = aux.age;
        pet["type"] = aux.type;
        pet["breed"] = aux.breed;
        pet["description"] = aux.description;
      }
      return pet;
    });
    // let ListOfLossesPetsId = LossesPets.map((lp) => lp._petId);
    // let LstOfLossesPetsData = Pets.filter((pet) =>
    //   ListOfLossesPetsId.includes(pet._id)
    // );
    setMissingPets(LstOfLossesPetsData2);
  };

  
  return (
    <div
      style={{
        backgroundColor: "#F6F6F6",
        borderTopLeftRadius: "2.5rem",
        borderTopRightRadius: "2.5rem",
      }}
      className="h-full px-6 pt-10"
    >
      <div className="w-full">
        <div className="relative">
          <select
            style={{borderRadius:"1rem"}}
            className="block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Todos</option>
            <option>Perro</option>
            <option>Gato</option>
            <option>Otros</option>
          </select>
          
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      
      {missingPets.map((pet) => (
        <PetCard key={pet._id} info={pet} />
       ))}
    </div>
  );
};

export default Index;
