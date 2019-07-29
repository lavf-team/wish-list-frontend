import React from 'react';

import './Input.module.scss';

interface IProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: (e) => void;
  onFocus?: (e) => void;
  inputRef?: (el: HTMLInputElement) => void;
}

export default class Input extends React.Component<IProps> {
  static defaultProps: Partial<IProps> = {
    value: '',
    onBlur: () => null,
    onFocus: () => null,
    inputRef: () => null,
  };

  onChangeValue = e => this.props.onChange(e.target.value || '');

  render() {
    const {
      value,
      placeholder,
      className,
      onBlur,
      onFocus,
      inputRef,
    } = this.props;

    return (
      <div className={className} styleName="input">
        <input
          styleName="input__field"
          type="text"
          value={value}
          onInput={this.onChangeValue}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
        />
        {!value!.length && (
          <div styleName="input__placeholder">{placeholder}</div>
        )}
      </div>
    );
  }
}
