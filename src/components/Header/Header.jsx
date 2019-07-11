import React from 'react';
import Avatar from '../Avatar';
import styles from './Header.module.scss';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Header extends React.Component {
    render() {
        const { user : { name, surname, avatar }} = this.props;
        const isMobile = window.getIsMobile();

        return (
            <div className={cn('header')}>
                <Avatar avatar={avatar}/>
                <button className={cn('header__nickname')}>{isMobile ? name : `${name} ${surname}`}</button>
                <button className={cn('header__back-link')}>{ isMobile ? 'Поиск' : 'Вернуться к поиску'}</button>
            </div>
        );
    }
}