import { IReducer } from 'config/interfaces';

import {
  DELETE_SEARCHED_CATALOG,
  GET_CATALOG_SUCCESS,
  PREPARE_SEARCH_CATALOG,
  SEARCH_CATALOG_SUCCESS,
} from './actions';

const initialState = {
  catalogIds: [],
  catalog: {},
  total: 0,
  hasMore: false,
  isLoading: true,
};

const wishesReducer: IReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATALOG_SUCCESS:
      return {
        ...state,
        catalogIds: [...state.catalogIds, ...payload.catalogIds],
        catalog: { ...state.catalog, ...payload.catalog },
        total: payload.total,
        hasMore:
          payload.total > payload.catalogIds.length + state.catalogIds.length,
        isLoading: false,
      };
    case SEARCH_CATALOG_SUCCESS:
      return {
        ...state,
        catalogIds: payload.catalogIds,
        catalog: payload.catalog,
        total: 0,
        hasMore: false,
        isLoading: false,
      };
    case DELETE_SEARCHED_CATALOG:
      return {
        ...state,
        ...initialState,
      };
    case PREPARE_SEARCH_CATALOG:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default wishesReducer;
