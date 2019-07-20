import React from 'react';
import { withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import Wish from 'components/Wish';
import { wishSize } from 'components/Wish/config';
import styles from './WishList.module.scss';
import matchUrl, { route } from 'utils/matchUrl';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class WishList extends React.Component {
    render() {
        const {
            list,
            className = '',
            match : { url },
        } = this.props;
        const wishListClassName = `${cn('wish-list')} ${className}`;
        const page = matchUrl(url);
        const isMobile = window.getIsMobile();

        return (
            <>
                {page === route.WISH_LIST.title && !isMobile ?
                    (<Masonry
                        className={className}>
                        {list.map((curWish, i) => (
                            <Wish
                                className={cn('wish-list__wish')}
                                info={curWish}
                                size={wishSize.FULL}
                                key={i}
                            />
                        ))}
                    </Masonry>) :
                    (<div className={wishListClassName} >
                        {list.map((curWish, i) => (
                            <Wish
                                className={cn('wish-list__wish')}
                                info={curWish}
                                size={wishSize.FIXED}
                                key={i}
                            />
                        ))}
                    </div>)
                }
            </>
        );
    }
}

export default withRouter(WishList);