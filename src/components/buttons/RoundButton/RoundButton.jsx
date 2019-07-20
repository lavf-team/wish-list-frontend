import React from 'react';
import styles from './RoundButton.module.scss';
import { buttonStyles } from 'components/buttons/config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class RoundButton extends React.Component {
    render() {
        const {
            text = '',
            className = '',
            style = buttonStyles.LIGHT,
            onClick = () => {},
        } = this.props;
        const buttonClassName = `${className}
                ${cn('round-button', `round-button_${style}`)}`;

        return (
            <div onClick={onClick} className={buttonClassName}>
                {text}
            </div>
        );
    }
}