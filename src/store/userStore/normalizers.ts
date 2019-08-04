import { wishState } from 'components/Wish/config';

export const normalizeUser = ({
  data: { id, first_name, last_name, photo_200 },
}) => ({
  id,
  name: first_name,
  surname: last_name,
  avatar: photo_200,
});

export const normalizeUserWishes = rawResult => {
  return rawResult.reduce(
    (acc, el) => ({
      ...acc,
      wishesIds: [...acc.wishesIds, el._id],
      wishes: {
        ...acc.wishes,
        [el._id]: {
          img: el.img_url,
          title: el.product_name,
          prize: `${el.price} ₽`,
          description: el.discription,
          reserved: el.reserved,
        },
      },
    }),
    { wishesIds: [], wishes: {} }
  );
};

export const normalizeUserGifts = rawResult => {
  return rawResult.reduce(
    (acc, el) => ({
      ...acc,
      giftsIds: [...acc.giftsIds, el._id],
      gifts: {
        ...acc.gifts,
        [el._id]: {
          img: el.img_url,
          title: el.product_name,
          prize: `${el.price} ₽`,
          description: el.discription,
          receiverFriendId: el.dest_id,
        },
      },
    }),
    { gifts: {}, giftsIds: [] }
  );
};
