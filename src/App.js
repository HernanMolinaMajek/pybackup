import React, { useState, useEffect } from "react";
import fakeOwners from "./fakeOwners.json";
import PetAdmin from "./views/PetsAdmin/Index";
import NavBar from "./components/NavBar";
import Home from "./views/Home/Index";
import List from "./views/MissingPetsList/Index";
import Map from "./components/Map"


const sightings = [
  {
    lat: -26.8241405,
    lng: -65.2226028
  },
];

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setOwnerInfo(2);
  }, []);

  const getLoggedUser = (userId) => {
    return fakeOwners.find((owner) => owner._id === userId);
  };

  const setOwnerInfo = (userId) => {
    setUser(getLoggedUser(userId));
  };

  return (
    <div className="bg-white">
      <NavBar user={user} />

      <Map/>
    
    </div>
  );
};

export default App;
