import API from 'config/API';
import Requester from 'libs/Requester';
import { normalizeCatalog } from 'store/wishesStore/normalizers';

export const GET_CATALOG = 'GET_CATALOG';
export const GET_CATALOG_SUCCESS = 'GET_CATALOG_SUCCESS';
export const GET_CATALOG_ERROR = 'GET_CATALOG_ERROR';

export const GET_SEARCH_CATALOG = 'GET_SEARCH_CATALOG';
export const GET_SEARCH_CATALOG_SUCCESS = 'GET_SEARCH_CATALOG_SUCCESS';
export const GET_SEARCH_CATALOG_ERROR = 'GET_SEARCH_CATALOG_ERROR';

export const actionGetCatalogSuccess = payload => ({
  payload,
  type: GET_CATALOG_SUCCESS,
});

export const actionGetCatalogError = payload => ({
  payload,
  type: GET_CATALOG_ERROR,
});

export const actionGetSearchCatalogSuccess = payload => ({
  payload,
  type: GET_SEARCH_CATALOG_SUCCESS,
});

export const actionGetSearchCatalogError = payload => ({
  payload,
  type: GET_SEARCH_CATALOG_ERROR,
});

export const actionGetCatalog = () => async dispatch => {
  console.log(GET_CATALOG);

  const result = await Requester.get(API.products());
  if (result.response) {
    const normalizedCatalog = normalizeCatalog(result.response);
    dispatch(actionGetCatalogSuccess(normalizedCatalog));
  } else {
    dispatch(actionGetCatalogError(result.error));
  }
};

export const actionGetSearchCatalog = q => async dispatch => {
  console.log(GET_SEARCH_CATALOG);

  const result = await Requester.get(API.searchProducts(q));
  if (result.response) {
    const normalizedCatalog = normalizeCatalog(result.response);
    dispatch(actionGetSearchCatalogSuccess(normalizedCatalog));
  } else {
    dispatch(actionGetSearchCatalogError(result.error));
  }
};
