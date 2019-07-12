export const Pages = {
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
};

export default function (url) {
    const props = Object.getOwnPropertyNames(Pages);
    for (let i = 0; i < props.length; i++) {
        if (url === Pages[props[i]].url) {
            return Pages[props[i]].title;
        }
    }
    return false;
}