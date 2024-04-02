export type Props = {
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.LatLng[]>>;
};

export type ParsedFormData = Record<string, string>;
