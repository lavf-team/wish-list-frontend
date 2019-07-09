import React from 'react';
import styles from './SimpleButton.module.scss';
import { buttonStyles } from './config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class SimpleButton extends React.Component {
    render() {
        const {
            size = 'medium',
            text = '',
            style = buttonStyles.BLUE,
            className = '',
        } = this.props;

        const buttonClassName = `${className}
        ${cn(
            'simple-button',
            `simple-button_${size}`,
            `simple-button_${style}`
        )}`;

        return (
            <div className={buttonClassName}>
                <div className={cn('simple-button__text')}>{text}</div>
            </div>
        );
    }
}