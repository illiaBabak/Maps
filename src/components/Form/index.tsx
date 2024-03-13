import { useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const apiKey = 'AIzaSyADtDVmDwsAktE9k8TKx9mlHxyT9NB73UQ';

type Props = {
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.LatLng[]>>;
};

const getInputVal = (placeDetails: google.maps.places.PlaceResult | null, name: string) => {
  return placeDetails?.address_components?.find((obj) => obj.types.includes(name))?.long_name;
};

export const Form = ({ setMarkers }: Props): JSX.Element => {
  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey,
  });
  const [placeDetails, setPlaceDetails] = useState<google.maps.places.PlaceResult | null>(null);
  const [inputValues, setInputValues] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  useEffect(() => {
    if (!placeDetails) return;

    setInputValues({
      street: getInputVal(placeDetails, 'route') || '',
      city: getInputVal(placeDetails, 'locality') || '',
      state: getInputVal(placeDetails, 'administrative_area_level_1') || '',
      country: getInputVal(placeDetails, 'country') || '',
      pincode: getInputVal(placeDetails, 'postal_code') || '',
    });

    setMarkers((prev) => [
      ...prev,
      new google.maps.LatLng(
        placeDetails?.geometry?.location?.lng() ?? 0,
        placeDetails?.geometry?.location?.lat() ?? 0
      ),
    ]);
  }, [placeDetails, setMarkers, setInputValues]);

  const clearForm = () => {
    setInputValues({
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    });
  };

  const handleInputChange = (val: string, fieldName: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: val,
    }));
  };

  return (
    <div className='form'>
      <div className='search'>
        <div className='form-col'>
          <h1>Search</h1>
          <input onChange={(e) => getPlacePredictions({ input: e.currentTarget.value })} />
        </div>

        <div className='list'>
          {placePredictions.map((el, index) => {
            return (
              <div
                className='list-el'
                key={`list-${index}`}
                onClick={() => {
                  placesService?.getDetails(
                    {
                      placeId: el.place_id,
                    },
                    (placeDetails) => setPlaceDetails(placeDetails)
                  );
                }}
              >
                {el.description}
              </div>
            );
          })}
        </div>
      </div>

      <div className='info'>
        <h2>Info</h2>
        <div className='form-col'>
          <h4>Street</h4>
          <input
            type='text'
            value={inputValues.street}
            onChange={(e) => handleInputChange(e.currentTarget.value, 'street')}
          />
        </div>
        <div className='form-col'>
          <h4>City</h4>
          <input
            type='text'
            value={inputValues.city}
            onChange={(e) => handleInputChange(e.currentTarget.value, 'city')}
          />
        </div>
        <div className='form-col'>
          <h4>State</h4>
          <input
            type='text'
            value={inputValues.state}
            onChange={(e) => handleInputChange(e.currentTarget.value, 'state')}
          />
        </div>
        <div className='form-col'>
          <h4>Country</h4>
          <input
            type='text'
            value={inputValues.country}
            onChange={(e) => handleInputChange(e.currentTarget.value, 'country')}
          />
        </div>
        <div className='form-col'>
          <h4>Pincode</h4>
          <input
            type='text'
            value={inputValues.pincode}
            onChange={(e) => handleInputChange(e.currentTarget.value, 'pincode')}
          />
        </div>
      </div>

      <div className='clear-btn' onClick={clearForm}>
        Clear form
      </div>
    </div>
  );
};
