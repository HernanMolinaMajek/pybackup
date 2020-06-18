import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
 
const containerStyle = {
  width: '100%',
  height: '90vh'
};
 
const center = {
  lat: -3.745,
  lng: -38.523
};
 

const Map = () => {
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDtAaoe-ahjqCGCMM7kMZ9qxDryQ2b2GHQ"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(Map)