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
