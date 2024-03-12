import { useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const apiKey = 'AIzaSyADtDVmDwsAktE9k8TKx9mlHxyT9NB73UQ';

type Props = {
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.LatLng[]>>;
};

export const Form = ({ setMarkers }: Props): JSX.Element => {
  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey,
  });
  const [placeDetails, setPlaceDetails] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if (!placeDetails) return;

    setMarkers((prev) => [
      ...prev,
      new google.maps.LatLng(
        placeDetails?.geometry?.location?.lng() ?? 0,
        placeDetails?.geometry?.location?.lat() ?? 0
      ),
    ]);
  }, [placeDetails, setMarkers]);

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
            readOnly
            defaultValue={placeDetails?.address_components?.find((obj) => obj.types.includes('route'))?.long_name}
          />
        </div>
        <div className='form-col'>
          <h4>City</h4>
          <input
            type='text'
            readOnly
            defaultValue={placeDetails?.address_components?.find((obj) => obj.types.includes('locality'))?.long_name}
          />
        </div>
        <div className='form-col'>
          <h4>State</h4>
          <input
            type='text'
            readOnly
            defaultValue={
              placeDetails?.address_components?.find((obj) => obj.types.includes('administrative_area_level_1'))
                ?.long_name
            }
          />
        </div>
        <div className='form-col'>
          <h4>Country</h4>
          <input
            type='text'
            readOnly
            defaultValue={placeDetails?.address_components?.find((obj) => obj.types.includes('country'))?.long_name}
          />
        </div>
        <div className='form-col'>
          <h4>Pincode</h4>
          <input
            type='text'
            readOnly
            defaultValue={placeDetails?.address_components?.find((obj) => obj.types.includes('postal_code'))?.long_name}
          />
        </div>
      </div>
    </div>
  );
};
