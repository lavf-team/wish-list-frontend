import API from 'config/API';
import Requester from 'libs/Requester';
import {
  normalizeCatalog,
  normalizeSearchedCatalog,
} from 'store/wishesStore/normalizers';

export const GET_CATALOG = 'GET_CATALOG';
export const GET_CATALOG_SUCCESS = 'GET_CATALOG_SUCCESS';
export const GET_CATALOG_ERROR = 'GET_CATALOG_ERROR';

export const PREPARE_SEARCH_CATALOG = 'PREPARATION_SEARCH_CATALOG';

export const SEARCH_CATALOG = 'SEARCH_CATALOG';
export const SEARCH_CATALOG_SUCCESS = 'SEARCH_CATALOG_SUCCESS';
export const SEARCH_CATALOG_ERROR = 'SEARCH_CATALOG_ERROR';

export const DELETE_SEARCHED_CATALOG = 'DELETE_SEARCHED_CATALOG';

export const actionDeleteSearchedCatalog = () => ({
  payload: null,
  type: DELETE_SEARCHED_CATALOG,
});

export const actionGetCatalogSuccess = payload => ({
  payload,
  type: GET_CATALOG_SUCCESS,
});

export const actionGetCatalogError = payload => ({
  payload,
  type: GET_CATALOG_ERROR,
});

export const actionSearchCatalogSuccess = payload => ({
  payload,
  type: SEARCH_CATALOG_SUCCESS,
});

export const actionSearchCatalogError = payload => ({
  payload,
  type: SEARCH_CATALOG_ERROR,
});

export const actionPrepareSearchCatalog = () => ({
  payload: null,
  type: PREPARE_SEARCH_CATALOG,
});

export const actionGetCatalog = ({ start, limit }) => async dispatch => {
  console.log(GET_CATALOG);

  const result = await Requester.get(API.products(), { start, limit });
  if (result.response) {
    const normalizedCatalog = normalizeCatalog(result.response);
    dispatch(actionGetCatalogSuccess(normalizedCatalog));
  } else {
    dispatch(actionGetCatalogError(result.error));
  }
};

export const actionSearchCatalog = pattern => async dispatch => {
  console.log(SEARCH_CATALOG);

  dispatch(actionPrepareSearchCatalog());
  const result = await Requester.get(API.searchedProducts(), { pattern });
  if (result.response) {
    const normalizedCatalog = normalizeSearchedCatalog(result.response);
    dispatch(actionSearchCatalogSuccess(normalizedCatalog));
  } else {
    dispatch(actionSearchCatalogError(result.error));
  }
};
