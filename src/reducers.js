import { ADD_COUNTRY, ADD_REGION, ADD_SECTOR, ADD_TOPIC } from './action';

const initialState = {
  country: '',
  region: '',
  sector: '',
  topic: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case ADD_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case ADD_SECTOR:
      return {
        ...state,
        sector: action.payload,
      };
    case ADD_TOPIC:
      return {
        ...state,
        topic: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
