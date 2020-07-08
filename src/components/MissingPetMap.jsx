import React, { useState, useEffect } from "react";
import personIcon from "./person.png";
import petIcon from "./pet.png";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const options = {
  disableDefaultUI: true,
};

const Tucuman = {
  lat: -26.8241405,
  lng: -65.2226028,
};

const Map = ({ user, pets }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDtAaoe-ahjqCGCMM7kMZ9qxDryQ2b2GHQ",
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  else
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options}
        center={Tucuman}
        zoom={14}
      >
        <Marker
          position={user}
          icon={{
            url: personIcon,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0.0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />

        {pets.map((pet) => (
          <Marker
            key={pet._id}
            position={{
              lat: parseFloat(pet.location.lat),
              lng: parseFloat(pet.location.lng),
            }}
            icon={{
              url: petIcon,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0.0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ))}
      </GoogleMap>
    );
};

export default Map;
