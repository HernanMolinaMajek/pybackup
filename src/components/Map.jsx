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
  height: "100%",
};

const options = {
  disableDefaultUI: true,
};

const Tucuman = {
  lat: -26.8241405,
  lng: -65.2226028,
};

const Map = ({ setMapPosition, circleOn }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDtAaoe-ahjqCGCMM7kMZ9qxDryQ2b2GHQ",
  });
  const [dot, setDot] = useState({});
  const [center, setCenter] = useState(Tucuman);
  
  const onCLickHandle = (event) => {
    let position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setDot(position);
    setMapPosition(position);
    //setCenter(position)
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  else
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options}
        center={center}
        zoom={14}
        onClick={(event) => {
          //setDot({lat:event.latLng.lat(),lng:event.latLng.lng()})
          onCLickHandle(event);
        }}
      >
        <Marker
          position={dot}
          icon={{
            url: circleOn ? petIcon : personIcon,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0.0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        {circleOn ? (
          <Circle
            center={dot}
            radius={300}
            options={{
              fillColor: "#ff5656",
              strokeColor: "#ff5656",
            }}
          />
        ) : null}
      </GoogleMap>
    );
};

export default Map;
