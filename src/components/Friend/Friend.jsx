import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Friend.module.scss';
import Avatar from 'components/Avatar';
import SimpleButton from 'components/buttons/SimpleButton';
import { buttonStyles } from 'components/buttons/config.ts';
import { avatarSize } from 'components/Avatar/config.ts';
import { route } from 'utils/matchUrl';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class Friend extends React.Component {
    render() {
        const {
            friendId,
            friends,
            className,
        } = this.props;
        const friendClassName = `${className} ${cn('friend')}`;
        const isMobile = window.getIsMobile();
        const { name, surname, avatar } = friends[friendId];

        return (
            <div className={friendClassName}>
                <Avatar
                    avatar={avatar}
                    size={isMobile ? avatarSize.LARGE : avatarSize.MEDIUM}/>
                {!isMobile ?
                    (<div className={cn('friend__info')}>
                            <div className={cn('friend__name')}>{name + ' ' + surname}</div>
                            <Link
                                to={
                                    {
                                        pathname: route.FRIENDS_WISHES.create(friendId),
                                    }
                                }
                                >
                                <SimpleButton
                                    text={'Узнать что подарить'}
                                    style={buttonStyles.BLUE}
                                />
                            </Link>

                    </div>) :
                    (<>
                        <div className={cn('friend__name')}>{name + ' ' + surname}</div>
                        <Link
                            to={
                                {
                                    pathname: route.FRIENDS_WISHES.create(friendId),
                                }
                            }
                        >
                        <SimpleButton
                            text={'Узнать что подарить'}
                            style={buttonStyles.BLUE}
                            className={cn('friend__button')}
                        />
                        </Link>
                    </>)
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    friends: state.friends.objects,
});

export default connect(mapStateToProps)(Friend);