import { GET_PERSONS, PERSONS_LOADING } from '../actions/types';

let initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PERSONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PERSONS:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
