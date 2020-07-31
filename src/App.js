import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./views/Home/Index";
import MissingPets from "./views/MissingPetsList/Index";
import Register from "./views/RegisterForm/Index";
import LoginForm from "./views/LogIn/Index";
import PetAdmin from "./views/PetsAdmin/Index";
import NewPetForm from "./views/NewPetForm/Index";
import LostPetForm from "./views/LostPetForm/Index";
import NotFound from "./components/NotFound";


const App = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser !== null) {
      setUser(loggedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const setUserLocationInMap = (position) => {
    setUserLocation(position);
  };

  const logOut = () => {
    setUser({});
    setIsAuthenticated(false);
    localStorage.clear();
  };

  const logIn = (user) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: user._id,
        name: user.name,
        phone: user.phone,
      })
    );
  };

  return (
    <div>
      <Router>
        <NavBar
          userName={user.name}
          authenticated={isAuthenticated}
          setUserLocationInMap={setUserLocationInMap}
          logOut={logOut}
        />
        <div className="lg:px-32">
          <Switch>
            
            <Route exact path="/" component={Home} />

            <Route
              path="/login"
              render={(props) => <LoginForm {...props} logIn={logIn} />}
            />

            <Route
              path="/register"
              render={(props) => <Register {...props} logIn={logIn} />}
            />

            <Route
              path="/petadmin"
              render={(props) => (
                <PetAdmin {...props} key={String(props)} user={user} />
              )}
            />

            <Route path="/lostPetForm/:id" component={LostPetForm} />

            <Route
              exact
              path="/newPetForm"
              render={(props) => <NewPetForm {...props} user={user} />}
            />

            <Route
              path="/newPetForm/:id"
              render={(props) => <NewPetForm {...props} user={user} />}
            />

            <Route
              path="/missingPets"
              render={(props) => (
                <MissingPets
                  {...props}
                  key={String(userLocation.lat)}
                  userLocation={userLocation}
                />
              )}
            />

            <Route component={NotFound} />

          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
