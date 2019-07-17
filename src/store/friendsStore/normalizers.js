export const normalizeFriends = ({data: { response: { items }}}) => {
    console.log('items',items);
    return items.reduce((acc, user) => ({
        ids: [...acc.ids, user.id],
        friends: {
            ...acc.friends,
            [user.id]: {
                name: user['first_name'],
                surname: user['last_name'],
                avatar: user['photo_100']}
        }
    }), {ids: [], friends: {}})
};
