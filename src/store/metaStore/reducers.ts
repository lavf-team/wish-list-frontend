import { IReducer } from 'config/interfaces';

import { INIT_TOKEN_SUCCESS } from './actions';

const initialState = {
  isLoading: true,
};

const metaReducer: IReducer = (state = initialState, { type }) => {
  switch (type) {
    case INIT_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default metaReducer;
