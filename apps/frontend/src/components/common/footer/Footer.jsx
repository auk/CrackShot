//@TODO NEED TO UPDATE VERSION
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.footer;

const Footer = props => {
  const { version } = props;
  const copyrightLink = (<a href="http://startext.de">startext GmbH</a>);
  const copy = (<span>&copy;</span>);
  const year = (<span>{new Date().getFullYear()}</span>);

  return (
    <div className="footer">
      <div className="pull-right">
        <FormattedMessage {...messages.version}>
          {text => <b>{text}</b>}
        </FormattedMessage>
        {' '}
        {version}
      </div>
      <div>
        <b><FormattedMessage {...messages.copyright} values={{ copyrightLink, copy, year }} /></b>
        {' '}
        <FormattedMessage {...messages.rights} />
      </div>
    </div>
  )
}

Footer.propTypes = {
  version: PropTypes.any,
}

Footer.defaultProps = {
  version: '0.0.0',
}

export default Footer;