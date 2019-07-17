import connect from '@vkontakte/vkui-connect-promise';
import { normalizeFriends } from './normalizers';
import {
    Token,
    VK_API_METHODS,
    API_VERSION,
    VK_CALL_API
} from '../config.ts';
import {actionInitFriendsIdsSuccess} from "../friendsIdsStore/actions";

export const INIT_FRIENDS = 'INIT_FRIENDS';
export const INIT_FRIENDS_SUCCESS = 'INIT_FRIENDS_SUCCESS';
export const INIT_FRIENDS_ERROR = 'INIT_FRIENDS_ERROR';

export const actionInitFriendsSuccess = (payload) => ({
    type: INIT_FRIENDS_SUCCESS,
    payload,
});

export const actionInitFriendsError = (payload) => ({
    type: INIT_FRIENDS_ERROR,
    payload,
});

export const actionInitFriends = () => (dispatch) => {
    console.log(INIT_FRIENDS);

    const FIELDS = ['photo_100'];
    const numberOfUsers = 5;

    connect.send(VK_CALL_API, {
        'method': VK_API_METHODS.FRIENDS_GET,
        'params':
            {
                'v': API_VERSION,
                'access_token': window[Token],
                count: numberOfUsers,
                fields: FIELDS.join(','),
            }})
        .then(data => normalizeFriends(data))
        .then(({ids, friends}) => {
            dispatch(actionInitFriendsSuccess(friends));
            dispatch(actionInitFriendsIdsSuccess(ids));
        })
        .then(error => dispatch(actionInitFriendsError(error)))
};