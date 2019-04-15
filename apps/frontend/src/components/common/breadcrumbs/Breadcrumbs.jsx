import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, } from 'react-intl';
import { Link } from 'react-router-dom';

const Breadcrumbs = props => {
  const { header, crumbs } = props;

  return (
    <div className="row wrapper border-bottom white-bg page-heading">
      <div className="col-lg-10">
        <h2>
          <FormattedMessage {...header} />
        </h2>
        <ol className="breadcrumb">
          {
            crumbs.map((crumb, index) => {
              let listItem = null;
              if (index !== crumbs.length - 1) {
                listItem =
                  <li key={index}>
                    <Link to={crumb.url}>
                      <i className={`fa ${crumb.icon}`} aria-hidden="true"></i>{' '}
                      <FormattedMessage {...crumb.text} />
                    </Link>
                  </li>
              } else {
                listItem =
                  <li key={index} className="active">
                    <strong>
                      <i className={`fa ${crumb.icon}`} aria-hidden="true"></i>{' '}
                      <FormattedMessage {...crumb.text} />
                    </strong>
                  </li>
              }

              return listItem;
            })
          }
        </ol>
      </div>
      <div className="col-lg-2"></div>
    </div>
  )
}

Breadcrumbs.propTypes = {
  header: PropTypes.object.isRequired,
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    icon: PropTypes.string,
    text: PropTypes.object.isRequired,
  })),
}

Breadcrumbs.defaultProps = {
  crumbs: [],
}

export default Breadcrumbs;
