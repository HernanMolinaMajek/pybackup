import React, { useState, useEffect } from "react";
import fakeOwners from "./fakeOwners.json";
import PetAdmin from "./views/PetsAdmin/Index";
import NavBar from "./components/NavBar"
import Home from "./views/Home/Index"
import List from "./views/MissingPetsList/Index"
 
const App = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    setOwnerInfo(2);
  }, []);

  const getLoggedUser = (userId) => {
    return fakeOwners.find((owner) => owner._id === userId);
  };

  const setOwnerInfo = (userId) => {
    setUser(getLoggedUser(userId));
  };

  return <div>
    
    <NavBar user={user}/>
    
    <List/>
 
  </div>
    
};

export default App;
