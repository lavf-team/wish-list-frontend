import React from 'react';
import styles from './Tip.module.scss';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Tip extends React.Component {
    render() {
        const { text = '', className = '' } = this.props;
        const tipClassName = `${'tip'} ${className}`;

        return (
            <div className={cn(tipClassName)}>
                <span className={cn('tip__emoji')}>
                    &#128577;
                </span>
                <div className={cn('tip__text')}>
                    {text}
                </div>
            </div>
        );
    }
}