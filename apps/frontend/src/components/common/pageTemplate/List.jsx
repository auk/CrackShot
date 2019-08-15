import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { defaultMessage } from 'i18n/defineMessages';

const commonMessages = defaultMessage.common;

const List = (props) => {
  return (
    <ul className={props.className}>
      {props.children}
    </ul>
  )
}

List.propTypes = {
  className: PropTypes.string
}

const CollectionList = (props) => {
  const data = props.data;

  return (<List className={props.className}>
    { data && data.map((item) =>
      <li key={item.id} className={props.itemClassName}>{item.name}</li>
    )}
    { !data && 
      <FormattedMessage {...commonMessages.no_data} />
    }
  </List>);
}

CollectionList.propTypes = {
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
}

List.CollectionList = CollectionList;
export default List;