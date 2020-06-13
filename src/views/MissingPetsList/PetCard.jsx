import React, { useState } from "react";
import Modal from "react-modal";


const PetCard = ({ info,oModal }) => {
  const {img, sex, date, description, age, location, breed, type, name } = info;


  return (
    <div className="my-5">
      {name}
      
      <button className="mx-5 lg:hidden" onClick={()=> oModal(info)}>
        (+)
      </button>
     
    </div>
  );
};

export default PetCard;
