import React from 'react';
import styles from './UserCard.module.scss';
import Avatar from '../Avatar/Avatar';
import TextEmoji from '../TextEmoji';
import SimpleButton from "../buttons/SimpleButton";
import { buttonStyles } from '../buttons/config.ts';
import {avatarSize} from "../Avatar/config";
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
                            to: firstPath
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
                            to={firstPath}
                            title={firstTitle}
                            onClick={onClick}
                        />
                        <TextEmoji
                            text={secondText}
                            emoji={secondImg}
                            isActive={isSecondLinkActive}
                            to={secondPath}
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