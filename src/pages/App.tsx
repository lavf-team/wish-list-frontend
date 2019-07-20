import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Loader from 'components/Loader';
import { loaderSizes } from 'components/Loader/config';
import { actionInitToken, actionVkInitApp } from 'store/metaStore/actions';
import { route } from 'utils/matchUrl';

import './App.module.scss';
import FriendsPage from './FriendsPage';
import ProfilePage from './ProfilePage';
import WishListPage from './WishListPage';

interface IProps {
  isLoading: boolean;
  initVkApp: () => void;
  initToken: () => void;
}

class App extends React.Component<IProps> {
  public componentDidMount() {
    this.props.initVkApp();
    this.props.initToken();
  }

  public render() {
    const { isLoading } = this.props;

    return (
      <BrowserRouter>
        {isLoading ? (
          <Loader size={loaderSizes.LARGE} styleName="app__loader" />
        ) : (
          <div styleName="app">
            <Route path={route.FRIENDS.url} component={FriendsPage} />
            <Route path={route.WISH_LIST.url} component={WishListPage} />
            <Route path={route.PROFILE.url} component={ProfilePage} />
            <Route path={route.FRIEND.url} component={ProfilePage} />
            <Redirect to={route.WISH_LIST.url} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.meta.isLoading
});

const mapDispatchToProps = dispatch => ({
  initToken: () => dispatch(actionInitToken()),
  initVkApp: () => dispatch(actionVkInitApp())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
