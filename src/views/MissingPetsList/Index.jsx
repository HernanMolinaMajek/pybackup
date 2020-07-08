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

    console.log(userLocation);
    if (Object.entries(userLocation).length !== 0) {
      orderAndSetMisingPetList();
      console.log("entre por user location");
    } else if (Object.entries(loggedUserLocation).length !== 0) {
      orderAndSetMisingPetList();
      console.log("entre por storage");
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
      console.log(pets);
      setMissingPets(orderedList);
    });
  };

  const getMissingPets = async () => {
    const response = await fetch("http://localhost:3030/api/lost");
    const data = await response.json();
    //console.log(data.Lost);
    return data.Lost;
  };

  // const orderListOfPets = () => {
  //   let orderedList = missingPets.sort((a, b) => a.distance > b.distance ? 1 : -1);

  //   setMissingPets(orderedList);
  // };

  // const algo = () => {

  //   setPets()

  //   orderListOfPets()
  // };

  // const setPets = () => {
  //   // let ListOfLossesPetsId2 = LossesPets.map((lp) => {
  //   //   return { _petId: lp._petId, date: lp.date, location: lp.location };
  //   // });

  //   let ListOfLossesPetsData2 = LossesPets.map((pet) => {
  //     let petInfo = Pets.find((p) => p._id === pet._petId);
  //     let ownerInfo = Owners.find((o) => o._id === pet._ownerId);

  //     if (petInfo && ownerInfo) {
  //       pet["_id"] = petInfo._id;
  //       pet["name"] = petInfo.name;
  //       pet["img"] = petInfo.img;
  //       pet["sex"] = petInfo.sex;
  //       pet["age"] = petInfo.age;
  //       pet["type"] = petInfo.type;
  //       pet["breed"] = petInfo.breed;
  //       pet["description"] = petInfo.description;
  //       pet["distance"] = getDistance(userLocation, pet.location);

  //       pet["ownerName"] = ownerInfo.name;
  //       pet["phone"] = ownerInfo.phone;
  //       pet["email"] = ownerInfo.email;
  //     }

  //     return pet;
  //   });
  //   // let ListOfLossesPetsId = LossesPets.map((lp) => lp._petId);
  //   // let LstOfLossesPetsData = Pets.filter((pet) =>
  //   //   ListOfLossesPetsId.includes(pet._id)
  //   // );
  //   let orderedList = ListOfLossesPetsData2.sort((a, b) =>
  //     a.distance > b.distance ? 1 : -1
  //   );

  //   setMissingPets(orderedList);
  // };
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
      {/* <div className="w-full">
        <div className="relative">
          <select
            style={{ borderRadius: "1rem" }}
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
      </div> */}


      {/* boton de mascotas tiene que ser fix */}
      {/* <button
        onClick={openModal}
        className="bg-white text-link font-bold py-2 px-4 rounded w-1/3 mx-2"
      >
        Cerrar
      </button> */}

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
        <div className="flex flex-col realtive">
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
          {/* <button
            onClick={aceptMapPosition}
            style={mapButtonStyle}
            className="w-40 absolute z-40 bottom-0 hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Aceptar
          </button> */}
        </div>
      </Modal>
    </div>
  );
};

export default Index;
