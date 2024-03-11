import Autocomplete from 'react-google-autocomplete';

type Props = {
  setPlace: React.Dispatch<React.SetStateAction<google.maps.places.PlaceResult>>;
  place: google.maps.places.PlaceResult;
};

export const Form = ({ setPlace, place }: Props): JSX.Element => (
  <div className='form'>
    <div className='form-col'>
      <h1>Search</h1>
      <Autocomplete
        apiKey='AIzaSyADtDVmDwsAktE9k8TKx9mlHxyT9NB73UQ'
        options={{
          types: ['geocode'],
        }}
        onPlaceSelected={(place) => {
          setPlace(place);
        }}
      />
    </div>
    <h2>Info</h2>
    <div className='form-col'>
      <h4>Street</h4>
      <input
        type='text'
        readOnly
        defaultValue={place.address_components?.find((obj) => obj.types.includes('route'))?.long_name}
      />
    </div>
    <div className='form-col'>
      <h4>City</h4>
      <input
        type='text'
        readOnly
        defaultValue={place.address_components?.find((obj) => obj.types.includes('locality'))?.long_name}
      />
    </div>
    <div className='form-col'>
      <h4>State</h4>
      <input
        type='text'
        readOnly
        defaultValue={
          place.address_components?.find((obj) => obj.types.includes('administrative_area_level_1'))?.long_name
        }
      />
    </div>
    <div className='form-col'>
      <h4>Country</h4>
      <input
        type='text'
        readOnly
        defaultValue={place.address_components?.find((obj) => obj.types.includes('country'))?.long_name}
      />
    </div>
    <div className='form-col'>
      <h4>Pincode</h4>
      <input
        type='text'
        readOnly
        defaultValue={place.address_components?.find((obj) => obj.types.includes('postal_code'))?.long_name}
      />
    </div>
  </div>
);
