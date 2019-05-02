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

const messages = defaultMessage.Organizatios;
const common = defaultMessage.common;

const OrganizationsList = props => {
  const { data, currentUser, links, oid, onSizeChange, onPageChange, intl: { formatMessage } } = props;
  
  return (
    <React.Fragment>
      <Table addClass="table-hover table-striped table-big">
        <Table.Head>
          <HeadItem noSort name="status">
            {formatMessage(common.status)}
          </HeadItem>
          <HeadItem noSort name="name">
            {formatMessage(common.name)}
          </HeadItem>
          <HeadItem noSort className="pull-right">
            {formatMessage(common.actions)}
          </HeadItem>
        </Table.Head>
        <Table.Body>
          {data.content.map((workspace) =>
            <tr key={workspace.id} className={workspace.id === wid ? "active" : ""}>
              <td className="project-status col-md-2 col-sm-2">
                <span className={"label " + (workspace.ownerID === currentUser.id ? "label-info" : "label-default")}>
                  {workspace.ownerID === currentUser.id ? formatMessage(messages.own) : formatMessage(messages.invited)}
                </span>
              </td>
              <td className="project-title col-md-8 col-sm-8">
                <Link to={links.workspace.url.view.replace(/:wid/i, workspace.id)}>
                  {workspace.name}
                </Link>
                <br />
                <small>
                  <FormattedMessage {...messages.id} values={{ id: workspace.id }} />
                </small>
              </td>
              <td className="project-actions col-md-2 col-sm-2">
                <ActionMenu>
                  {workspace.ownerID === currentUser.id &&
                    <LinkContainer to={links.workspaceUser.url.invite.replace(/:wid/i, workspace.id)}>
                      <MenuItem eventKey="invite">
                        <i className="fa fa-plus"></i>
                        <span><FormattedMessage {...common.invite} /></span>
                      </MenuItem>
                    </LinkContainer>
                  }
                  <LinkContainer to={links.workspace.url.view.replace(/:wid/i, workspace.id)}>
                    <MenuItem eventKey="view">
                      <i className="fa fa-eye"></i>
                      <span><FormattedMessage {...common.view} /></span>
                    </MenuItem>
                  </LinkContainer>
                  {workspace.ownerID === currentUser.id &&
                    <LinkContainer to={links.workspace.url.edit.replace(/:wid/i, workspace.id)}>
                      <MenuItem eventKey="edit">
                        <i className="fa fa-pencil"></i>
                        <span><FormattedMessage {...common.edit} /></span>
                      </MenuItem>
                    </LinkContainer>
                    
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
          <FormattedMessage {...messages.empty} />
        </p>
      }
    </React.Fragment>
  )
}

OrganizationsList.propTypes = {
  intl: intlShape.isRequired,
  wid: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  links: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}

export default injectIntl(OrganizationsList);
