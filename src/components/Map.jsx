import React, { useState } from "react";
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
  gestureHandling: "greedy",
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
    setCenter(position)
    setMapPosition(position);
  };

  if (loadError)
    return (
      <h1 className="flex h-full justify-center text-2xl items-center text-red-400 font-bold">
        Error al cargar el mapa
      </h1>
    );
  if (!isLoaded)
    return (
      <h1 className="flex h-full justify-center text-2xl items-center text-red-400 font-bold">
        Cargando!
      </h1>
    );
  else
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options}
        //center={center}
        center={{ lat: parseFloat(center.lat), lng: parseFloat(center.lng) }}
        zoom={14}
        onClick={(event) => {
          onCLickHandle(event);
        }}
      >
        <Marker
          //position={dot}
          position={{ lat: parseFloat(dot.lat), lng: parseFloat(dot.lng) }}
          icon={{
            url: circleOn ? petIcon : personIcon,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0.0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        {circleOn ? (
          <Circle
            center={{ lat: parseFloat(dot.lat), lng: parseFloat(dot.lng) }}
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
