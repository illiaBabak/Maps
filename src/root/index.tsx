import { Map } from '../components/Map';
import { Form } from '../components/Form';
import { useState } from 'react';

export const App = (): JSX.Element => {
  const [markers, setMarkers] = useState<google.maps.LatLng[]>([]);

  return (
    <div className='container'>
      <Map markers={markers} setMarkers={setMarkers} />
      <Form setMarkers={setMarkers} />
    </div>
  );
};
