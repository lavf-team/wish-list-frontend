import React from 'react';

import './Input.module.scss';

export default class Input extends React.Component<any> {
  state = {
    active: false
  };

  onFocus = () => {
    this.setState({
      active: true
    });
  };

  onBlur = () => {
    this.setState({
      active: false
    });
  };

  onChangeValue = e => this.props.onChange(e.target.value || '');

  render() {
    const {
      value = '',
      type = 'text',
      placeholder = '',
      className = ''
    } = this.props;
    const { active } = this.state;

    return (
      <div className={className} styleName="input">
        <input
          styleName="input__field"
          type={type}
          value={value}
          onInput={this.onChangeValue}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {!(active || value.length) && (
          <div styleName="input__placeholder">{placeholder}</div>
        )}
      </div>
    );
  }
}
