import React, { useState } from "react";
import "./GoogleMaps.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { Descriptions } from "antd";
import AutoComplete from "react-google-autocomplete";

const GoogleMaps = () => {
  const [address, setAddress] = useState(
    "433 Boulevard Saint-Joseph Est, Montréal, QC H2J 1J6, Canada"
  );
  const [city, setCity] = useState("Communauté-Urbaine-de-Montréal");
  const [area, setArea] = useState("Montréal");
  const [state, setState] = useState("Québec");
  const [mapPosition, setMapPosition] = useState({
    lat: 45.526705905197375,
    lng: -73.58763602457086,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 45.526705905197375,
    lng: -73.58763602457086,
  });
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  Geocode.setApiKey(API_KEY);

  const getCity = (addressArray) => {
    let city = "";
    for (let index = 0; index < addressArray.length; index++) {
      if (
        addressArray[index].types[0] &&
        "administrative_area_level_2" === addressArray[index].types[0]
      ) {
        city = addressArray[index].long_name;
      }
    }
    return city;
  };

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
          }
        }
      }
    }
    return area;
  };

  const getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
        }
      }
    }
    return state;
  };

  const onMarkerDragEnd = (e) => {
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const address = response?.results[0]?.formatted_address,
        addressArray = response?.results[0]?.address_components;
      setAddress(address);
      setCity(getCity(addressArray));
      setArea(getArea(addressArray));
      setState(getState(addressArray));
      setMarkerPosition({ lat: newLat, lng: newLng });
      setMapPosition({ lat: newLat, lng: newLng });
    });
  };

  const onPlaceSelected = (place) => {
    if (place.formatted_address) {
      let newLat = place?.geometry?.location?.lat();
      let newLng = place?.geometry?.location?.lng();
      const address = place?.formatted_address,
        addressArray = place?.address_components;
      setAddress(address);
      setCity(getCity(addressArray));
      setArea(getArea(addressArray));
      setState(getState(addressArray));
      setMarkerPosition({ lat: newLat, lng: newLng });
      setMapPosition({ lat: newLat, lng: newLng });
    }
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
      >
        <Marker
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
        />
        <AutoComplete
          style={{
            width: "100%",
            height: "40px",
            paddingLeft: 16,
            marginTop: 2,
            marginBottom: "2rem",
          }}
          placeholder={"Entrez une adresse"}
          types={["regions"]}
          onPlaceSelected={onPlaceSelected}
          apiKey={API_KEY}
        />
      </GoogleMap>
    ))
  );

  return (
    <div>
      <Descriptions bordered>
        <Descriptions.Item label="Ville">{city}</Descriptions.Item>
        <Descriptions.Item label="Région">{area}</Descriptions.Item>
        <Descriptions.Item label="État">{state}</Descriptions.Item>
        <Descriptions.Item label="Adresse">{address}</Descriptions.Item>
        <Descriptions.Item label="Latitude">
          {markerPosition.lat}
        </Descriptions.Item>
        <Descriptions.Item label="Longitude">
          {markerPosition.lng}
        </Descriptions.Item>
      </Descriptions>
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default GoogleMaps;
