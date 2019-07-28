import React from 'react';
import { connect } from 'react-redux';

import AutoCompleteInput from 'components/AutoCompleteInput';
import Header from 'components/Header';
import Loader from 'components/Loader';
import WishList from 'components/WishList';
import { IInput, IWish } from 'config/interfaces';
import favoriteEmojiUrl from 'img/favoriteEmoji.svg';
import loveEmojiUrl from 'img/loveEmoji.svg';
import {
  actionGetCatalog,
  actionGetSearchCatalog,
} from 'store/wishesStore/actions';
import { getIsMobile } from 'utils/checkIsMobile';
import debounce from 'utils/debounce';

import './WishListPage.module.scss';

interface IProps {
  wishList: {
    [id: string]: IWish;
  };
  wishListIds: Array<number>;
  getCatalog: () => null;
  getSearchCatalog: (q: string) => void;
}

interface IState {
  input: IInput;
  isLoad: boolean;
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

  handleSearch = debounce(this.props.getSearchCatalog, 500);

  handleChangeValue = value => {
    this.setState({
      input: {
        ...this.state.input,
        value,
      },
    });

    this.handleSearch(value);
  };

  componentDidMount() {
    this.props.getCatalog();
  }

  render() {
    const {
      input: { placeholder, value },
      isSearch,
      isLoad,
    } = this.state;
    const { wishList, wishListIds } = this.props;
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
          />
        </div>
        {!isSearch ? (
          <div styleName="wish-list-page__content">
            {!isMobile && (
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
              list={wishList}
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
  wishList: state.wishes.catalog,
  wishListIds: state.wishes.catalogIds,
});

const mapDispatchToProps = dispatch => ({
  getCatalog: () => dispatch(actionGetCatalog()),
  getSearchCatalog: q => dispatch(actionGetSearchCatalog(q)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishListPage);
