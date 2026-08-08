import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

const LocationPicker = ({ position, setPosition }) => {
  return (
    <MapContainer
      center={[22.7196, 75.8577]}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

export default LocationPicker;
