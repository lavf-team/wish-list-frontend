import cn from 'classnames';
import React from 'react';
import Masonry from 'react-masonry-component';
import { withRouter } from 'react-router-dom';

import Wish from 'components/Wish';
import { wishSize } from 'components/Wish/config';
import { IWish } from 'config/interfaces';
import { getIsMobile } from 'utils/checkIsMobile';
import matchUrl, { route } from 'utils/matchUrl';

import './WishList.module.scss';

interface IProps {
  listIds: Array<number>;
  className?: string;
  match: { url: string };
  children?: React.Component;
  normalizer: (any) => any;
}

class WishList extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {};

  render() {
    const {
      listIds,
      className,
      match: { url },
      children,
      normalizer,
    } = this.props;

    const page = matchUrl(url);
    const isMobile = getIsMobile();

    return (
      <>
        {page === route.WISH_LIST.title && !isMobile ? (
          <Masonry className={className}>
            {listIds.map((curWish, i) => {
              const { info, onButtonClick, onEmojiClick } = normalizer(curWish);
              return (
                <Wish
                  styleName="wish-list__wish"
                  info={info}
                  id={curWish}
                  size={wishSize.FULL}
                  key={i}
                  onButtonClick={onButtonClick}
                  onEmojiClick={onEmojiClick}
                />
              );
            })}
          </Masonry>
        ) : (
          <div className={className} styleName="wish-list">
            {listIds.map((curWish, i) => {
              const { info, onButtonClick, onEmojiClick } = normalizer(curWish);
              return (
                <Wish
                  styleName={cn(
                    'wish-list__wish',
                    i === listIds.length - 1 && 'wish-list__wish_last'
                  )}
                  info={info}
                  id={curWish}
                  size={wishSize.FIXED}
                  key={i}
                  onButtonClick={onButtonClick}
                  onEmojiClick={onEmojiClick}
                />
              );
            })}
            <div styleName="wish-list__btn">{children}</div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(WishList);
