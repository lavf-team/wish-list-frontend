import React from 'react';
import styles from './Wish.module.scss';
import defaultUser from '../../img/defaultUser.jpg';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Wish extends React.Component{
    render() {
        const { className } = this.props;
        const wishClassName = `${className} ${cn('wish')}`;
        return (
            <div className={wishClassName}>
            </div>
        );
    }
}