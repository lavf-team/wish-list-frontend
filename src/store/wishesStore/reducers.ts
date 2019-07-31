import { wishState } from 'components/Wish/config.ts';
import { IReducer } from 'config/interfaces';
import defaultWish1 from 'img/defaultWish1.jpg';
import defaultWish2 from 'img/defaultWish2.jpg';

import {DELETE_SEARCHED_CATALOG, GET_CATALOG_SUCCESS, SEARCH_CATALOG_SUCCESS} from './actions';

const initialState = {
  catalogIds: [],
  catalog: {},
  total: 0,
  // catalog: [
  //   {
  //     img: defaultWish1,
  //     title: 'MacBook Pro 2018 256GB',
  //     prize: '120 000 ₽',
  //     description:
  //       'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
  //     state: wishState.CAN_BE_ADDED,
  //   },
  //   {
  //     img: defaultWish2,
  //     title: 'iPhone XR 256GB',
  //     prize: '70 000 ₽',
  //     description: 'Мобильный телефон Apple iPhone XR 256GB (желтый)',
  //     state: wishState.CAN_BE_ADDED,
  //   },
  //   {
  //     img: defaultWish1,
  //     title: 'MacBook Pro 2018 256GB',
  //     prize: '120 000 ₽',
  //     description:
  //       'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
  //     state: wishState.CAN_BE_ADDED,
  //   },
  //   {
  //     img: defaultWish1,
  //     title: 'MacBook Pro 2018 256GB',
  //     prize: '120 000 ₽',
  //     description:
  //       'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
  //     state: wishState.CAN_BE_ADDED,
  //   },
  // ],
  usersWishes: {
    defaultId: [
      {
        img: defaultWish2,
        title: 'iPhone XR 256GB',
        prize: '70 000 ₽',
        description: 'Мобильный телефон Apple iPhone XR 256GB (желтый)',
        state: wishState.CAN_BE_DELETED_GIVEN,
      },
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
        state: wishState.CAN_BE_DELETED,
      },
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
        state: wishState.CAN_BE_DELETED,
      },
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
        state: wishState.CAN_BE_DELETED,
      },
      {
        img: defaultWish2,
        title: 'iPhone XR 256GB',
        prize: '70 000 ₽',
        description: 'Мобильный телефон Apple iPhone XR 256GB (желтый)',
        state: wishState.CAN_BE_DELETED_GIVEN,
      },
    ],
  },
  hasMore: false,
};

const wishesReducer: IReducer = (state = initialState, { type, payload }) => {
  console.log('payload', payload);
  switch (type) {
    case GET_CATALOG_SUCCESS:
      return {
        ...state,
        catalogIds: [...state.catalogIds, ...payload.catalogIds],
        catalog: { ...state.catalog, ...payload.catalog },
        total: payload.total,
        hasMore:
          payload.total > payload.catalogIds.length + state.catalogIds.length,
      };
    case SEARCH_CATALOG_SUCCESS:
      return {
        ...state,
        catalogIds: payload.catalogIds,
        catalog: payload.catalog,
        total: 0,
        hasMore: false,
      };
    case DELETE_SEARCHED_CATALOG:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default wishesReducer;
