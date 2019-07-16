import React from 'react';
import styles from './FriendsPage.module.scss';
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import defaultUser from '../../img/defaultUser.jpg';
import Friend from "../../components/Friend/Friend";
import SimpleButton from '../../components/buttons/SimpleButton';
import { buttonStyles } from '../../components/buttons/config.ts';
import Header from '../../components/Header';
import Tip from '../../components/Tip';
import RoundButton from "../../components/buttons/RoundButton/RoundButton";
import defaultWish1 from "../../img/defaultWish1.jpg";
import defaultWish2 from "../../img/defaultWish2.jpg";
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);


export default class FriendsPage extends React.Component {
    state = {
        input: {
            type: 'text',
            placeholder: window.getIsMobile() ?
                'Введите имя друга' :
                'Начни вводить имя своего друга',
            value: '',
        },
        isLoad: false,
        friends: [
            {
                id: 1,
                name: 'Сергей',
                surname: 'Первый',
                avatar: defaultUser,
                wishes: [
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
                ],
                gifts: [
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
                ],
            },
            {
                id: 2,
                name: 'Сергей',
                surname: 'Второй',
                avatar: defaultUser,
                wishes: [
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
                ],
                gifts: [
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
                ],
            },
            {
                id: 3,
                name: 'Сергей',
                surname: 'Третий',
                avatar: defaultUser,
                wishes: [
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
                ],
                gifts: [
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
                ],
            },
            {
                id: 4,
                name: 'Сергей',
                surname: 'Четвертый',
                avatar: defaultUser,
                wishes: [
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
                ],
                gifts: [
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
                ],
            }
        ],
        hasMore: true,
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
            input : { placeholder, type, value },
            isLoad,
            friends,
            hasMore,
        } = this.state;
        const isMobile = window.getIsMobile();

        return (
            <div className={cn('friends-page')}>
                <Header
                    user={user}
                    className={cn('friends-page__header')}
                />
                <div className={cn('friends-page__title')}>Мои друзья 😜</div>
                <div className={cn('friends-page__input-container')}>
                    <Input
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        className={cn('friends-page__input')}
                        onChange={this.handleChangeValue}
                    />
                </div>
                {(!isLoad && !!friends.length) ? (
                    <div className={cn('friends-page__friends')}>
                        {friends.map((friend, i) =>
                            (<Friend
                                key={i}
                                friend={friend}
                                className={cn('friends-page__friend')}
                            />))}
                        {hasMore && (
                            <div className={cn('friends-page__btn-container')}>
                                {isMobile ? (
                                    <div className={cn('friends-page__round-container')}>
                                        <RoundButton
                                            text={'Загрузить еще'}
                                        />
                                    </div>
                                    ) :
                                    (<SimpleButton
                                        text={'Показать еще'}
                                        style={buttonStyles.LIGHT}
                                    />)
                                }
                            </div>)}
                    </div>
                ) : isLoad ?
                    (<div className={cn('friends-page__loader-container')}>
                        <Loader />
                    </div>) :
                    (<Tip
                        className={cn('friends-page__tip')}
                        text={'Кажется, у тебя нет друзей'}
                    />)}
            </div>
        );
    }
}