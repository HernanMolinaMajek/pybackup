import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouting";

import fakeOwners from "./fakeOwners.json";

import NavBar from "./components/NavBar";
import Home from "./views/Home/Index";
import MissingPets from "./views/MissingPetsList/Index";
import Register from "./views/RegisterForm/Index";
import LoginForm from "./views/LogIn/Index";
import UserAdmin from "./views/userAdmin/Index";
import PetAdmin from "./views/PetsAdmin/Index";
import NewPetForm from "./views/NewPetForm/Index";
import LostPetForm from "./views/LostPetForm/Index";
import NotFound from "./components/NotFound"

import { AnimatedRoutes, RouteTransition } from "./animation/RouteTransition";

const App = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLocation, setUserLocation] = useState({});

  // useEffect(() => {
  //   //logIn("5eec80512b936e1d570669dd");
  //   //setUserLocation({ lat: -26.8283728, lng: -65.2224645 });
  // }, []);

  useEffect(() => {
    //setUser(JSON.parse(localStorage.getItem('user')))
    let loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser !== null) {
      setUser(loggedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const setUserLocationInMap = (position) => {
    localStorage.setItem("userLocation", JSON.stringify(userLocation));

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
    <div className="">
      <Router>
        <NavBar
          userName={user.name}
          authenticated={isAuthenticated}
          setUserLocationInMap={setUserLocationInMap}
          logOut={logOut}
        />

        <div className="lg:px-32">
          <Switch>
            {/* <AnimatedRoutes exitBeforeEnter initial={false}>
            <RouteTransition exact path="/">
              <Home setUserLocationInMap={setUserLocationInMap} />
            </RouteTransition>
            <RouteTransition path="/login">
              <LoginForm logIn={logIn} />
            </RouteTransition>
            <RouteTransition path="/register">
              <Register logIn={logIn} />
            </RouteTransition>
            <RouteTransition path="/petadmin">
              <PetAdmin user={user} />
            </RouteTransition>
            <RouteTransition path="/lostPetForm/:id">
              <LostPetForm />
            </RouteTransition>

            <RouteTransition exact path="/newPetForm">
              <NewPetForm user={user} />
            </RouteTransition>

            <RouteTransition path="/newPetForm/:id">
              <NewPetForm user={user} />
            </RouteTransition>
            
            <RouteTransition path="/missingPets">
              <MissingPets userLocation={userLocation} />
            </RouteTransition>  */}

            <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} setUserLocationInMap={setUserLocationInMap} />
              )}
            />

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
              render={(props) => <PetAdmin {...props} user={user} />}
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
                <MissingPets {...props} userLocation={userLocation} />
              )}
            />

            <Route component={NotFound} />
            {/* </AnimatedRoutes> */}
          </Switch>
        </div>
      </Router>

      {/* <Router>
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
      </Router> */}
    </div>
  );
};

export default App;
