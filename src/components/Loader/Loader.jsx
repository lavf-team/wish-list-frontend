import React from 'react';
import styles from './Loader.module.scss';
import loader from './img/loader.svg';
import { loaderSizes } from './config';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Loader extends React.Component {
    render() {
        const {
            className = '',
            size = loaderSizes.MEDIUM,
        } = this.props;
        const loaderClassName = `${cn('loader', `loader_${size}`)} ${className}`;

        return (
            <img className={loaderClassName} src={loader}/>
        );
    }
}