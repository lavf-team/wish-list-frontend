import API from 'config/API';
import Requester from 'libs/Requester/Requester';
import {
  APP_ID,
  Token,
  VK_METHOD_GET_TOKEN,
  VK_METHOD_INIT_APP,
} from 'store/config';
import { actionInitFriends } from 'store/friendsStore/actions';
import { actionInitUser } from 'store/userStore/actions';

import { normalizeToken } from './normalizers';

import connect from '@vkontakte/vkui-connect-promise';

export const INIT_APP = 'INIT_APP';
export const INIT_APP_SUCCESS = 'INIT_APP_SUCCESS';
export const INIT_APP_ERROR = 'INIT_APP_ERROR';

export const VK_INIT_APP = 'VK_INIT_APP';
export const VK_INIT_APP_SUCCESS = 'VK_INIT_APP_SUCCESS';
export const VK_INIT_APP_ERROR = 'VK_INIT_APP_ERROR';

export const INIT_TOKEN = 'INIT_TOKEN';
export const INIT_TOKEN_SUCCESS = 'INIT_TOKEN_SUCCESS';
export const INIT_TOKEN_ERROR = 'INIT_TOKEN_ERROR';

export const actionInitTokenSuccess = () => ({
  type: INIT_TOKEN_SUCCESS,
  payload: null,
});

export const actionVkInitApp = () => () => {
  console.log(VK_INIT_APP);

  connect
    .send(VK_METHOD_INIT_APP, {})
    .then(() => console.log(VK_INIT_APP_SUCCESS))
    .catch(error => console.log(VK_INIT_APP_ERROR, error));
};

export const actionInitToken = () => dispatch => {
  console.log(INIT_TOKEN);
  console.log(window.location.href);

  const SCOPE = ['friends'];

  connect
    .send(VK_METHOD_GET_TOKEN, { app_id: APP_ID, scope: SCOPE.join(',') })
    .then(data => normalizeToken(data))
    .then(token => {
      window[Token] = token;
      dispatch(actionInitTokenSuccess());
      dispatch(actionInitUser());
      dispatch(actionInitFriends());
    })
    .catch(error => console.log(INIT_TOKEN_ERROR, error));
};

export const actionInitApp = () => async dispatch => {
  console.log(INIT_APP);

  const result = await Requester.post(API.auth(), {
    url: window.location.href,
  });

  if (result.response) {
    console.log(INIT_APP_SUCCESS);
    dispatch(actionVkInitApp());
    dispatch(actionInitToken());
  } else {
    console.log(INIT_APP_ERROR);
  }
};
