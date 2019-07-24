import React from 'react';

import { loaderSizes } from './config';
import loader from './img/loader.svg';
import './Loader.module.scss';

interface IProps {
  className?: string;
  size?: loaderSizes;
}

export default class Loader extends React.Component<IProps> {
  static defaultProps = {
    className: null,
    size: loaderSizes.MEDIUM,
  };

  public render() {
    const { className, size } = this.props;

    return (
      <img
        className={className}
        styleName={`loader loader_${size}`}
        src={loader}
      />
    );
  }
}
