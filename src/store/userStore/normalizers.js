export const normalizeUser = ({data: {id, first_name, last_name, photo_100}}) => ({
    id,
    name: first_name,
    surname: last_name,
    avatar: photo_100
});