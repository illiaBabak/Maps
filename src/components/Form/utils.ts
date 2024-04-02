import { FIELDS_ARR } from './constants';
import { ParsedFormData } from './types';

export const parseFormData = (placeDetails: google.maps.places.PlaceResult | undefined): ParsedFormData => {
  const { address_components } = placeDetails ?? {};
  const parsedData: ParsedFormData = {};

  FIELDS_ARR.forEach(([googleFieldName, localFieldName]) => {
    const searchedVal = address_components?.find((obj) => obj.types.includes(googleFieldName))?.long_name;
    parsedData[localFieldName] = searchedVal ?? '';
  });

  return parsedData;
};
