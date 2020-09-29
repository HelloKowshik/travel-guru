import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
    const APP_KEY = 'AIzaSyClIWsgWM2_ArBrugaeuz8IWPeE2LhiTEk';
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 21.4272, lng: 92.0058
  }
  
  return (
     <LoadScript
       googleMapsApiKey={APP_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default MapContainer;