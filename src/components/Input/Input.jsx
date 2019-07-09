import React from 'react';
import styles from './Input.module.scss';
const classNames = require('classnames/bind');

const cn = classNames.bind(styles);

export default class Input extends React.Component {
    state = {
        active: false,
    };

    onFocus = () => {
        this.setState({
            active: true,
        })
    };

    onBlur = () => {
        this.setState({
            active: false,
        })
    };

    onChangeValue = (e) => this.props.onChange(e.target.value || '');

    render() {
        const {
            value = '',
            type = 'text',
            placeholder = '',
            className = '',
        } = this.props;
        const { active } = this.state;
        const inputClassName = `${cn('input')} ${className}`;

        return (
            <div className={inputClassName}>
                <input
                    className={cn('input__field')}
                    type={type}
                    value={value}
                    onInput={this.onChangeValue}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    spellCheck="false"
                />
                {!(active || value.length) &&
                (<div
                    className={cn('input__placeholder')}
                >{placeholder}
                </div>)}

            </div>
        );
    }
}