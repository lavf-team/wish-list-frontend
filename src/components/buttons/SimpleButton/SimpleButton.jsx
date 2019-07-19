import React from 'react';
import styles from './SimpleButton.module.scss';
import { buttonStyles, buttonSizes } from '../config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class SimpleButton extends React.Component {
    render() {
        const {
            size = buttonSizes.MEDIUM,
            text = '',
            style = buttonStyles.BLUE,
            className = '',
            onClick = () => {},
        } = this.props;

        const buttonClassName = `${className}
        ${cn(
            'simple-button',
            `simple-button_${size}`,
            `simple-button_${style}`
        )}`;

        return (
            <div onClick={onClick} className={buttonClassName}>
                <div className={cn('simple-button__text')}>{text}</div>
            </div>
        );
    }
}