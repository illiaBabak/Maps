import { useEffect, useRef, useState } from 'react';

type Props = {
  markers: google.maps.LatLng[];
};

export const Map = ({ markers }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (!map) return;

    {
      markers.map((marker) => {
        new google.maps.Marker({ position: new google.maps.LatLng(marker.lng(), marker.lat()), map, optimized: true });
      });

      if (markers.length) {
        map.panTo(new google.maps.LatLng(markers[markers.length - 1].lng(), markers[markers.length - 1].lat()));

        setTimeout(() => {
          map.setZoom(6);
        }, 300);
      }
    }
  }, [map, markers]);

  useEffect(() => {
    if (ref.current && !map) {
      const options = {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      };

      setMap(new window.google.maps.Map(ref.current, options));
    }
  }, [ref, map]);

  return <div ref={ref} className='map' />;
};
