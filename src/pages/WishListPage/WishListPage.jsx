import React from 'react';
import Masonry from 'react-masonry-component';
import styles from './WishListPage.module.scss';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Wish from '../../components/Wish';
import defaultWish1 from '../../img/defaultWish1.jpg';
import defaultWish2 from '../../img/defaultWish2.jpg';
import defaultUser from '../../img/defaultUser.jpg';
import Loader from "../../components/Loader/Loader";
import {wishSize} from "../../components/Wish/config";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class WishListPage extends React.Component {
    state = {
        input: {
            type: 'text',
            placeholder: 'Введите название товара',
            value: '',
        },
        wishList: [
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
        avatars: [
            defaultUser,
            defaultUser,
            defaultUser,
        ],
        isLoad: false,
        isSearch: false,
    };

    handleChangeValue = (value) => {
        this.setState({
            input: {
                ...this.state.input,
                value,
            }
        })
    };

    render() {
        const { user } = this.props;
        const {
            input : { type, placeholder, value },
            isSearch,
            isLoad,
            wishList,
            avatars
        } = this.state;
        const isMobile = window.getIsMobile();

        return (
            <div className={cn('wish-list')}>
                <Header
                    className={cn('wish-list__header')}
                    user={user}
                    avatars={avatars}
                />
                <div className={cn('wish-list__title')}>Wishlist 😍</div>
                <div className={cn('wish-list__input-container')}>
                    <Input
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        className={cn('wish-list__input')}
                        onChange={this.handleChangeValue}
                    />
                </div>
                {!isSearch ? (
                    <div className={cn('wish-list__content')}>
                        {!isMobile ?
                            (<>
                                <div className={cn('wish-list__popular-text')}>
                                    Популярное 🤩
                                </div>
                                <Masonry
                                    className={cn('wish-list__list')}
                                >
                                    {wishList.map((curWish, i) => (
                                        <Wish
                                            className={cn('wish-list__wish')}
                                            info={curWish}
                                            size={wishSize.FULL}
                                            key={i}
                                        />
                                    ))}
                                    </Masonry>
                                </>) :
                            (<div className={cn('wish-list__list')} >
                                {wishList.map((curWish, i) => (
                                    <Wish
                                        className={cn('wish-list__wish')}
                                        info={curWish}
                                        size={wishSize.FIXED}
                                        key={i}
                                    />
                                ))}
                            </div>)
                        }
                    </div>
                ) : null}
                {isLoad &&
                    (<div className={cn('wish-list__loader-container')}>
                            <Loader />
                    </div>
                    )}
            </div>

        );
    }
}