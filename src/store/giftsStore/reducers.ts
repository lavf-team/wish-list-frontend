import { wishState } from 'components/Wish/config';
import { IReducer, IWishes } from 'config/interfaces';
import defaultWish1 from 'img/defaultWish1.jpg';
import defaultWish2 from 'img/defaultWish2.jpg';

const initialState: IWishes = {
  defaultId: [
    {
      img: defaultWish1,
      title: 'MacBook Pro 2018 256GB',
      prize: '120 000 ₽',
      description:
        'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
      state: wishState.CAN_BE_ADDED,
    },
    {
      img: defaultWish2,
      title: 'iPhone XR 256GB',
      prize: '70 000 ₽',
      description: 'Мобильный телефон Apple iPhone XR 256GB (желтый)',
      state: wishState.CAN_BE_ADDED,
    },
    {
      img: defaultWish1,
      title: 'MacBook Pro 2018 256GB',
      prize: '120 000 ₽',
      description:
        'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
      state: wishState.CAN_BE_ADDED,
    },
    {
      img: defaultWish1,
      title: 'MacBook Pro 2018 256GB',
      prize: '120 000 ₽',
      description:
        'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
      state: wishState.CAN_BE_ADDED,
    },
  ],
};

const giftsReducer: IReducer = (state = initialState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default giftsReducer;
