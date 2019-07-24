import { IReducer, IUser } from 'config/interfaces';

import { INIT_FRIENDS_ERROR, INIT_FRIENDS_SUCCESS } from './actions';

interface IFriendsStore {
  objects: {
    [id: string]: IUser;
  };
  friendsIds: Array<number>;
  offset: number;
  allFriendsNumber: number;
  hasMore: boolean;
  isLoading: boolean;
}

const initialState: IFriendsStore = {
  objects: {},
  friendsIds: [],
  offset: 0,
  allFriendsNumber: 0,
  hasMore: true,
  isLoading: true,
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
        friendsIds: [...state.friendsIds, ...payload.ids],
        offset: state.offset + payload.ids.length,
        hasMore: state.offset + payload.ids.length < payload.count,
        allFriendsNumber: payload.count,
        isLoading: false,
      };
    case INIT_FRIENDS_ERROR:
      console.log(INIT_FRIENDS_ERROR);
      return state;
    default:
      return state;
  }
};

export default friendsReducer;
