import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

type MapProps = {
  children?: React.ReactNode;
};

export const Map: React.FC<MapProps> = ({ children }: MapProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const options = {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      };

      setMap(new window.google.maps.Map(ref.current, options));
    }
  }, [ref, map]);

  return (
    <>
      <div ref={ref} className='map' />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-expect-error: disabled TypeScript for the needs of the code from the documentation
          return cloneElement(child, { map });
        }
        return child;
      })}
    </>
  );
};
