import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuItem } from 'react-bootstrap';

import { defaultMessage } from 'i18n/defineMessages';
import Paginate from 'components/common/paginate/Paginate';
import ActionMenu from 'components/actionMenu/ActionMenu';
import Table, { HeadItem } from 'components/common/table/Table';
import { getUserDisplayNameSelector } from 'selectors';

const commonMessages = defaultMessage.common;

const UsersList = props => {
  const { data, links, onEdit, onDelete, onSizeChange, onPageChange, intl: { formatMessage } } = props;

  return (
    <React.Fragment>
      <Table addClass="table-hover table-striped table-big">
        <Table.Head>
          <HeadItem noSort name="name">
            {formatMessage(commonMessages.name)}
          </HeadItem>
          <HeadItem noSort name="email">
            {formatMessage(commonMessages.email)}
          </HeadItem>
          <HeadItem noSort className="pull-right">
            {formatMessage(commonMessages.actions)}
          </HeadItem>
        </Table.Head>
        <Table.Body>
          {data.content && data.content.map((user) =>
            <tr key={user.id} className={user.id === 'wid' ? "active" : ""}>
              <td className="col-md-6 col-sm-6">
                <Link to={links.user.url.replace(/:uid/i, user.id)}>
                  { getUserDisplayNameSelector(user) }
                </Link>
              </td>
              <td className="col-md-5 col-sm-5">{ user.email }</td>
              <td className="col-md-1 col-sm-1">
                <ActionMenu>
                  <LinkContainer to={links.user.url.replace(/:uid/i, user.id)}>
                    <MenuItem eventKey="view">
                      <i className="fa fa-eye"></i>
                      <span><FormattedMessage {...commonMessages.view} /></span>
                    </MenuItem>
                  </LinkContainer>
                  { onEdit && 
                    <MenuItem eventKey="edit" onClick={onEdit.bind(this, user)}>
                      <i className="fa fa-pencil"></i>
                      <span><FormattedMessage {...commonMessages.edit} /></span>
                    </MenuItem>
                  }
                  { onDelete &&
                    <MenuItem eventKey="delete" onClick={onDelete.bind(this, user)}>
                      <i className="fa fa-times"></i>
                      <span><FormattedMessage {...commonMessages.delete} /></span>
                    </MenuItem>
                  }
                </ActionMenu>
              </td>
            </tr>
          )}
        </Table.Body>
      </Table>

      {data.content.length > 0 &&
        <Paginate
          pageCount={data.totalPages}
          sizePerPageList={data.sizePerPageList}
          pageSize={data.requestParams.size}
          onPageChange={onPageChange}
          onSizeChange={onSizeChange}
          forcePage={data.requestParams.page}
        />
      }

      {data.content.length === 0 && !data.isFetching &&
        <p>
          <FormattedMessage {...commonMessages.no_data} />
        </p>
      }
    </React.Fragment>
  )
}

UsersList.propTypes = {
  intl: intlShape.isRequired,
  wid: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  links: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}

export default injectIntl(UsersList);
