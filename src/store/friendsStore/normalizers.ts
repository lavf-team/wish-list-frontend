export const normalizeData = ({
  data: {
    response: { count, items },
  },
}) => {
  return items.reduce(
    (acc, user) => ({
      count,
      ids: [...acc.ids, user.id],
      friends: {
        ...acc.friends,
        [user.id]: {
          name: user.first_name,
          surname: user.last_name,
          avatar: user.photo_200_orig,
        },
      },
    }),
    { ids: [], friends: {}, count: 0 }
  );
};

export const normalizeFriendWishes = rawData => {
  return rawData.reduce(
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
          friendWishReserved: el.reserved,
          reservedByMe: el.reserved_by_me,
        },
      },
    }),
    { wishes: {}, wishesIds: [] }
  );
};

export const normalizeFriendGifts = rawData => {
  return rawData.reduce(
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
          receiverId: el.dest_id,
        },
      },
    }),
    { gifts: {}, giftsIds: [] }
  );
};
