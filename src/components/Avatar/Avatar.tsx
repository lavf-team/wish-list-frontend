import React from 'react';

import Loader from 'components/Loader';

import './Avatar.module.scss';
import { avatarSize } from './config';

interface IProps {
  avatar: string;
  size?: avatarSize;
  className?: string;
  isLoading?: boolean;
}

export default class Avatar extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    size: avatarSize.SMALL,
    isLoading: false
  };

  render() {
    const { avatar, size, className, isLoading } = this.props;

    return (
      <div className={className}>
        {isLoading ? (
          <Loader />
        ) : (
          <img styleName={`avatar avatar_${size}`} src={avatar} />
        )}
      </div>
    );
  }
}
