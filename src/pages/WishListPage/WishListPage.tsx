import React from 'react';

import Header from 'components/Header';
import Input from 'components/Input';
import Loader from 'components/Loader';
import WishList from 'components/WishList';
import defaultWish1 from 'img/defaultWish1.jpg';
import defaultWish2 from 'img/defaultWish2.jpg';
import { getIsMobile } from 'utils/checkIsMobile';

import './WishListPage.module.scss';

export default class WishListPage extends React.Component {
  state = {
    input: {
      type: 'text',
      placeholder: 'Введите название товара',
      value: ''
    },
    wishList: [
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)'
      },
      {
        img: defaultWish2,
        title: 'iPhone XR 256GB',
        prize: '70 000 ₽',
        description: 'Мобильный телефон Apple iPhone XR 256GB (желтый)'
      },
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)'
      },
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)'
      },
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)'
      },
      {
        img: defaultWish1,
        title: 'MacBook Pro 2018 256GB',
        prize: '120 000 ₽',
        description:
          'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)'
      }
    ],
    isLoad: false,
    isSearch: false
  };

  handleChangeValue = value => {
    this.setState({
      input: {
        ...this.state.input,
        value
      }
    });
  };

  render() {
    const {
      input: { type, placeholder, value },
      isSearch,
      isLoad,
      wishList
    } = this.state;
    const isMobile = getIsMobile();

    return (
      <div styleName="wish-list-page">
        <Header styleName="wish-list-page__header" />
        <div styleName="wish-list-page__title">Wishlist 😍</div>
        <div styleName="wish-list-page__input-container">
          <Input
            placeholder={placeholder}
            type={type}
            value={value}
            styleName="wish-list-page__input"
            onChange={this.handleChangeValue}
          />
        </div>
        {!isSearch ? (
          <div styleName="wish-list-page__content">
            {!isMobile && (
              <div styleName="wish-list-page__popular-text">Популярное 🤩</div>
            )}
            <WishList styleName="wish-list-page__list" list={wishList} />
          </div>
        ) : null}
        {isLoad && (
          <div styleName="wish-list-page__loader-container">
            <Loader />
          </div>
        )}
      </div>
    );
  }
}
