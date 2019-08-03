import API from 'config/API';

interface IProfilePageType {
  [id: string]: (
    id?: number
  ) => {
    title: string;
    url: string;
  };
}

export enum PROFILE_PAGE_TYPE {
  USER_WISHES = 'USER_WISHES',
  USER_GIFTS = 'USER_GIFTS',
  FRIEND_WISHES = 'FRIEND_WISHES',
  FRIEND_GIFTS = 'FRIEND_GIFTS',
}

export const PROFILE_PAGE: IProfilePageType = {
  USER_WISHES: () => ({
    title: 'USER_WISHES',
    url: API.userWishes(),
  }),
  USER_GIFTS: () => ({
    title: 'USER_GIFTS',
    url: API.userGifts(),
  }),
  FRIEND_WISHES: id => ({
    title: 'FRIEND_WISHES',
    url: API.friendWishes(id),
  }),
  FRIEND_GIFTS: id => ({
    title: 'FRIEND_GIFTS',
    url: API.friendGifts(id),
  }),
};
