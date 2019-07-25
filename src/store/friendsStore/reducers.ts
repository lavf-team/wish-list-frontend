import { IReducer, IUser } from 'config/interfaces';

import {
  INIT_FRIENDS_ERROR,
  INIT_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_ERROR,
  SEARCH_FRIENDS_INIT,
  SEARCH_FRIENDS_SUCCESS
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
        friendsIds: Array.from(new Set([...state.friendsIds, ...payload.ids])),
        offset: state.offset + payload.ids.length,
        hasMore: state.offset + payload.ids.length < state.allFriendsNumber,
        searchFriendsIds: [...payload.ids],
        searchObjects: {
          ...payload.friends,
        },
        isSearchLoading: false,
      };
    case SEARCH_FRIENDS_ERROR:
      console.log(type);
      return state;
    default:
      return state;
  }
};

export default friendsReducer;
