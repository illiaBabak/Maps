export const apiKey = 'AIzaSyADtDVmDwsAktE9k8TKx9mlHxyT9NB73UQ';

const FIELDS_MAP = {
  route: 'street',
  locality: 'city',
  administrative_area_level_1: 'state',
  country: 'country',
  postal_code: 'pincode',
};

export const FIELDS_ARR = Object.entries(FIELDS_MAP);

export const DEFAULT_FORM_VALUE = {
  street: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
};
