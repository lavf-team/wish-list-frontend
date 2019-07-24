export interface IWish {
  img: any;
  title: string;
  prize: string;
  description: string;
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
  type: string;
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
