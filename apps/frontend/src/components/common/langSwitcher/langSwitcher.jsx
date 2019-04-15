import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { defaultMessage } from 'i18n/defineMessages';
import { switchLocale } from 'actions/localeActions';
import flagDE from 'assets/img/flag_de.svg';
import flagEN from 'assets/img/flag_en.svg';
import flagRU from 'assets/img/flag_ru.svg';
import { getLocaleSelector } from 'selectors';

const messages = defaultMessage.language;

class LanguageSwitcher extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    switchLocale: PropTypes.func.isRequired,
  }

  handleLanguageSwitch(e) {
    this.props.switchLocale(e);
  }

  getFlag(locale) {
    let flag = '';
    if (locale) {
      switch (locale.toLowerCase()) {
        case 'en':
          flag = flagEN;
          break;
        case 'ru':
          flag = flagRU;
          break;
        case 'de':
          flag = flagDE;
          break;
        default: {
          flag = flagEN;
        }
      }
    }

    return flag;
  }

  render() {
    const { locale } = this.props;
    return (
      <Dropdown id="dropdown-languages" onSelect={this.handleLanguageSwitch.bind(this)} componentClass="li" role="menuitem">
        <Dropdown.Toggle bsStyle={null} className="btn-dis-style" componentClass="a">
          <img src={this.getFlag(locale)} className="flag" alt="en" />{' '}
          <span className="locale">{locale}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className='animated fadeInRight m-t-xs'>
          <MenuItem eventKey="en" active={locale === "en" ? true : false}>
            <img src={flagEN} className="flag" alt="en" />{' '}
            <FormattedMessage {...messages.en} /> (en)
          </MenuItem>
          <MenuItem eventKey="de" active={locale === "de" ? true : false}>
            <img src={flagDE} className="flag" alt="de" />{' '}
            <FormattedMessage {...messages.de} /> (de)
          </MenuItem>
          <MenuItem eventKey="ru" active={locale === "ru" ? true : false}>
            <img src={flagRU} className="flag" alt="ru" />{' '}
            <FormattedMessage {...messages.ru} /> (ru)
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

function mapStateToProps(state) {
  return {
    locale: getLocaleSelector(state),
  }
}

export default connect(mapStateToProps, { switchLocale })(LanguageSwitcher);
