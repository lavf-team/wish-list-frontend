import cn from 'classnames';
import React from 'react';

import { buttonSizes } from 'components/buttons/config';
import SimpleButton from 'components/buttons/SimpleButton';
import { IWish } from 'config/interfaces';

import { wishSize } from './config';
import './Wish.module.scss';

interface IProps {
  className?: string;
  info: IWish;
  size: wishSize;
}

export default class Wish extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    size: wishSize.FIXED,
  };

  render() {
    const {
      className,
      info: { img, title, prize, description },
      size,
    } = this.props;
    const isFixed = size === wishSize.FIXED;

    return (
      <div
        className={className}
        styleName={cn('wish', isFixed && `wish_${size}`)}
      >
        <img
          src={img}
          styleName={cn('wish__img', isFixed && `wish__img_${size}`)}
        />
        <div styleName="wish__title">{title}</div>
        <div styleName="wish__prize">{prize}</div>
        <div styleName="wish__description">{description}</div>
        <SimpleButton text={'Добавить в избранное'} size={buttonSizes.LARGE} />
      </div>
    );
  }
}
