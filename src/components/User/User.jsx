import React from 'react';
import styles from './User.module.scss';
import Avatar from "../Avatar/Avatar";
import SimpleButton from "../buttons/SimpleButton";
import { buttonStyles } from '../buttons/SimpleButton/config.ts';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class User extends React.Component {
    render() {
        const { avatar, name, surname, className, text1, text2 } = this.props;

        return (
            <div className={cn('user')}>
                <Avatar avatar={avatar} size={'big'}/>
                <div className={cn('user__info')}>
                    <div className={cn('user__fullname')}>
                       {name + ' ' + surname}
                    </div>

                    <div className={cn('user__wish')}>
                        <button className={cn('user__give')}>{text1}</button>
                        <button className={cn('user__receive')}>{text2}</button>
                    </div>


                    <SimpleButton
                        text={'Поделиться'}
                        style={buttonStyles.BLUE}
                    />
                </div>
            </div>
        );
    }
}