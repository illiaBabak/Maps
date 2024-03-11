import { Map } from '../components/Map';
import { Form } from '../components/Form';
import { useState } from 'react';
import { Marker } from 'src/components/Marker';

export const App = (): JSX.Element => {
  const [place, setPlace] = useState<google.maps.places.PlaceResult>({});

  return (
    <div className='container'>
      <Map>
        <Marker position={place.geometry?.location} />
      </Map>
      <Form setPlace={setPlace} place={place} />
    </div>
  );
};
