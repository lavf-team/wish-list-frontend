import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import './TextEmoji.module.scss';

interface IProps {
  text: string;
  emoji: any;
  className?: string;
  isActive?: boolean;
  to: string;
  title: string;
  onClick: (title: string) => null;
}

export default class TextEmoji extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    isActive: false,
  };

  onClick = () => this.props.onClick(this.props.title);

  render() {
    const { text, emoji, className, isActive, to } = this.props;

    return (
      <div className={className} styleName="text-emoji">
        <Link
          to={to}
          onClick={this.onClick}
          styleName={cn(
            'text-emoji__text',
            isActive && 'text-emoji__text_active'
          )}
        >
          {text}
        </Link>
        <img src={emoji} styleName="text-emoji__img" />
      </div>
    );
  }
}
