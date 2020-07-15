import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";
import nothing from "./nothing2.png";
import PetCard from "./PetCard";
import Modal from "react-modal";
import Map from "../../components/MissingPetMap";

const Index = ({ userLocation, match }) => {
  const [missingPets, setMissingPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let loggedUserLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (loggedUserLocation === null) loggedUserLocation = {};

    if (Object.entries(userLocation).length !== 0) {
      orderAndSetMisingPetList();
    } else if (Object.entries(loggedUserLocation).length !== 0) {
      orderAndSetMisingPetList();
    }
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
    });
  };

  const getMissingPets = async () => {
    const response = await fetch("http://localhost:3030/api/lost");
    const data = await response.json();

    return data.Lost;
  };

  const fondoStyle = {
    backgroundImage: `url(${nothing})`,
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
      <button
        onClick={openModal}
        className="text-6xl leading-none fixed bottom-0 right-0 mb-3 mr-3 lg:mr-10 lg:mb-10"
      >
        🗺
      </button>

      {missingPets.length > 0 ? (
        missingPets.map((pet) => <PetCard key={pet._id} info={pet} />)
      ) : (
        <div style={fondoStyle} className="">
          <h1 className="px-4 text-3xl lg:px-0 text-center font-medium text-gray-800 leading-none lg:text-left lg:text-6xl ">
            No hay mascotas perdidas!
          </h1>
        </div>
      )}

      <Modal
        onRequestClose={closeModal}
        isOpen={isModalOpen}
        style={isClientMobile() ? modalSmStyle : modalStyle}
      >
        <div className="flex flex-col realtive w-full h-full ">
          <Map user={userLocation} pets={missingPets} />

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
