import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

interface RoutingControlProps {
  from: [number, number];
  to: [number, number];
}

const RoutingControl: React.FC<RoutingControlProps> = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    // @ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1]),
      ],
      lineOptions: {
        styles: [{ color: "#0066cc", weight: 4 }],
      },
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [from, to, map]);

  return null;
};

export default RoutingControl;