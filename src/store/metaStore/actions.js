import connect from '@vkontakte/vkui-connect-promise';
import { normalizeToken } from './normalizers';
import {
    VK_METHOD_GET_TOKEN,
    VK_METHOD_INIT_APP,
    APP_ID,
    Token
} from 'store/config.ts';
import {actionInitUser} from 'store/userStore/actions';
import {actionInitFriends} from 'store/friendsStore/actions';


export const VK_INIT_APP = 'VK_INIT_APP';
export const VK_INIT_APP_SUCCESS = 'VK_INIT_APP_SUCCESS';
export const VK_INIT_APP_ERROR = 'VK_INIT_APP_ERROR';

export const INIT_TOKEN = 'INIT_TOKEN';
export const INIT_TOKEN_SUCCESS = 'INIT_TOKEN_SUCCESS';
export const INIT_TOKEN_ERROR = 'INIT_TOKEN_ERROR';

export const actionInitTokenSuccess = (payload) => ({
    type: INIT_TOKEN_SUCCESS,
    payload
});

export const actionVkInitApp = () => () => {
    console.log(VK_INIT_APP);

    connect.send(VK_METHOD_INIT_APP, {})
        .then(() => console.log(VK_INIT_APP_SUCCESS))
        .catch(error => console.log(VK_INIT_APP_ERROR, error));
};

export const actionInitToken = () => (dispatch) => {
    console.log(INIT_TOKEN);

    const SCOPE = ['friends'];

    connect.send(
        VK_METHOD_GET_TOKEN,
        {"app_id": APP_ID, "scope": SCOPE.join(',')})
        .then(data => normalizeToken(data))
        .then(token => {
            window[Token] = token;
            dispatch(actionInitTokenSuccess());
            dispatch(actionInitUser());
            dispatch(actionInitFriends());
        })
        .catch(error => console.log(INIT_TOKEN_ERROR, error))
};
