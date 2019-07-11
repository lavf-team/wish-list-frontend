import React from 'react';
import styles from './WishListPage.module.scss';
import Header from "../../components/Header/Header";
import { Pages } from '../config.ts';
import Input from "../../components/Input/Input";
import Wish from "../../components/Wish/Wish";
import Masonry from 'react-masonry-component';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

const masonryOptions = {
    transitionDuration: 1
};

export default class WishListPage extends React.Component {
    state = {
        input: {
            type: 'text',
            placeholder: 'Введите название товара',
            value: '',
        },
        wishList: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ],
        isLoad: true,
        isSearch: false,
    };

    render() {
        const { user } = this.props;
        const {
            input : { type, placeholder, value },
            isSearch,
            isLoad,
            wishList,
        } = this.state;

        return (
            <div className={cn('wish-list')}>
                <Header page={Pages.WISH_LIST} user={user} />
                <div className={cn('wish-list__title')}>Wishlist 😍</div>
                <Input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    className={cn('wish-list__input')}
                    onChange={this.handleChangeValue}
                />
                {!isSearch ? (
                    <div className={cn('wish-list__content')}>
                        <div className={cn('wish-list__popular-text')}>
                            Популярное 🤩
                        </div>
                        <Masonry
                            className={cn('wish-list__list')}
                            options={masonryOptions}
                        >
                            {wishList.map(() => (
                                <Wish className={cn('wish-list__wish')}/>
                            ))}
                        </Masonry>
                    </div>
                ) : null}
            </div>

        );
    }
}