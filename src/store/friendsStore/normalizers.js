export const normalizeFriends = ({data: { response: { items }}}) => {
    return items.reduce((acc, user) => ({
        ids: [...acc.ids, user.id],
        friends: {
            ...acc.friends,
            [user.id]: {
                name: user['first_name'],
                surname: user['last_name'],
                avatar: user['photo_200_orig']}
        }
    }), {ids: [], friends: {}})
};
