import React from 'react';

import './Input.module.scss';

interface IState {
  active: boolean;
}

interface IProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

export default class Input extends React.Component<IProps, IState> {
  static defaultProps: Partial<IProps> = {
    value: '',
  };

  state = {
    active: false,
  };

  onFocus = () => {
    this.setState({
      active: true,
    });
  };

  onBlur = () => {
    this.setState({
      active: false,
    });
  };

  onChangeValue = e => this.props.onChange(e.target.value || '');

  render() {
    const { value, placeholder, className } = this.props;
    const { active } = this.state;

    return (
      <div className={className} styleName="input">
        <input
          styleName="input__field"
          type="text"
          value={value}
          onInput={this.onChangeValue}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {!(active || (value ? value.length : 0)) && (
          <div styleName="input__placeholder">{placeholder}</div>
        )}
      </div>
    );
  }
}
