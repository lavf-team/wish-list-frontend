import cn from 'classnames';
import _ from 'lodash';
import React from 'react';

import BlurableWrapper from 'components/BlurableWrapper';
import Input from 'components/Input';
import {
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isEscape,
} from 'config/events';
import Requester from 'libs/Requester/Requester';

import './AutoCompleteInput.module.scss';

interface IProps {
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (val: string) => void;
  onSearch: (q: string) => void;
  normalizer: (obj: any) => Array<string>;
  url: (q?: string) => string;
}

interface IState {
  isActive: boolean;
  suggests: Array<string>;
  focusedSuggestIndex: number;
}

export default class AutoCompleteInput extends React.Component<IProps, IState> {
  state = {
    isActive: false,
    suggests: [],
    focusedSuggestIndex: -1,
  };

  inputRef: HTMLInputElement | null = null;

  setInputRef = el => {
    this.inputRef = el;
  };

  keyboardListener = event => {
    if (!this.state.isActive) {
      return;
    }
    console.log(event);
    const { onSearch, value } = this.props;
    let { focusedSuggestIndex } = this.state;
    const { suggests } = this.state;

    if (isEnterKey(event)) {
      this.handleBlur();
      onSearch(value);
    }

    if (isArrowDownKey(event)) {
      event.preventDefault();
      this.setState({
        focusedSuggestIndex:
          focusedSuggestIndex < suggests.length - 1
            ? ++focusedSuggestIndex
            : -1,
      });
    }

    if (isArrowUpKey(event)) {
      event.preventDefault();
      this.setState({
        focusedSuggestIndex:
          focusedSuggestIndex > 0
            ? --focusedSuggestIndex
            : focusedSuggestIndex === -1
            ? suggests.length - 1
            : -1,
      });
    }

    if (isEscape(event)) {
      this.setState({
        focusedSuggestIndex: -1,
        suggests: [],
      });
      this.handleBlur();
      this.props.onChange('');
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keyboardListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyboardListener);
  }

  handleClick = value => () => {
    this.setState({
      focusedSuggestIndex: -1,
    });
    this.props.onChange(value);
    this.props.onSearch(value);
    this.handleBlur();
  };

  handleInputFocus = () =>
    this.setState({
      isActive: true,
    });

  handleBlur = () => {
    if (this.inputRef) {
      this.inputRef.blur();
    }

    this.setState({
      isActive: false,
    });
  };

  doSearch = async q => {
    const { url, normalizer } = this.props;
    const result = await Requester.get(url(q));
    if (result.response) {
      this.setState({
        suggests: normalizer(result.response),
      });
    } else {
      this.setState({
        suggests: [],
      });
    }
  };

  debouncedDoSearch = _.debounce(this.doSearch, 500);

  handleChange = async value => {
    this.setState({
      focusedSuggestIndex: -1,
    });
    this.props.onChange(value);
    await this.debouncedDoSearch(value);
  };

  render() {
    const { className, value, placeholder } = this.props;
    const { suggests, isActive, focusedSuggestIndex } = this.state;

    const getSuggestsString = (string, index) => {
      const subStrings = string.split(new RegExp(`(${value})`, 'gi'));

      return (
        <div
          key={index}
          styleName={cn(
            'auto-input__drop-down-el',
            focusedSuggestIndex === index && 'auto-input__drop-down-el_focused'
          )}
          onClick={this.handleClick(string)}
        >
          {subStrings.map(el =>
            el.toLowerCase() !== value.toLowerCase() ? (
              el
            ) : (
              <span styleName="auto-input__drop-down-sub-el_black">{el}</span>
            )
          )}
        </div>
      );
    };

    return (
      <div className={className} styleName="auto-input">
        <BlurableWrapper onBlur={this.handleBlur}>
          <>
            <Input
              styleName="auto-input__input"
              value={
                focusedSuggestIndex >= 0 ? suggests[focusedSuggestIndex] : value
              }
              placeholder={placeholder}
              onChange={this.handleChange}
              onFocus={this.handleInputFocus}
              inputRef={this.setInputRef}
            />
            {!!suggests.length && isActive && (
              <div styleName="auto-input__drop-down">
                {suggests.map(getSuggestsString)}
              </div>
            )}
          </>
        </BlurableWrapper>
      </div>
    );
  }
}
