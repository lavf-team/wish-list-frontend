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
import Requester from 'libs/Requester/Requester';
import API from 'config/API';

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
    .then(async token => {
      window[Token] = token;
      dispatch(actionInitTokenSuccess());
      dispatch(actionInitUser());
      dispatch(actionInitFriends());
      await Requester.post(API.auth(), {
        id: '5d3f63938597261054315605',
      });
    })
    .catch(error => console.log(INIT_TOKEN_ERROR, error));
};
