import { wishState } from 'components/Wish/config';

export const normalizeCatalog = rawCatalog => {
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
          state: wishState.CAN_BE_ADDED,
        },
      },
    }),
    { catalogIds: [], catalog: {} }
  );
};
