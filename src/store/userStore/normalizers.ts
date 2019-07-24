export const normalizeUser = ({
  data: { id, first_name, last_name, photo_200 },
}) => ({
  id,
  name: first_name,
  surname: last_name,
  avatar: photo_200,
});
