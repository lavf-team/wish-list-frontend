import API from 'config/API';
import Requester from 'libs/Requester/Requester';
import {
  API_VERSION,
  LOADED_FRIENDS_NUMBER,
  Token,
  VK_API_METHODS,
  VK_CALL_API,
} from 'store/config';

import {
  normalizeData,
  normalizeFriendGifts,
  normalizeFriendWishes,
} from './normalizers';

import connect from '@vkontakte/vkui-connect-promise';
import {actionGetUserGifts} from 'store/userStore/actions';

export const INIT_FRIENDS = 'INIT_FRIENDS';
export const INIT_FRIENDS_SUCCESS = 'INIT_FRIENDS_SUCCESS';
export const INIT_FRIENDS_ERROR = 'INIT_FRIENDS_ERROR';

export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';
export const SEARCH_FRIENDS_INIT = 'SEARCH_FRIENDS_INIT';
export const SEARCH_FRIENDS_SUCCESS = 'SEARCH_FRIENDS_SUCCESS';
export const SEARCH_FRIENDS_ERROR = 'SEARCH_FRIENDS_ERROR';

export const GET_FRIEND_WISHES = 'GET_FRIEND_WISHES';
export const GET_FRIEND_WISHES_SUCCESS = 'GET_FRIEND_WISHES_SUCCESS';
export const GET_FRIEND_WISHES_ERROR = 'GET_FRIEND_WISHES_ERROR';

export const GET_FRIEND_GIFTS = 'GET_FRIEND_GIFTS';
export const GET_FRIEND_GIFTS_SUCCESS = 'GET_FRIEND_GIFTS_SUCCESS';
export const GET_FRIEND_GIFTS_ERROR = 'GET_FRIEND_GIFTS_ERROR';

export const GIVE_GIFT_TO_FRIEND = 'GIVE_GIFT_TO_FRIEND';
export const REFUSE_GIVE_GIFT_TO_FRIEND = 'REFUSE_GIVE_GIFT_TO_FRIEND';

export const actionInitFriendsSuccess = payload => ({
  payload,
  type: INIT_FRIENDS_SUCCESS,
});

export const actionInitFriendsError = payload => ({
  payload,
  type: INIT_FRIENDS_ERROR,
});

export const actionSearchFriendsInit = () => ({
  payload: null,
  type: SEARCH_FRIENDS_INIT,
});

export const actionSearchFriendsSuccess = payload => ({
  payload,
  type: SEARCH_FRIENDS_SUCCESS,
});

export const actionSearchFriendsError = payload => ({
  payload,
  type: SEARCH_FRIENDS_ERROR,
});

export const actionGetFriendWishesSuccess = payload => ({
  payload,
  type: GET_FRIEND_WISHES_SUCCESS,
});

export const actionGetFriendWishesError = payload => ({
  payload,
  type: GET_FRIEND_WISHES_ERROR,
});

export const actionGetFriendGiftsSuccess = payload => ({
  payload,
  type: GET_FRIEND_GIFTS_SUCCESS,
});

export const actionGetFriendGiftsError = payload => ({
  payload,
  type: GET_FRIEND_GIFTS_ERROR,
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

export const actionSearchFriends = value => dispatch => {
  console.log(SEARCH_FRIENDS);
  const FIELDS = ['photo_200_orig'];

  connect
    .send(VK_CALL_API, {
      method: VK_API_METHODS.FRIENDS_SEARCH,
      params: {
        q: value,
        fields: FIELDS.join(','),
        v: API_VERSION,
        access_token: window[Token],
      },
    })
    .then(data => normalizeData(data))
    .then(data => dispatch(actionSearchFriendsSuccess(data)))
    .catch(error => dispatch(actionSearchFriendsError(error)));
};

export const actionGetFriendWishes = id => async dispatch => {
  console.log(GET_FRIEND_WISHES);

  const result = await Requester.get(API.friendWishes(id));
  if (result.response) {
    const normalizedResult = normalizeFriendWishes(result.response);
    console.log(normalizedResult);
    dispatch(actionGetFriendWishesSuccess(normalizedResult));
  } else {
    dispatch(actionGetFriendWishesError(result.error));
  }
};

export const actionGetFriendGifts = id => async dispatch => {
  console.log(GET_FRIEND_GIFTS);

  const result = await Requester.get(API.friendGifts(id));

  if (result.response) {
    const normalizedResult = normalizeFriendGifts(result.response);
    dispatch(actionGetFriendGiftsSuccess(normalizedResult));
  } else {
    dispatch(actionGetFriendGiftsError(result.error));
  }
};

export const actionGiveGiftToFriend = (
  productId,
  receiverId
) => async dispatch => {
  console.log(GIVE_GIFT_TO_FRIEND);

  const result = await Requester.post(API.giveGiftToFriend(), {
    product_id: productId,
    dest_id: +receiverId,
  });

  if (result.response) {
    dispatch(actionGetFriendWishes(receiverId));
  }
};

export const actionRefuseGiveGiftToFriend = (
  productId,
  receiverId
) => async dispatch => {
  console.log(REFUSE_GIVE_GIFT_TO_FRIEND);

  await Requester.delete(API.refuseGiveGiftToFriend(), {
    product_id: productId,
    dest_id: +receiverId,
  });

  dispatch(actionGetFriendWishes(receiverId));
  dispatch(actionGetFriendGifts(receiverId));
  dispatch(actionGetUserGifts());
};
