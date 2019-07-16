import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Friend.module.scss';
import Avatar from '../Avatar';
import SimpleButton from "../buttons/SimpleButton";
import { buttonStyles } from '../buttons/config.ts';
import { avatarSize } from '../Avatar/config.ts';
import { route } from '../../utils/matchUrl';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Friend extends React.Component {
    render() {
        const {
            friend: {
                avatar,
                name,
                id,
                surname,
                wishes,
                gifts,
            },
            className,
        } = this.props;
        const friendClassName = `${className} ${cn('friend')}`;
        const isMobile = window.getIsMobile();

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
                                        pathname: route.FRIENDS_WISHES.create(id),
                                        state: {
                                            id,
                                            avatar,
                                            name,
                                            surname,
                                            gifts,
                                            wishes
                                        }
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
                                    pathname: route.FRIENDS_WISHES.create(id),
                                    state: {
                                        id,
                                        avatar,
                                        name,
                                        surname,
                                        gifts,
                                        wishes
                                    }
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