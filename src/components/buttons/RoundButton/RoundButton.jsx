import React from 'react';
import styles from './RoundButton.module.scss';
import { buttonStyles } from '../config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class RoundButton extends React.Component {
    render() {
        const { text = '', className = '', style = buttonStyles.LIGHT } = this.props;
        const buttonClassName = `${className}
                ${cn('round-button', `round-button_${style}`)}`;

        return (
            <div className={buttonClassName}>
                {text}
            </div>
        );
    }
}