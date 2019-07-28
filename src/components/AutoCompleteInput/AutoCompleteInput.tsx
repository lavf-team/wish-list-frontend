import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

import Input from 'components/Input';
import { IWish } from 'config/interfaces';

import './AutoCompleteInput.module.scss';

interface IProps {
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (val: string) => void;
  searchCatalog: {
    [id: string]: IWish;
  };
  searchCatalogIds: Array<number>;
}

class AutoCompleteInput extends React.Component<IProps> {
  render() {
    const {
      className,
      value,
      onChange,
      placeholder,
      searchCatalog,
      searchCatalogIds,
    } = this.props;
    console.log(searchCatalog);

    const getSuggestsString = (element, index) => {
      const subStrings = searchCatalog[element].title.split(
        new RegExp(`(${value})`, 'gi')
      );

      return (
        <div key={index} styleName="auto-input__drop-down-el">
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
        <Input
          styleName="auto-input__input"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {!!searchCatalogIds.length && value && (
          <div styleName="auto-input__drop-down">
            {searchCatalogIds.map(getSuggestsString)}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchCatalog: state.wishes.searchCatalog,
  searchCatalogIds: state.wishes.searchCatalogIds,
});

export default connect(mapStateToProps)(AutoCompleteInput);
