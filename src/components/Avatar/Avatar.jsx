import React from 'react';
import styles from './Avatar.module.scss';
import { avatarSize } from './config.ts';
import Loader from 'components/Loader';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Avatar extends React.Component {
    render() {
        const {
            avatar,
            size = avatarSize.SMALL,
            className = '',
            isLoading = false,
        } = this.props;

        return (
            <div className={className}>
            {isLoading ?
                (<Loader/>) :
                (<img className={cn('avatar', `avatar_${size}`)} src={avatar}/>)}
            </div>
        );
    }
}