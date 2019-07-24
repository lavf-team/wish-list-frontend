import React from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Input from 'components/Input';
import Loader from 'components/Loader';
import WishList from 'components/WishList';
import { IInput, IWishes } from 'config/interfaces';
import { getIsMobile } from 'utils/checkIsMobile';

import './WishListPage.module.scss';

interface IProps {
  wishList: IWishes;
}

interface IState {
  input: IInput;
  isLoad: boolean;
  isSearch: boolean;
}

class WishListPage extends React.Component<IProps, IState> {
  state = {
    input: {
      type: 'text',
      placeholder: 'Введите название товара',
      value: '',
    },
    isLoad: false,
    isSearch: false,
  };

  handleChangeValue = value => {
    this.setState({
      input: {
        ...this.state.input,
        value,
      },
    });
  };

  render() {
    const {
      input: { type, placeholder, value },
      isSearch,
      isLoad,
    } = this.state;
    const { wishList } = this.props;
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
            <WishList
              styleName="wish-list-page__list"
              list={wishList.defaultId}
            />
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

const mapStateToProps = state => ({
  wishList: state.wishes,
});

export default connect(mapStateToProps)(WishListPage);
