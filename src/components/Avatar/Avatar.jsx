import React from 'react';
import styles from './Avatar.module.scss';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Avatar extends React.Component {
    render() {
        const { avatar, size = 'small', overlay = ''} = this.props;

        return (
            <img className={cn('avatar', `avatar_${size}`, `avatar_${overlay}`)} src={avatar}/>
        );
    }
}