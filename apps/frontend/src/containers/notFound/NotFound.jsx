import React from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import './notFound.css';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.notFound;

const NotFound = (props) => {
  const { formatMessage } = props.intl;

  return (
    <DocumentTitle title={formatMessage(messages.title)}>
      <div className="middle-box text-center animated fadeInDown page-404">
        <h1>404</h1>
        <h3 className="font-bold"><FormattedMessage {...messages.h3} /></h3>
        <div className="error-desc">
          <p>
            <FormattedMessage {...messages.description} values={{ link: <Link to="/"> <FormattedMessage {...messages.return} /></Link> }} />
          </p>
        </div>
      </div>
    </DocumentTitle>
  );
}

NotFound.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(NotFound);