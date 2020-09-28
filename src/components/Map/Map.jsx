import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from '../../mapStyles';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 43.653225,
  lng: -79.383186
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
}

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCEbhJIIenNp6PAHtVIFuY6J8c3aU4MQjQ',
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    }])
  }, [])

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps"
  return (
    <div>

      <Locate panTo={panTo} />
      <GoogleMap id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "https://i.imgur.com/6F3xA45.png",
              scaledSize: new window.google.maps.Size(65, 65)
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {
          setSelected(null);
        }}
        >
          <div>
            <h1>Title</h1>
          </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </div>
  )
}

function Locate({ panTo }) {
  return <button id='locate' onClick={() => {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }, () => null);
  }}>
    <img id='compass' src='https://i.imgur.com/zC8AMg4.png' alt='locate me' /></button>
}

export default Map;
