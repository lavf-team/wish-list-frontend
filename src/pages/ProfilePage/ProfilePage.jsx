import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './ProfilePage.module.scss';
import UserCard from '../../components/UserCard';
import img1 from '../../img/relieved.png';
import img2 from '../../img/glasses.png';
import defaultWish1 from '../../img/defaultWish1.jpg';
import defaultWish2 from '../../img/defaultWish2.jpg';
import WishList from '../../components/WishList';
import { route } from "../../utils/matchUrl";


const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class ProfilePage extends React.Component {
    state = {
        links: {
            firstLink : {
                title: 'firstLink',
                text: 'Хочу получить',
                img: img1,
                isActive: false,
                to: route.MY_WISHES.url,
            },
            secondLink : {
                title: 'secondLink',
                text: 'Хочу подарить',
                img: img2,
                isActive: true,
                to: route.MY_GIFTS.url,
            }
        },
        myWishes: [
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
        myGifts: [
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
    };

    handleClick = (title) => {
        let active, inActive;
        const {
            links:
                {
                    firstLink: { title: firstTitle },
                    secondLink: { title: secondTitle }
                }
        } = this.state;

        if (title === firstTitle) {
            inActive = firstTitle;
            active = secondTitle
        } else {
            inActive = secondTitle;
            active = firstTitle
        }

        this.setState({
            links: {
                [inActive] : {
                    ...this.state.links[inActive],
                    isActive: false,
                },
                [active] : {
                    ...this.state.links[active],
                    isActive: true,
                }
            }
        })
    };

    render() {
        const { user, avatars } = this.props;
        const { links, myWishes, myGifts } = this.state;

        return (
            <div className={cn('profile-page')}>
                <Header
                    avatars={avatars}
                    user={user}
                    className={cn('profile-page__header')}
                />
                <UserCard
                    className={cn('profile-page__user-card')}
                    user={user}
                    links={links}
                    onClick={this.handleClick}
                />
                <Route
                    path={route.MY_WISHES.url}
                    render={(props) =>
                        <WishList
                            {...props}
                            className={cn('profile-page__list')}
                            list={myWishes}
                        />
                    }
                />
                <Route
                    path={route.MY_GIFTS.url}
                    render={(props) =>
                        <WishList
                            {...props}
                            className={cn('profile-page__list')}
                            list={myGifts}
                        />
                    }
                />
                <Redirect to={route.MY_WISHES.url} />
            </div>

        );
    }

}
