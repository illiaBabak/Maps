import { useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { ParsedFormData, Props } from './types';
import { DEFAULT_FORM_VALUE, FIELDS_ARR, apiKey } from './constants';
import { parseFormData } from './utils';
import { capitalize } from 'src/utils/capitalize';

export const Form = ({ setMarkers }: Props): JSX.Element => {
  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey,
  });
  const [inputValues, setInputValues] = useState<ParsedFormData>(DEFAULT_FORM_VALUE);

  const clearForm = () => setInputValues(DEFAULT_FORM_VALUE);

  const handleInputChange = (val: string, fieldName: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: val,
    }));
  };

  const handleSearch = (placeId: string) => {
    placesService?.getDetails(
      {
        placeId,
      },
      (placeDetails) => {
        if (!placeDetails) return;

        setInputValues(parseFormData(placeDetails));

        setMarkers((prev) => [
          ...prev,
          new google.maps.LatLng(
            placeDetails?.geometry?.location?.lng() ?? 0,
            placeDetails?.geometry?.location?.lat() ?? 0
          ),
        ]);
      }
    );
  };

  return (
    <div className='form'>
      <div className='search'>
        <div className='form-col'>
          <h1>Search</h1>
          <input onChange={(e) => getPlacePredictions({ input: e.currentTarget.value })} />
        </div>

        <div className='list'>
          {placePredictions.map((el, index) => (
            <div className='list-el' key={`list-${index}`} onClick={() => handleSearch(el.place_id)}>
              {el.description}
            </div>
          ))}
        </div>
      </div>

      <div className='info'>
        <h2>Info</h2>

        {FIELDS_ARR.map(([_, localName], index) => (
          <div className='form-col' key={`${index}-${localName}`}>
            <h4>{capitalize(localName)}</h4>
            <input
              type='text'
              value={inputValues[localName]}
              onChange={(e) => handleInputChange(e.currentTarget.value, localName)}
            />
          </div>
        ))}
      </div>

      <div className='clear-btn' onClick={clearForm}>
        Clear form
      </div>
    </div>
  );
};
