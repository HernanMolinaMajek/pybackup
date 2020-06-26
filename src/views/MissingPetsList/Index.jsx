import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";
import nothing from "./nothing.png";
import PetCard from "./PetCard";

const Index = ({ userLocation, match }) => {
  const [missingPets, setMissingPets] = useState([]);

  useEffect(() => {
    //setPets();
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
  }, []);

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

      {missingPets.length > 0 ? (
        missingPets.map((pet) => <PetCard key={pet._id} info={pet} />)
      ) : (
        <div style={fondoStyle} className="">
          <h1 className="px-4 text-3xl lg:px-0 text-center font-medium text-gray-800 leading-none lg:text-left lg:text-6xl ">
            No hay mascotas perdidas!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Index;
