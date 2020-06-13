import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";

import LossesPets from "../../fakeLosses.json";
import Pets from "../../fakePets.json";

import Modal from "react-modal";

Modal.setAppElement("#root");
const Index = () => {
  const [missingPets, setMissingPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalStyle = {
    content: {
      position: "absolute",
      top: "30px",
      left: "25px",
      right: "25px",
      bottom: "30px",
      border: "1px solid rgb(204, 204, 204)",
      background: "rgb(255, 255, 255)",
      overflow: "auto",
      borderRadius: "4px",
      outline: "none",
      padding: "0px",
    },
  };

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

  const openModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPet({});
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Lista de mascotas perdidas</h1>

      <Modal
        style={modalStyle}
        onRequestClose={closeModal}
        isOpen={isModalOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-row items-center justify-between my-2 mx-2">
            <h1 className="text-gray-700 text-xl">{selectedPet.name}</h1>
            <button
              className="rounded-full text-center bg-indigo-500 uppercase px-2 py-1 text-xs font-bold "
              onClick={closeModal}
            >
              X
            </button>
          </div>

          <div className="min-w-0">
            <img className="w-full h-64" src={selectedPet.img} />

            <div className="">
              <div className="px-4 py-3">
                <div className="flex flex-row justify-between">
                  <div className="text-gray-700 text-xl">
                    {selectedPet.date}
                  </div>
                  <div className="text-gray-700 text-xl">
                    {selectedPet.breed}
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  {selectedPet.description}
                </p>
              </div>
              <div
                style={{ borderborderColor: "#e0e0e0" }}
                className="mx-4 my-2 border-b"
              ></div>
              <div className="px-6 py-3">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  #photography
                </span>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </Modal>

      {missingPets.map((pet) => (
        <PetCard key={pet._id} info={pet} oModal={openModal} />
      ))}
    </div>
  );
};

export default Index;
