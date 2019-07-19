import connect from '@vkontakte/vkui-connect-promise';
import { normalizeData } from './normalizers';
import {
    Token,
    VK_API_METHODS,
    API_VERSION,
    VK_CALL_API,
    LOADED_FRIENDS_NUMBER
} from '../config.ts';

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

export const actionInitFriends = (offset = 0,
                                  numberOfUsers = LOADED_FRIENDS_NUMBER) => (dispatch) => {
    console.log(INIT_FRIENDS);

    const FIELDS = ['photo_200_orig'];

    connect.send(VK_CALL_API, {
        'method': VK_API_METHODS.FRIENDS_GET,
        'params':
            {
                'v': API_VERSION,
                'access_token': window[Token],
                count: numberOfUsers,
                offset,
                fields: FIELDS.join(','),
            }})
        .then(data => normalizeData(data))
        .then((data) => dispatch(actionInitFriendsSuccess(data)))
        .catch(error => dispatch(actionInitFriendsError(error)))
};