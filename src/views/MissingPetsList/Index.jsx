import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";
import Modal from "react-modal";
import Map from "../../components/MissingPetMap";
import PetCard from "./PetCard";
import noPositionImg from "./noPosition.png";
import nothingImg from "./nothing2.png";

const Index = ({ userLocation, match }) => {
  const [missingPets, setMissingPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    orderAndSetMisingPetList();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isClientMobile = () => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      return true;
    } else return false;
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;

    switch (value) {
      case "Todos": {
        setFilteredList(missingPets);
        break;
      }
      case "Perros": {
        setFilteredList(filterPetByType(missingPets, "Perro"));
        break;
      }
      case "Gatos": {
        setFilteredList(filterPetByType(missingPets, "Gato"));
        break;
      }
      case "Otros": {
        setFilteredList(filterPetByType(missingPets, "Otro"));
        break;
      }
    }
  };

  const filterPetByType = (array, type) => {
    return array.filter((pet) => pet._petId.type === type);
  };

  const orderAndSetMisingPetList = () => {
    getMissingPets().then((pets) => {
      let pe = pets.map((mp) => {
        let parsedPosition = {
          lat: parseFloat(mp.location.lat),
          lng: parseFloat(mp.location.lng),
        };
        mp["distance"] = getDistance(userLocation, parsedPosition);
        return mp;
      });

      let orderedList = pe.sort((a, b) => (a.distance > b.distance ? 1 : -1));

      setMissingPets(orderedList);
      setFilteredList(orderedList);
    });
  };

  const getMissingPets = async () => {
    const response = await fetch("http://localhost:3030/api/lost");
    const data = await response.json();
    return data.Lost;
  };

  const noPetImgStyle = {
    backgroundImage: `url(${nothingImg})`,
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const noPositionImgStyle = {
    backgroundImage: `url(${noPositionImg})`,
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const modalStyle = {
    content: {
      position: "absolute",
      top: "5rem",
      left: "12rem",
      right: "12rem",
      bottom: "5rem",
      overflow: "hidden",
      padding: "0px",
    },
  };

  const modalSmStyle = {
    content: {
      position: "absolute",
      top: "0rem",
      left: "0rem",
      right: "0rem",
      bottom: "0rem",
      overflow: "hidden",
      padding: "0px",
    },
  };
  return (
    <div className="mx-6">
      {Object.entries(userLocation).length !== 0 && missingPets.length > 0 ? (
        <button
          onClick={openModal}
          className="text-5xl leading-none fixed bottom-0 right-0 mb-3 mr-3 lg:mr-10 lg:mb-10"
        >
          🗺
        </button>
      ) : null}

      {Object.entries(userLocation).length !== 0 ? (
        missingPets.length > 0 ? (
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="type"
            >
              Filtrar por tipo
            </label>
            <div className="relative">
              <select
                onChange={onHandleChange}
                noValidate
                // style={inputStyle}
                className="appearance-none border bg-white rounded-sm h-12 w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none"
                name="type"
              >
                <option>Todos</option>
                <option>Perros</option>
                <option>Gatos</option>
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
            {filteredList.map((pet) => (
              <PetCard key={pet._id} info={pet} />
            ))}
          </div>
        ) : (
          <div style={noPetImgStyle}>
            <h1 className="px-4 text-3xl lg:px-0 text-center font-medium text-gray-800 leading-none lg:text-left lg:text-6xl ">
              No hay mascotas perdidas!
            </h1>
          </div>
        )
      ) : (
        <div style={noPositionImgStyle}>
          <h1 className="px-4 text-3xl lg:px-0 text-center font-medium text-gray-800 leading-none lg:text-left lg:text-6xl ">
            Por favor seleccione una posición
          </h1>
        </div>
      )}

      <Modal
        onRequestClose={closeModal}
        isOpen={isModalOpen}
        style={isClientMobile() ? modalSmStyle : modalStyle}
      >
        <div className="flex flex-col realtive w-full h-full ">
          <Map user={userLocation} pets={filteredList} />

          <div className="bg-orange w-full h-20 z-40 absolute bottom-0">
            <div className="flex flex-row  p-5 items-center  font-medium">
              <button
                onClick={closeModal}
                className="bg-white text-link font-bold py-2 px-4 rounded w-1/3 mx-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Index;
