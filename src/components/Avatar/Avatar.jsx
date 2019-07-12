import React from 'react';
import styles from './Avatar.module.scss';
import { avatarSize } from './config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Avatar extends React.Component {
    render() {
        const {
            avatar,
            size = avatarSize.SMALL,
            className = ''
        } = this.props;
        const avatarClassNames = `${className} ${cn('avatar', `avatar_${size}`)}`;

        return (
            <img className={avatarClassNames} src={avatar}/>
        );
    }
}