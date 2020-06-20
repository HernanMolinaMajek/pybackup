import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouting";

import fakeOwners from "./fakeOwners.json";

import NavBar from "./components/NavBar";
import Home from "./views/Home/Index";
import List from "./views/MissingPetsList/Index";
import Register from "./views/RegisterForm/Index";
import LogIn from "./views/LogIn/Index";
import UserAdmin from "./views/userAdmin/Index";
import PetAdmin from "./views/PetsAdmin/Index";
import New from "./views/NewPetForm/Index"
import LostPetForm from "./views/LostPetForm/Index";

const App = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    logIn(0);
    //setUserLocation({ lat: -26.8283728, lng: -65.2224645 });
  }, []);

  const setUserLocationInMap = (position) => {
    setUserLocation(position);
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setUser({});
  };
  const logIn = (userId) => { 
    setIsAuthenticated(true);
    setOwnerInfo(userId);
  };

  const getLoggedUser = (userId) => {
    return fakeOwners.find((owner) => owner._id === userId);
  };

  const setOwnerInfo = (userId) => {
    setUser(getLoggedUser(userId));
  };

  return (
    <div className="bg-white">
      <Router>
        <NavBar
          userName={user.name}
          authenticated={isAuthenticated}
          logOut={logOut}
        />

        <Switch>
          <Route exact path="/">
            <Home setUserLocationInMap={setUserLocationInMap} />
            
          </Route>

          <Route exact path="/a">
            <LostPetForm />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <LogIn />
          </Route>

          <PrivateRoute authenticated={isAuthenticated} path="/userAdmin">
            <UserAdmin user={user} />
          </PrivateRoute>

          <PrivateRoute authenticated={isAuthenticated} path="/petAdmin">
            <PetAdmin user={user} />
          </PrivateRoute>

          <PrivateRoute authenticated={isAuthenticated} path="/lostPetForm">
            <LostPetForm />
          </PrivateRoute>


          <PrivateRoute authenticated={isAuthenticated} path="/newPetForm">
            <New user={user}  />
          </PrivateRoute>



          <Route path="/missingPets">
            <List userLocation={userLocation} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
