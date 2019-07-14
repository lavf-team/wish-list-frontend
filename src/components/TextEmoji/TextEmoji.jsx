import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TextEmoji.module.scss';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class TextEmoji extends React.Component {
    onClick = () => this.props.onClick(this.props.title);

    render() {
        const {
            text,
            emoji,
            className = '',
            isActive = false,
            to,
        } = this.props;
        const textEmojiClassName = `${cn('text-emoji')} ${className}`;

        return (
            <div className={textEmojiClassName}>
                <Link
                    to={to}
                    onClick={this.onClick}
                    className={
                        cn('text-emoji__text',
                        isActive && 'text-emoji__text_active')}>
                    {text}
                    </Link>
                <img src={emoji} className={cn('text-emoji__img')}/>
            </div>
        );
    }
}