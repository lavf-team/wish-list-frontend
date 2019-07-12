import React from 'react';
import styles from './Wish.module.scss';
import SimpleButton from "../buttons/SimpleButton/SimpleButton";
import { buttonSizes } from '../buttons/SimpleButton/config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Wish extends React.Component{
    render() {
        const {
            className,
            info: { img, title, prize, description }
        } = this.props;
        const wishClassName = `${className} ${cn('wish')}`;
        return (
            <div className={wishClassName}>
                <img src={img} className={cn('wish__img')}/>
                <div className={cn('wish__title')}>{title}</div>
                <div className={cn('wish__prize')}>{prize}</div>
                <div className={cn('wish__description')}>{description}</div>
                <SimpleButton
                    text={'Добавить в избранное'}
                    className={cn('wish__button')}
                    size={buttonSizes.LARGE}
                />
            </div>
        );
    }
}