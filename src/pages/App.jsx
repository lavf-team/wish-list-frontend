import React from 'react';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import FriendsPage from './FriendsPage';
import FriendPage from './FriendPage';
import defaultUser from '../img/defaultUser.jpg';
import WishListPage from "./WishListPage/WishListPage";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { route } from '../utils/matchUrl';
import {actionInitUser} from "../store/userStore/actions";
import {actionVkInitApp, actionInitToken} from "../store/vkStore/actions";
import { actionInitFriends } from "../store/friendsStore/actions";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class App extends React.Component {
    state = {
        avatars: [
            defaultUser,
            defaultUser,
            defaultUser,
        ]
    };

    componentDidMount() {
        this.props.initVkApp();
        this.props.initUser();
        this.props.initToken();
        this.props.initFriends();
    }

    render() {
        return (
            <BrowserRouter>
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
                            <FriendPage
                                {...props}
                            />}
                    />
                    <Redirect to={route.WISH_LIST.url}/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    initUser: () => dispatch(actionInitUser()),
    initVkApp: () => dispatch(actionVkInitApp()),
    initToken: () => dispatch(actionInitToken()),
    initFriends: () => dispatch(actionInitFriends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
