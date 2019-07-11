import React from 'react';
import Avatar from '../Avatar';
import styles from './Header.module.scss';
import {switchCase} from "@babel/types";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Header extends React.Component {
    render() {
        const { page, user : { name, surname, avatar }} = this.props;
        const isMobile = window.getIsMobile();

        switch(page) {
            case 'FRIENDS': {
                return (
                    <div className={cn('header')}>
                        <Avatar avatar={avatar}/>
                        <button className={cn('header__nickname')}>{isMobile ? name : `${name} ${surname}`}</button>
                        <button className={`${cn('header__back-link')} ${cn('header_right')}`}>
                            { isMobile ? 'Поиск' : 'Вернуться к поиску'}
                        </button>
                    </div>
                );
            }
            case 'MYPAGE':
            {
                return (
                    <div className={cn('header')}>
                        <button className={cn('header__back-link')}>
                            { isMobile ? 'Поиск' : 'Вернуться к поиску'}
                        </button>

                        <div className={cn('header_right')}>
                            <button className={`${cn('header__my-friends')} `}>Мои друзья</button>
                            <div className={cn('header__avatars-block')}>
                                <Avatar avatar={avatar} overlay='overlay'/>
                                <Avatar avatar={avatar} overlay='overlay'/>
                                <Avatar avatar={avatar} overlay='overlay'/>
                            </div>
                        </div>
                    </div>
                );
            }
            default: {
                return(<div></div>);
            }

        }

    }
}