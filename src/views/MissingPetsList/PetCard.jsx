import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";

const PetCard = ({ info }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    img,
    sex,
    date,
    description,
    age,
    location,
    breed,
    type,
    name,
  } = info;

  const cardStyle = {
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
  };

  const modalStyle = {
    content: {
      position: "absolute",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      border: "1px solid rgb(204, 204, 204)",
      background: "rgb(255, 255, 255)",
      overflow: "auto",
      borderRadius: "4px",
      outline: "none",
      padding: "0px",
    },
  };

  const howManydaysPassed = (date) => {
    return moment(date, "YYYYMMDD").fromNow();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-6">
      <div className="flex items-center">
        <img
          onClick={openModal}
          style={{ borderRadius: "1rem" }}
          className="h-48 w-40 shadow-lg"
          src={img}
        />
        <div
          style={cardStyle}
          className="flex flex-col justify-around shadow-md p-5 bg-white w-full h-40"
        >
          <h1 className="text-lg">{name}</h1>
          <p>{breed}</p>
          <p>{age} años de edad</p>
          <p>{howManydaysPassed(date)}</p>
        </div>
      </div>

      <Modal
        style={modalStyle}
        onRequestClose={closeModal}
        isOpen={isModalOpen}
      >
        <div className="flex flex-col h-full">
          <div className="min-w-0">
            <div className="relative">
              <img style={{ height: "23rem" }} className="w-full" src={img} />
              <div className="h-20 w-full mx-12 bg-red-200 absolute  -mb-10">

              </div>
            </div>
            <div className="mt-12">
              <div className="px-4 py-3">
                <div className="flex flex-row justify-between">
                  <div className="text-gray-700 text-xl">{date}</div>
                  <div className="text-gray-700 text-xl">{breed}</div>
                </div>
                <p className="text-gray-700 text-base">{description}</p>
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
    </div>
  );
};

export default PetCard;
