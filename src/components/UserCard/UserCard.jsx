import React from 'react';
import styles from './UserCard.module.scss';
import Avatar from 'components/Avatar';
import TextEmoji from 'components/TextEmoji';
import SimpleButton from 'components/buttons/SimpleButton';
import { buttonStyles } from 'components/buttons/config.ts';
import { avatarSize } from 'components/Avatar/config';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class UserCard extends React.Component {
    render() {
        const {
            user : { avatar, name, surname },
            links : {
                firstLink:
                        {
                            title: firstTitle,
                            text: firstText,
                            img: firstImg,
                            isActive: isFirstLinkActive,
                            to: firstPath,
                            state,
                        },
                secondLink:
                        {
                            title: secondTitle,
                            text: secondText,
                            img: secondImg,
                            isActive: isSecondLinkActive,
                            to: secondPath
                        }
                    },
            className,
            onClick,
        } = this.props;
        const userCardClassNames = `${className} ${cn('user-card')}`;
        const isMobile = window.getIsMobile();

        return (
            <div className={userCardClassNames}>
                <Avatar
                    avatar={avatar}
                    size={isMobile ? avatarSize.SMALL_LARGE : avatarSize.MEDIUM_LARGE}/>
                <div className={cn('user-card__info')}>
                    <div className={cn('user-card__fullname')}>
                       {name + ' ' + surname}
                    </div>
                    <div className={cn('user-card__wish')}>
                        <TextEmoji
                            className={cn('user-card__text-emoji')}
                            text={firstText}
                            emoji={firstImg}
                            isActive={isFirstLinkActive}
                            to={{
                                pathname: firstPath,
                                state: state
                            }}
                            title={firstTitle}
                            onClick={onClick}
                        />
                        <TextEmoji
                            text={secondText}
                            emoji={secondImg}
                            isActive={isSecondLinkActive}
                            to={{
                                pathname: secondPath,
                                state: state
                            }}
                            title={secondTitle}
                            onClick={onClick}
                        />
                    </div>
                    {!isMobile ?
                        (<SimpleButton
                            text={'Поделиться'}
                            style={buttonStyles.BLUE}
                        />) :
                        (<div className={cn('user-card__share-button')}>

                        </div>)
                    }

                </div>
            </div>
        );
    }
}