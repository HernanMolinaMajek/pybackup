import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
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
        center={{lat:center.lat,lng:center.lng}}
        zoom={14}
        onClick={(event) => {
          //setDot({lat:event.latLng.lat(),lng:event.latLng.lng()})
          onCLickHandle(event);
        }}
      >
        <Marker position={dot} />
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
