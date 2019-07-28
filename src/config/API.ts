export const BASE_URL = '';

const prefixAPI = url => `${BASE_URL}${url}`;

export default {
  products: () => prefixAPI('/products'),
  searchProducts: q => prefixAPI(`/products/search/${q}`),
};
