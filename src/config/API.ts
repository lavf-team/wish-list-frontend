export const BASE_URL = '';

const prefixAPI = url => `${BASE_URL}${url}`;

export default {
  products: () => prefixAPI('/products/list'),
  searchedProducts: () => prefixAPI('/products/search/result'),
  searchProducts: () => prefixAPI('/products/search'),

  auth: () => prefixAPI('/auth'),
};
