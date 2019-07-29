export const normalizeSuggest = rawCatalog => {
  return rawCatalog.map(el => el.product_name);
};
