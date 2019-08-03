import { buttonStyles } from 'components/buttons/config';
import { RoundEmojiStyles } from 'components/RoundEmoji/config';

export interface IWishState {
  title: string;
  text: string;
  style: buttonStyles;
  emojiInside: {
    has: boolean;
    url: any;
  };
  emojiOutside: {
    has: boolean;
    url: any;
    style: RoundEmojiStyles | null;
  };
}

export interface IWish {
  img: any;
  title: string;
  prize: string;
  description: string;
}

export interface IWishUser extends IWish {
  reserved: boolean;
}

export interface IGiftUser extends IWish {
  receiverId: string;
}

export interface IWishes {
  [id: string]: Array<IWish>;
}

export interface IUser {
  id: number | null;
  name: string;
  surname: string;
  avatar: string | null;
  isLoading: boolean;
}

export interface IInput {
  placeholder: string;
  value: string;
}

export interface ILink {
  title: string;
  text: string;
  img: any;
  isActive: boolean;
  to: string;
}

export type IReducer = (state: any, { payload: any, type: string }) => any;
