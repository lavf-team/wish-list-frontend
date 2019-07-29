import API from 'config/API';
import Requester from 'libs/Requester';
import { normalizeCatalog } from 'store/wishesStore/normalizers';

export const GET_CATALOG = 'GET_CATALOG';
export const GET_CATALOG_SUCCESS = 'GET_CATALOG_SUCCESS';
export const GET_CATALOG_ERROR = 'GET_CATALOG_ERROR';

export const actionGetCatalogSuccess = payload => ({
  payload,
  type: GET_CATALOG_SUCCESS,
});

export const actionGetCatalogError = payload => ({
  payload,
  type: GET_CATALOG_ERROR,
});

export const actionGetCatalog = q => async dispatch => {
  console.log(GET_CATALOG);

  const result = await Requester.get(
    q && q.trim().length ? API.searchProducts(q) : API.products()
  );
  if (result.response) {
    const normalizedCatalog = normalizeCatalog(result.response);
    dispatch(actionGetCatalogSuccess(normalizedCatalog));
  } else {
    dispatch(actionGetCatalogError(result.error));
  }
};
