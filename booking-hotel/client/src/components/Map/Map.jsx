import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = ({ locations }) => {
  console.log("Map locations:", locations);

  const defaultCenter = [39.8283, -98.5795];
  const zoomLevel = 4;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoomLevel}
      className="h-[800px] w-[95%]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations && locations.length > 0 ? (
        locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.position[1], location.position[0]]}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))
      ) : (
        <p>No locations available</p>
      )}
    </MapContainer>
  );
};

export default Map;
