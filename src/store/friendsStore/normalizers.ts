export const normalizeData = ({data: { response: { count, items }}}) => {

    return items.reduce((acc, user) => ({
        ids: [...acc.ids, user.id],
        friends: {
            ...acc.friends,
            [user.id]: {
                name: user['first_name'],
                surname: user['last_name'],
                avatar: user['photo_200_orig']}
        },
        count,
    }), {ids: [], friends: {}, count: 0})
};
