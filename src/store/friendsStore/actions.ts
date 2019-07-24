import {
  API_VERSION,
  LOADED_FRIENDS_NUMBER,
  Token,
  VK_API_METHODS,
  VK_CALL_API,
} from 'store/config';

import { normalizeData } from './normalizers';

import connect from '@vkontakte/vkui-connect-promise';

export const INIT_FRIENDS = 'INIT_FRIENDS';
export const INIT_FRIENDS_SUCCESS = 'INIT_FRIENDS_SUCCESS';
export const INIT_FRIENDS_ERROR = 'INIT_FRIENDS_ERROR';

export const actionInitFriendsSuccess = payload => ({
  payload,
  type: INIT_FRIENDS_SUCCESS,
});

export const actionInitFriendsError = payload => ({
  payload,
  type: INIT_FRIENDS_ERROR,
});

export const actionInitFriends = (
  offset = 0,
  numberOfUsers = LOADED_FRIENDS_NUMBER
) => dispatch => {
  console.log(INIT_FRIENDS);

  const FIELDS = ['photo_200_orig'];

  connect
    .send(VK_CALL_API, {
      method: VK_API_METHODS.FRIENDS_GET,
      params: {
        offset,
        v: API_VERSION,
        access_token: window[Token],
        count: numberOfUsers,
        fields: FIELDS.join(','),
      },
    })
    .then(data => normalizeData(data))
    .then(data => dispatch(actionInitFriendsSuccess(data)))
    .catch(error => dispatch(actionInitFriendsError(error)));
};
