import React from 'react';
import styles from './Wish.module.scss';
import SimpleButton from 'components/buttons/SimpleButton';
import { buttonSizes } from 'components/buttons/config.ts';
import { wishSize } from './config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Wish extends React.Component{
    render() {
        const {
            className,
            info: { img, title, prize, description },
            size = wishSize.FIXED,
        } = this.props;
        const isFixed = size === wishSize.FIXED;
        const wishClassName = `${className} ${cn('wish', isFixed && `wish_${size}`)}`;

        return (
            <div className={wishClassName}>
                <img src={img} className={cn('wish__img', isFixed && `wish__img_${size}`)}/>
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