import connect from '@vkontakte/vkui-connect-promise';
import { normalizeToken } from "./normalizers";
import {
    VK_METHOD_GET_TOKEN,
    VK_METHOD_INIT_APP,
    APP_ID,
    Token
} from '../config.ts';


export const VK_INIT_APP = 'VK_INIT_APP';
export const VK_INIT_APP_SUCCESS = 'VK_INIT_APP_SUCCESS';
export const VK_INIT_APP_ERROR = 'VK_INIT_APP_ERROR';

export const INIT_TOKEN = 'INIT_TOKEN';
export const INIT_TOKEN_ERROR = 'INIT_TOKEN_ERROR';

export const actionVkInitAppSuccess = (payload) => ({
    type: VK_INIT_APP_SUCCESS,
    payload,
});

export const actionVkInitAppError = (payload) => ({
    type: VK_INIT_APP_ERROR,
    payload,
});

export const actionInitTokenError = (payload) => ({
    type: INIT_TOKEN_ERROR,
    payload,
});

export const actionVkInitApp = () => (dispatch) => {
    console.log(VK_INIT_APP);

    connect.send(VK_METHOD_INIT_APP, {})
        .then(data => dispatch(actionVkInitAppSuccess(data)))
        .catch(error => dispatch(actionVkInitAppError(error)))
};

export const actionInitToken = () => (dispatch) => {
    console.log(INIT_TOKEN);

    const SCOPE = ['friends'];

    connect.send(
        VK_METHOD_GET_TOKEN,
        {"app_id": APP_ID, "scope": SCOPE.join(',')})
        .then(data => normalizeToken(data))
        .then(token => window[Token] = token)
        .catch(error => dispatch(actionInitTokenError(error)))
};
