import { IReducer } from 'config/interfaces';

import {GET_USER_GIFTS_SUCCESS, GET_USER_WISHES_SUCCESS, INIT_USER_SUCCESS} from './actions';

const initialStore = {
  id: null,
  name: '',
  surname: '',
  avatar: null,
  isLoading: true,
  wishes: {},
  wishesIds: [],
  gifts: {},
  giftsIds: [],
};

const userReducer: IReducer = (state = initialStore, { type, payload }) => {
  switch (type) {
    case INIT_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case GET_USER_WISHES_SUCCESS:
      return {
        ...state,
        wishes: payload.wishes,
        wishesIds: payload.wishesIds,
      };
    case GET_USER_GIFTS_SUCCESS:
      return {
        ...state,
        gifts: payload.gifts,
        giftsIds: payload.giftsIds,
      };
    default:
      return state;
  }
};

export default userReducer;
