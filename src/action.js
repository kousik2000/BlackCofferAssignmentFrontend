export const ADD_COUNTRY = 'ADD_COUNTRY';
export const ADD_REGION = 'ADD_REGION';
export const ADD_SECTOR = 'ADD_SECTOR';
export const ADD_TOPIC = 'ADD_TOPIC';

export const addCountry = (country) => ({
  type: ADD_COUNTRY ,
  payload: country,
});

export const addRegion = (region) => ({
  type: ADD_REGION,
  payload: region,
});

export const addSector = (sector) => ({
  type: ADD_SECTOR,
  payload: sector,
});

export const addTopic = (topic) => ({
  type: ADD_TOPIC,
  payload: topic,
});
