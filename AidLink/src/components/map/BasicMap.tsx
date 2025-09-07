import { useEffect, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import type { Camp } from "../../types/camp.types";
import useGeoLocation from "../../hooks/useGeoLocation";

// Import leaflet-routing-machine and its types
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface MapPosition {
  lat: number;
  lng: number;
}

interface BasicMapProps {
  camps: Camp[];
  onCampSelect: (camp: Camp | null) => void;
  selectedCamp: Camp | null;
}

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/5081/5081368.png",
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46]
})

// Icon for user location
const userLocationIcon = new L.Icon({
  iconUrl: "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png",
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [3, -46],
})

// Location flyover to user location
interface FlyToLocationProps {
  location: ReturnType<typeof useGeoLocation>;
  zoomLevel: number;
}

export const FlyToLocation: React.FC<FlyToLocationProps> = ({ location, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    if (location.loaded && !location.error && location.coordinates) {
      map.flyTo([
        Number(location.coordinates.lat),
        Number(location.coordinates.lng)
      ],
        zoomLevel,
        { animate: true }
      );
    }
  }, [location, zoomLevel, map]);

  return null;
};

// Calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Helper function to validate coordinates
const isValidCoordinate = (lat: number, lng: number): boolean => {
  return !isNaN(lat) && !isNaN(lng) && 
         lat >= -90 && lat <= 90 && 
         lng >= -180 && lng <= 180;
};

const BasicMap: React.FC<BasicMapProps> = ({ camps, onCampSelect, selectedCamp }) => {
  const [center] = useState<MapPosition>({
    lat: 27.64256108005826,
    lng: 85.32555398598879
  });

  const [nearbyCamps, setNearbyCamps] = useState<Camp[]>([]);
  const ZOOM_LEVEL = 13;
  const mapRef = useRef<L.Map>(null);
  const location = useGeoLocation();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  // Filter nearby camps when location changes
  useEffect(() => {
    if (location.loaded && !location.error && location.coordinates && camps.length > 0) {
      const userLat = location.coordinates.lat;
      const userLng = location.coordinates.lng;
      const radius = 100;

      const nearby = camps.filter(camp => {
        const distance = calculateDistance(
          Number(userLat),
          Number(userLng),
          camp.lat,
          camp.lng
        );
        return distance <= radius;
      });

      setNearbyCamps(nearby);
    }
  }, [location, camps]);

  // Add routing between user location and selected camp
  useEffect(() => {
    if (!mapRef.current) return;

    // Cleanup existing routing control
    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    // Only add new routing control if all conditions are met
    if (location.loaded && 
        !location.error && 
        location.coordinates && 
        selectedCamp && 
        isValidCoordinate(Number(location.coordinates.lat), Number(location.coordinates.lng)) &&
        isValidCoordinate(selectedCamp.lat, selectedCamp.lng)) {
      
      const userLatLng = L.latLng(
        Number(location.coordinates.lat), 
        Number(location.coordinates.lng)
      );
      const selectedLatLng = L.latLng(selectedCamp.lat, selectedCamp.lng);

      // Add new routing control
      routingControlRef.current = (L.Routing as any).control({
        waypoints: [userLatLng, selectedLatLng],
        lineOptions: {
          styles: [{ color: '#0066cc', weight: 4 }]
        },
        show: false,
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        createMarker: () => null,
      }).addTo(mapRef.current);
    }
  }, [location, selectedCamp]);

  return (
    <>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Auto fly to user location */}
        <FlyToLocation location={location} zoomLevel={ZOOM_LEVEL} />

        {/* User location marker */}
        {location.loaded && 
         !location.error && 
         location.coordinates &&
         isValidCoordinate(Number(location.coordinates.lat), Number(location.coordinates.lng)) && (
          <Marker
            position={[Number(location.coordinates.lat), Number(location.coordinates.lng)]}
            icon={userLocationIcon}
          >
            <Popup>
              <b>Your Location</b>
            </Popup>
          </Marker>
        )}

        {/* Nearby camps markers */}
        {nearbyCamps.map((camp) => (
          <Marker
            position={[camp.lat, camp.lng]}
            icon={markerIcon}
            key={camp.id}
            eventHandlers={{
              click: () => {
                onCampSelect(camp); // Notify parent component
              },
            }}
          >
            <Popup>
              <b>{camp.name}</b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default BasicMap;