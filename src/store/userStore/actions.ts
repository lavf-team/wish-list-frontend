import API from 'config/API';
import Requester from 'libs/Requester/Requester';

import {
  normalizeUser,
  normalizeUserGifts,
  normalizeUserWishes,
} from './normalizers';

import connect from '@vkontakte/vkui-connect-promise';

export const INIT_USER = 'INIT_USER';
export const INIT_USER_SUCCESS = 'INIT_USER_SUCCESS';
export const INIT_USER_ERROR = 'INIT_USER_ERROR';

export const GET_USER_WISHES = 'GET_USER_WISHES';
export const GET_USER_WISHES_SUCCESS = 'GET_USER_WISHES_SUCCESS';
export const GET_USER_WISHES_ERROR = 'GET_USER_WISHES_ERROR';

export const GET_USER_GIFTS = 'GET_USER_GIFTS';
export const GET_USER_GIFTS_SUCCESS = 'GET_USER_GIFTS_SUCCESS';
export const GET_USER_GIFTS_ERROR = 'GET_USER_GIFTS_ERROR';

export const ADD_USER_WISH = 'ADD_USER_WISH';

export const DELETE_USER_WISH = 'DELETE_USER_WISH';

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
      dispatch(actionGetUserWishes());
    })
    .catch(error => dispatch(actionInitUserError(error)));
};

export const actionGetUserWishesSuccess = payload => ({
  payload,
  type: GET_USER_WISHES_SUCCESS,
});

export const actionGetUserWishesError = payload => ({
  payload,
  type: GET_USER_WISHES_ERROR,
});

export const actionGetUserGiftsSuccess = payload => ({
  payload,
  type: GET_USER_GIFTS_SUCCESS,
});

export const actionGetUserGiftsError = payload => ({
  payload,
  type: GET_USER_GIFTS_ERROR,
});

export const actionGetUserWishes = () => async dispatch => {
  console.log(GET_USER_WISHES);

  const result = await Requester.get(API.userWishes());
  if (result.response) {
    const normalizedResult = normalizeUserWishes(result.response);
    dispatch(actionGetUserWishesSuccess(normalizedResult));
  } else {
    dispatch(actionGetUserWishesError(result.error));
  }
};

export const actionGetUserGifts = () => async dispatch => {
  console.log(GET_USER_GIFTS);

  const result = await Requester.get(API.userGifts());
  console.log(result);
  if (result.response) {
    const normalizedResult = normalizeUserGifts(result.response);
    dispatch(actionGetUserGiftsSuccess(normalizedResult));
  } else {
    dispatch(actionGetUserGiftsError(result.error));
  }
};

export const actionAddUserWish = productId => async dispatch => {
  console.log(ADD_USER_WISH);

  const result = await Requester.post(API.addUserWish(), {
    product_id: productId,
  });

  if (result.response) {
    dispatch(actionGetUserWishes());
  }
};

export const actionDeleteUserWish = productId => async dispatch => {
  console.log(DELETE_USER_WISH);

  const result = await Requester.delete(API.deleteUserWish(), {
    product_id: productId,
  });
  if (result.response) {
    dispatch(actionGetUserWishes());
  }
};
