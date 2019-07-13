import React from 'react';
import styles from './TextEmoji.module.scss';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class User extends React.Component {
    render() {
        const { text, emoji } = this.props;
        return (
            <div className={cn('text-emoji')}>
                <button className={cn('text-emoji__font')}>{text}</button>
                <img src={emoji} className={cn('text-emoji__pic')}/>
            </div>
        );
    }
}