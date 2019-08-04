export const normalizeAvatars = rawArray => {
  return rawArray.reduce(
    (acc, el) => ({
      ...acc,
      [el.id]: el.photo_100,
    }),
    {}
  );
};
