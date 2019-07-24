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
  list: Array<IWish>;
  className?: string;
  match: { url: string };
}

class WishList extends React.Component<IProps> {
  render() {
    const {
      list,
      className,
      match: { url },
    } = this.props;
    const page = matchUrl(url);
    const isMobile = getIsMobile();

    return (
      <>
        {page === route.WISH_LIST.title && !isMobile ? (
          <Masonry className={className}>
            {list.map((curWish, i) => (
              <Wish
                styleName="wish-list__wish"
                info={curWish}
                size={wishSize.FULL}
                key={i}
              />
            ))}
          </Masonry>
        ) : (
          <div className={className} styleName="wish-list">
            {list.map((curWish, i) => (
              <Wish
                styleName="wish-list__wish"
                info={curWish}
                size={wishSize.FIXED}
                key={i}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(WishList);
