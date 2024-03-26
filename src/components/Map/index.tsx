import { useEffect, useRef, useState } from 'react';

const ZOOM_DELAY = 300;
const ZOOM_LEVEL = 6;

const MAP_OPTIONS = {
  center: { lat: 0, lng: 0 },
  zoom: 2,
};

type Props = {
  markers: google.maps.LatLng[];
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.LatLng[]>>;
};

const getCoords = (marker: google.maps.LatLng) => new google.maps.LatLng(marker.lng(), marker.lat());

export const Map = ({ markers, setMarkers }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const clearMarkers = () => {
    setMarkers([]);
    setMap(undefined);
    map?.setZoom(MAP_OPTIONS.zoom);
    map?.panTo(MAP_OPTIONS.center);
  };

  useEffect(() => {
    if (!map || !markers.length) return;

    markers.forEach((marker) => {
      new google.maps.Marker({ position: getCoords(marker), map, optimized: true });
    });

    map.panTo(getCoords(markers[markers.length - 1]));

    const timeoutId = setTimeout(() => {
      map.setZoom(ZOOM_LEVEL);
    }, ZOOM_DELAY);

    return () => clearTimeout(timeoutId);
  }, [map, markers]);

  useEffect(() => {
    if (ref.current && !map) setMap(new window.google.maps.Map(ref.current, MAP_OPTIONS));
  }, [ref, map]);

  return (
    <>
      <div ref={ref} className='map' />
      <div className='clear-markers-btn' onClick={clearMarkers}>
        <img src='https://cdn1.iconfinder.com/data/icons/vibrancie-map/30/map_025-location-marker-close-pin-delete-remove-512.png' />
      </div>
    </>
  );
};
