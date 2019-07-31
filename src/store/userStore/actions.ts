import API from 'config/API';
import Requester from 'libs/Requester/Requester';

import { normalizeUser } from './normalizers';

import connect from '@vkontakte/vkui-connect-promise';

export const INIT_USER = 'INIT_USER';
export const INIT_USER_SUCCESS = 'INIT_USER_SUCCESS';
export const INIT_USER_ERROR = 'INIT_USER_ERROR';

const VK_GET_USER = 'VKWebAppGetUserInfo';

export const actionInitUserSuccess = payload => ({
  payload,
  type: INIT_USER_SUCCESS,
});

export const actionInitUserError = payload => ({
  payload,
  type: INIT_USER_ERROR,
});

export const actionInitUser = () => dispatch => {
  console.log(INIT_USER);

  connect
    .send(VK_GET_USER, {})
    .then(data => normalizeUser(data))
    .then(user => {
      dispatch(actionInitUserSuccess(user));
    })
    .catch(error => dispatch(actionInitUserError(error)));
};
