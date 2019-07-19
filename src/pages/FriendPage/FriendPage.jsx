import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './FriendPage.module.scss';
import UserCard from '../../components/UserCard';
import img1 from '../../img/drooling.png';
import img2 from '../../img/glasses.png';
import { route } from '../../utils/matchUrl';
import WishList from '../../components/WishList';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class FriendPage extends React.Component {
    state = {
        links: {
            firstLink : {
                title: 'firstLink',
                text: 'Хочет получить',
                img: img1,
                isActive: false,
                to: route.FRIENDS_WISHES.create(this.props.match.params.id),
                state: this.props.location.state,
            },
            secondLink : {
                title: 'secondLink',
                text: 'Хочу подарить',
                img: img2,
                isActive: true,
                to: route.FRIENDS_GIFTS.create(this.props.match.params.id),
            }
        },
    };

    handleClick = (title) => {
        let active, inActive;
        const {
            links:
                {
                    firstLink: { title: firstTitle },
                    secondLink: { title: secondTitle }
                }
        } = this.state;

        if (title === firstTitle) {
            inActive = firstTitle;
            active = secondTitle
        } else {
            inActive = secondTitle;
            active = firstTitle
        }

        this.setState({
            links: {
                [inActive] : {
                    ...this.state.links[inActive],
                    isActive: false,
                },
                [active] : {
                    ...this.state.links[active],
                    isActive: true,
                }
            }
        })
    };

    render() {
        const { links } = this.state;
        const { friends } = this.props;
        const user = friends[this.props.match.params.id];

        return (
            <div className={cn('friend-page')}>
                <Header
                    className={cn('friend-page__header')}
                />
                <UserCard
                    className={cn('friend-page__user-card')}
                    user={user}
                    links={links}
                    onClick={this.handleClick}
                />
                <Route
                    path={route.FRIENDS_WISHES.url}
                    render={(props) =>
                        <WishList
                            {...props}
                            className={cn('friend-page__list')}
                        />
                    }
                />
                <Route
                    path={route.FRIENDS_GIFTS.url}
                    render={(props) =>
                        <WishList
                            {...props}
                            className={cn('friend-page__list')}
                        />
                    }
                />
            </div>

        );
    }
}

const mapStateToProps = state => ({
    friends: state.friends.objects,
});

export default connect(mapStateToProps)(FriendPage);
