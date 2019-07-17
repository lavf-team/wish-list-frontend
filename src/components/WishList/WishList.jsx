import React from 'react';
import { withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import Wish from "../Wish/Wish";
import { wishSize } from '../Wish/config';
import styles from './WishList.module.scss';
import matchUrl, { route } from '../../utils/matchUrl';
import defaultWish1 from "../../img/defaultWish1.jpg";
import defaultWish2 from "../../img/defaultWish2.jpg";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

class WishList extends React.Component {
    render() {
        const {
            list = [
            {
                img: defaultWish1,
                title: 'MacBook Pro 2018 256GB',
                prize: '120 000 ₽',
                description: 'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
            },
            {
                img: defaultWish2,
                title: 'iPhone XR 256GB',
                prize: '70 000 ₽',
                description: 'Мобильный телефон Apple iPhone XR 256GB (желтый)',
            },
            {
                img: defaultWish1,
                title: 'MacBook Pro 2018 256GB',
                prize: '120 000 ₽',
                description: 'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
            },
            {
                img: defaultWish1,
                title: 'MacBook Pro 2018 256GB',
                prize: '120 000 ₽',
                description: 'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
            },
            {
                img: defaultWish1,
                title: 'MacBook Pro 2018 256GB',
                prize: '120 000 ₽',
                description: 'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
            },
            {
                img: defaultWish1,
                title: 'MacBook Pro 2018 256GB',
                prize: '120 000 ₽',
                description: 'Ноутбук Apple MacBook Pro 13.3" Core i5 2,4 ГГц, 8 ГБ, 256 ГБ SSD, Iris Plus 655, Touch Bar (серый космос)',
            }
            ],
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