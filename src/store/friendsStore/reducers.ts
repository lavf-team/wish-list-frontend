import { IReducer, IUser, IWish } from 'config/interfaces';

import {
  GET_FRIEND_GIFTS_SUCCESS,
  GET_FRIEND_WISHES_SUCCESS,
  INIT_FRIENDS_ERROR,
  INIT_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_ERROR,
  SEARCH_FRIENDS_INIT,
  SEARCH_FRIENDS_SUCCESS,
} from './actions';

interface IFriendsStore {
  objects: {
    [id: string]: IUser;
  };
  friendsIds: Array<number>;
  searchFriendsIds: Array<number>;
  offset: number;
  allFriendsNumber: number;
  hasMore: boolean;
  isLoading: boolean;
  isSearchLoading: boolean;
  searchObjects: {
    [id: string]: IUser;
  };
  wishes: {
    [id: string]: IWish;
  };
  wishesIds: Array<string>;
  gifts: {
    [id: string]: IWish;
  };
  giftsIds: Array<string>;
}

const initialState: IFriendsStore = {
  objects: {},
  searchObjects: {},
  friendsIds: [],
  searchFriendsIds: [],
  offset: 0,
  allFriendsNumber: 0,
  hasMore: true,
  isLoading: true,
  isSearchLoading: false,
  wishes: {},
  wishesIds: [],
  gifts: {},
  giftsIds: [],
};

const friendsReducer: IReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case INIT_FRIENDS_SUCCESS:
      return {
        ...state,
        objects: {
          ...state.objects,
          ...payload.friends,
        },
        friendsIds: Array.from(new Set([...state.friendsIds, ...payload.ids])),
        offset: state.offset + payload.ids.length,
        hasMore: state.offset + payload.ids.length < payload.count,
        allFriendsNumber: payload.count,
        isLoading: false,
      };
    case INIT_FRIENDS_ERROR:
      console.log(type);
      return state;
    case SEARCH_FRIENDS_INIT:
      return {
        ...state,
        isSearchLoading: true,
      };
    case SEARCH_FRIENDS_SUCCESS:
      return {
        ...state,
        objects: {
          ...state.objects,
          ...payload.friends,
        },
        searchFriendsIds: [...payload.ids],
        searchObjects: {
          ...payload.friends,
        },
        isSearchLoading: false,
      };
    case SEARCH_FRIENDS_ERROR:
      console.log(type);
      return state;
    case GET_FRIEND_WISHES_SUCCESS:
      return {
        ...state,
        wishes: payload.wishes,
        wishesIds: payload.wishesIds,
      };
    case GET_FRIEND_GIFTS_SUCCESS:
      return {
        ...state,
        gifts: payload.gifts,
        giftsIds: payload.giftsIds,
      };
    default:
      return state;
  }
};

export default friendsReducer;
