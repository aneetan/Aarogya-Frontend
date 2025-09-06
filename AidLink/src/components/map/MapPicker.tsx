import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useGeoLocation from '../../hooks/useGeoLocation';
import { FlyToLocation } from './BasicMap';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AdminMapComponentProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const userLocationIcon = new L.Icon({
  iconUrl: "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png",
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [3, -46],
})


const AdminMapComponent: React.FC<AdminMapComponentProps> = ({ 
  onLocationSelect
}) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const location = useGeoLocation();


  const LocationMarker: React.FC = () => {
    useMapEvents({
      click(e) {
        const newPosition: LatLng = {
          lat: e.latlng.lat,
          lng: e.latlng.lng
        };
        setPosition(newPosition);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });

    return position === null ? null : (
      <Marker position={[position.lat, position.lng]} />
    );
  };

  return (
    <MapContainer
      center={[Number(location.coordinates?.lat), Number(location.coordinates?.lng)]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToLocation location={location} zoomLevel={13} />
      {location.loaded && !location.error && location.coordinates && (
        <Marker
          position={[Number(location.coordinates.lat), Number(location.coordinates.lng)]}
          icon={userLocationIcon}
        >
          <Popup>
            <b>Your Location</b>
          </Popup>
        </Marker>
      )}
      <LocationMarker />
    </MapContainer>
  );
};

export default AdminMapComponent;