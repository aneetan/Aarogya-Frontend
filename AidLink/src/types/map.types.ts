export interface Coordinates {
  lat: string | number;
  lng: string | number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export interface GeolocationState {
  loaded: boolean;
  coordinates?: Coordinates;
  error?: GeolocationError;
}
