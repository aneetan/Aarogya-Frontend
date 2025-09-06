import { useEffect, useState } from "react"
import type { GeolocationError, GeolocationState } from "../types/map.types";

const useGeoLocation = (): GeolocationState => {
  const [location, setLocation] = useState<GeolocationState>({
    loaded: false,
    coordinates: {
      lat: "",
      lng: ""
    }
  });

  const onSuccess = (position: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  };

  const onError = (error: GeolocationError) => {
    setLocation({
      loaded: true,
      error     
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
      onError({
        code: error.code,
        message: error.message
      });
    });
  }, []);

  return location;
};

export default useGeoLocation;