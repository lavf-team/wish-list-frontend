export const normalizeCatalog = ({ total, products }) => {
  return products.reduce(
    (acc, el) => ({
      ...acc,
      catalogIds: [...acc.catalogIds, el._id],
      catalog: {
        ...acc.catalog,
        [el._id]: {
          img: el.img_url,
          title: el.product_name,
          prize: `${el.price} ₽`,
          description: el.discription,
        },
      },
    }),
    { total, catalogIds: [], catalog: {} }
  );
};

export const normalizeSearchedCatalog = rawCatalog => {
  return rawCatalog.reduce(
    (acc, el) => ({
      ...acc,
      catalogIds: [...acc.catalogIds, el._id],
      catalog: {
        ...acc.catalog,
        [el._id]: {
          img: el.img_url,
          title: el.product_name,
          prize: `${el.price} ₽`,
          description: el.discription,
        },
      },
    }),
    { catalogIds: [], catalog: {} }
  );
};
