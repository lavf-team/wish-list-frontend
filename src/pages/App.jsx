import React from 'react';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import WishListPage from './WishListPage';
import {
    BrowserRouter,
    Route,
    Redirect
} from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { route } from 'utils/matchUrl';
import { actionInitToken, actionVkInitApp } from 'store/metaStore/actions';
import Loader from 'components/Loader';
import { loaderSizes } from 'components/Loader/config';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class App extends React.Component {
    componentDidMount() {
        this.props.initVkApp();
        this.props.initToken();
    }

    render() {
        const { isLoading } = this.props;

        return (
            <BrowserRouter>
                {isLoading ?
                    (<Loader
                        size={loaderSizes.LARGE}
                        className={cn('app__loader')} />) :
                    (
                        <div className={cn('app')}>
                            <Route path={route.FRIENDS.url}
                                   render={(props) =>
                                       <FriendsPage {...props} />}
                            />
                            <Route
                                path={route.WISH_LIST.url}
                                render={(props) =>
                                    <WishListPage
                                        {...props}
                                    />}
                            />
                            <Route
                                path={route.PROFILE.url}
                                render={(props) =>
                                    <ProfilePage
                                        {...props}
                                    />}
                            />
                            <Route
                                path={route.FRIEND.url}
                                render={(props) =>
                                    <ProfilePage
                                        {...props}
                                    />}
                            />
                            <Redirect to={route.WISH_LIST.url}/>
                        </div>
                    )}
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.meta.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    initVkApp: () => dispatch(actionVkInitApp()),
    initToken: () => dispatch(actionInitToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
