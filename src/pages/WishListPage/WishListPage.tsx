import React from 'react';
import { connect } from 'react-redux';

import AutoCompleteInput from 'components/AutoCompleteInput';
import { buttonStyles } from 'components/buttons/config';
import RoundButton from 'components/buttons/RoundButton/RoundButton';
import SimpleButton from 'components/buttons/SimpleButton/SimpleButton';
import Header from 'components/Header';
import Loader from 'components/Loader';
import { loaderSizes } from 'components/Loader/config';
import WishList from 'components/WishList';
import API from 'config/API';
import { IInput, IWish, IWishUser } from 'config/interfaces';
import favoriteEmojiUrl from 'img/favoriteEmoji.svg';
import loveEmojiUrl from 'img/loveEmoji.svg';
import {
  actionAddUserWish,
  actionDeleteUserWish,
} from 'store/userStore/actions';
import {
  actionDeleteSearchedCatalog,
  actionGetCatalog,
  actionSearchCatalog,
} from 'store/wishesStore/actions';
import { getIsMobile } from 'utils/checkIsMobile';

import { normalizeSuggest } from './utils/normalizers';
import './WishListPage.module.scss';

const LIMIT_PRODUCTS = 9;

interface IProps {
  wishList: {
    [id: string]: IWish;
  };
  wishListIds: Array<number>;
  getCatalog: ({ start, limit: number }) => null;
  getSearchedCatalog: (q: string) => void;
  deleteSearchedCatalog: () => void;
  addUserWishes: (number) => any;
  deleteUserWish: (string) => any;
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  userWishes: {
    [id: string]: IWishUser;
  };
}

interface IState {
  input: IInput;
  isSearch: boolean;
}

class WishListPage extends React.Component<IProps, IState> {
  state = {
    input: {
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

  getCatalogParams = () => {
    const { wishListIds, total } = this.props;

    return {
      start: wishListIds.length,
      limit:
        total - wishListIds.length < LIMIT_PRODUCTS &&
        total - wishListIds.length !== 0
          ? total - wishListIds.length
          : LIMIT_PRODUCTS,
    };
  };

  handleSearch = q => {
    if (!(q && q.trim().length)) {
      this.props.deleteSearchedCatalog();
      this.props.getCatalog(this.getCatalogParams());
      this.setState({
        isSearch: false,
      });
    } else {
      this.props.getSearchedCatalog(q);
      this.setState({
        isSearch: true,
      });
    }
  };

  handleCatalog = ({ start, limit }) => this.props.getCatalog({ start, limit });

  handleButtonElseClick = () => {
    this.handleCatalog(this.getCatalogParams());
  };

  handleAddingWish = productId => async () => {
    this.props.addUserWishes(productId);
  };

  handleDeleteWish = productId => async () => {
    this.props.deleteUserWish(productId);
  };

  componentDidMount() {
    this.handleCatalog(this.getCatalogParams());
  }

  normalizeWishList = id => {
    const { userWishes, wishList } = this.props;
    const hasIdInUserWishes = id in userWishes;
    return {
      info: hasIdInUserWishes ? userWishes[id] : wishList[id],
      onButtonClick: hasIdInUserWishes
        ? this.handleDeleteWish
        : this.handleAddingWish,
    };
  };

  render() {
    const {
      input: { placeholder, value },
      isSearch,
    } = this.state;
    const { wishListIds, hasMore, isLoading } = this.props;
    const isMobile = getIsMobile();

    return (
      <div styleName="wish-list-page">
        <Header styleName="wish-list-page__header" />
        <div styleName="wish-list-page__title">
          Wishlist
          <img styleName="wish-list-page__love-emoji" src={loveEmojiUrl} />
        </div>
        <div styleName="wish-list-page__input-container">
          <AutoCompleteInput
            placeholder={placeholder}
            value={value}
            styleName="wish-list-page__input"
            onChange={this.handleChangeValue}
            onSearch={this.handleSearch}
            normalizer={normalizeSuggest}
            url={API.searchProducts}
          />
        </div>
        {isLoading ? (
          <div styleName="wish-list-page__loader-container">
            <Loader size={loaderSizes.LARGE} />
          </div>
        ) : (
          <div styleName="wish-list-page__content">
            {!isMobile && !isSearch && (
              <div styleName="wish-list-page__popular-text">
                Популярное
                <img
                  src={favoriteEmojiUrl}
                  styleName="wish-list-page__favorite-emoji"
                />
              </div>
            )}
            <WishList
              styleName="wish-list-page__list"
              listIds={wishListIds}
              normalizer={this.normalizeWishList}
            >
              {isMobile && hasMore && (
                <RoundButton
                  onClick={this.handleButtonElseClick}
                  text={'Загрузить еще'}
                />
              )}
            </WishList>
            {hasMore && (
              <div styleName="wish-list-page__btn-container">
                {!isMobile && (
                  <SimpleButton
                    onClick={this.handleButtonElseClick}
                    text={'Показать еще'}
                    style={buttonStyles.LIGHT}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    this.props.deleteSearchedCatalog();
    this.setState({
      isSearch: false,
    });
  }
}

const mapStateToProps = state => ({
  wishList: state.wishes.catalog,
  wishListIds: state.wishes.catalogIds,
  total: state.wishes.total,
  hasMore: state.wishes.hasMore,
  isLoading: state.wishes.isLoading,
  userWishes: state.user.wishes,
});

const mapDispatchToProps = {
  getCatalog: actionGetCatalog,
  getSearchedCatalog: actionSearchCatalog,
  deleteSearchedCatalog: actionDeleteSearchedCatalog,
  addUserWishes: actionAddUserWish,
  deleteUserWish: actionDeleteUserWish,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishListPage);
