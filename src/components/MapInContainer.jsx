import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import Modal from "react-modal";

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
      <Modal
        onRequestClose={closeModal}
        isOpen={isModalOpen}
        className="overflow-hidden"
      >
        <div className="flex flex-col realtive">
          <button onClick={closeModal} className="absolute z-40">
            X
          </button>

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

          <button
            onClick={aceptMapPosition}
            style={mapButtonStyle}
            className="w-40 absolute z-40 bottom-0 hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    );
};

export default Map;
