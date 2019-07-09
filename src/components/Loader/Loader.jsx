import React from 'react';
import styles from './Loader.module.scss';
import loader from './img/loader.svg';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Loader extends React.Component {
    render() {
        const { className = '' } = this.props;
        const loaderClassName = `${cn('loader')} ${className}`;

        return (
            <img className={loaderClassName} src={loader}/>
        );
    }
}