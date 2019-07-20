export const route = {
    FRIENDS: {
        title: 'FRIENDS',
        url: '/friends',
    },
    WISH_LIST: {
        title: 'WISH_LIST',
        url: '/wish-list'
    },
    PROFILE: {
        title: 'PROFILE',
        url: '/profile'
    },
    MY_WISHES: {
        title: 'MY_WISHES',
        url: '/profile/wishes'
    },
    MY_GIFTS: {
        title: 'MY_GIFTS',
        url: '/profile/gifts'
    },
    FRIEND: {
        title: 'FRIEND',
        url: '/friend/:id',
        create: (id) => `/friend/${id}`,
    },
    FRIENDS_WISHES: {
        title: 'FRIENDS_WISHES',
        url: '/friend/:id/wishes',
        create: (id) => `/friend/${id}/wishes`,
    },
    FRIENDS_GIFTS: {
        title: 'FRIENDS_GIFTS',
        url: '/friend/:id/gifts',
        create: (id) => `/friend/${id}/gifts`,
    }
};

export default function (url) {
    const props = Object.getOwnPropertyNames(route);
    for (let i = 0; i < props.length; i++) {
        if (url === route[props[i]].url) {
            return route[props[i]].title;
        }
    }
    return false;
}