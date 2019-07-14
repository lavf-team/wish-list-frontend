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
        url: '/profile/my-wishes'
    },
    MY_GIFTS: {
        title: 'MY_GIFTS',
        url: '/profile/my-gifts'
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