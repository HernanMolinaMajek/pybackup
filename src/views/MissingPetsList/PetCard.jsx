import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import Map from "../../components/Map";

Modal.setAppElement("#root");
const PetCard = ({ info }) => {
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [petSigth, setPetSigth] = useState({});

  console.log(info)
  const { distance ,date} = info;
  const { name:ownerName, phone } = info._ownerId;
  const { age, breed, description, img, name, sex, type } = info._petId;

  const setMapPosition = (position) => {
    setPetSigth(position);
  };

  const cardStyle = {
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
  };

  const mapButtonStyle = {
    backgroundColor: "#306060",

    borderTopRightRadius: "1rem",
  };
  const buttonStyle = {
    backgroundColor: "#306060",
    borderRadius: "1rem",
  };
  const cardInModalStyle = {
    borderRadius: "1.5rem",
  };
  const modalStyle = {
    content: {
      position: "absolute",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      // border: "1px solid rgb(204, 204, 204)",
      // background: "rgb(255, 255, 255)",
      overflow: "auto",
      //borderRadius: "0px",
      outline: "none",
      padding: "0px",
    },
  };

  const mapModalStyle = {
    content: {
      //position: "absolute",
      // top: "0px",
      // left: "0px",
      // right: "0px",
      // bottom: "0px",
      // // border: "1px solid rgb(204, 204, 204)",
      // background: "rgb(255, 255, 255)",
      overflow: "auto",
      //borderRadius: "0px",
      outline: "none",
      padding: "0px",
    },
  };

  const convertToKm = (m) => {
    return (m / 1000).toFixed(2);
  };

  const howManydaysPassed = (date) => {
    return moment(date, "YYYYMMDD").fromNow();
  };

  const openPetModal = () => {
    document.body.style.overflow = "hidden";
    setIsPetModalOpen(true);
  };
  const closePetModal = () => {
    document.body.style.overflow = "unset";
    setIsPetModalOpen(false);
  };
  const openMapModal = () => {
    setIsMapModalOpen(true);
  };
  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  return (
    <div className="my-6">
      <div className="flex items-center">
        <img
          onClick={openPetModal}
          style={{ borderRadius: "1rem" }}
          className="h-48 w-40 shadow-lg"
          src={img}
        />
        <div
          style={cardStyle}
          className="flex flex-col justify-around shadow-md p-5 bg-white w-full h-40"
        >
          <h1 className="text-lg">{name}</h1>
          <p>{convertToKm(distance)} kilometros</p>
          <p>{breed}</p>
          <p>{age} años</p>
          <p>{howManydaysPassed(date)}</p>
        </div>
      </div>

      <Modal
        style={modalStyle}
        onRequestClose={closePetModal}
        isOpen={isPetModalOpen}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="min-w-0">
            <div className="flex flex-col items-center relative">
              <img style={{ height: "23rem" }} className="w-full" src={img} />

              <button
                onClick={closePetModal}
                className="absolute top-0 left-0 bg-white rounded-full py-2 px-2 m-2"
              >
                X
              </button>
              <div
                style={cardInModalStyle}
                className="flex flex-col text-gray-700 py-3 px-5 w-11/12 bg-white absolute bottom-0 -mb-12 shadow-lg"
              >
                <div className="flex flex-row justify-between">
                  <p className="text-xl text-gray-700 font-semibold">{name}</p>
                  <p className="">{sex}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-sm text-gray-600">{breed}</p>
                  <p className="text-sm text-gray-600">{age} años de edad</p>
                </div>
                <p className="text-base text-gray-600">
                  a {convertToKm(distance)} kilometros
                </p>
              </div>
            </div>
            <div className="px-4 py-3 mt-12 text-gray-700">
              <div className="flex flex-row items-center justify-between mb-1">
                <h1 className="text-xl text-gray-700 font-semibold">
                  Descripcion
                </h1>
                <p className="text-sm text-gray-600">{type}</p>
              </div>
              <p className="text-base text-gray-600 leading-tight">
                {description}
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#F6F6F6",
              borderTopLeftRadius: "2.5rem",
              borderTopRightRadius: "2.5rem",
            }}
            className="flex flex-col justify-center text-gray-700 w-full pt-1 pb-3"
          >
            <div className="mt-2 mx-4 mt-5 flex flex-col ml-6">
              <h1 className="text-xl text-gray-700 font-semibold -mb-1">
                {ownerName}
              </h1>
              <p className="text-xs text-gray-600">Dueño</p>
            </div>
            <div className="mt-2 mx-4 flex flex-row items-center justify-between">
              <button
                onClick={openMapModal}
                style={buttonStyle}
                className="w-1/3 hover:bg-blue-700 text-gray-100 text-lg font-medium py-3  mr-5 shadow-lg focus:outline-none focus:shadow-outline"
                type="button"
              >
                ojo
              </button>
              <button
                style={buttonStyle}
                className="w-2/3 hover:bg-blue-700 text-gray-200 text-lg font-medium py-3 shadow-lg focus:outline-none focus:shadow-outline"
                type="button"
              >
                {phone}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        onRequestClose={closeMapModal}
        isOpen={isMapModalOpen}
        className="overflow-hidden"
      >
        <div className="flex flex-col realtive">
          <button onClick={closeMapModal} className="absolute z-40">
            X
          </button>
          <Map setMapPosition={setMapPosition} circleOn={false} />

          <button
            style={mapButtonStyle}
            className="w-40 absolute z-40 bottom-0 hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PetCard;
