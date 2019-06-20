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

const common = defaultMessage.common;
// const trainingMessage = defaultMessage.training;

const TrainingsList = props => {
  const { data, links, trainingElements, onSizeChange, onPageChange, onClick, intl: { formatMessage } } = props;
  const { showActions = true, showOrganizationLink = true, showPaging = true } = props;

  console.log("TrainingsList elements:", trainingElements);

  const getTrainingElementById = (id) => {
    console.assert(trainingElements);
    return trainingElements ? trainingElements.find(te => te.id === id) : undefined;
  } 

  // const stringConcat = (acc, value) => acc + "\r\n" + value.username;

  return (
    <React.Fragment>
      <Table addClass="table-hover table-striped table-big">
        <Table.Head>
          <HeadItem noSort name="organization">
            {formatMessage(common.organization)}
          </HeadItem>
          <HeadItem noSort name="date">
            {formatMessage(common.date)}
          </HeadItem>
          <HeadItem noSort name="time">
            {formatMessage(common.time)}
          </HeadItem>
          <HeadItem noSort name="participants">
            {formatMessage(common.participants)}
          </HeadItem>
          <HeadItem noSort name="elements">
            {formatMessage(common.elements)}
          </HeadItem>
          { showActions &&
            <HeadItem noSort className="pull-right">
              {formatMessage(common.actions)}
            </HeadItem>
          }
        </Table.Head>
        <Table.Body>
          {data.content && data.content.map((tr) =>
            <tr key={tr.id} className={tr.id === 'wid' ? "active" : ""} onClick={() => onClick(tr)}>
              <td className="col-md-5 col-sm-5">
              { tr.organization && 
                <div>
                  {tr.organization.name}
                  &nbsp;
                  { showOrganizationLink &&
                    <Link to={links.organization.url.replace(/:oid/i, tr.organization.id)}>
                      <i className="fa fa-external-link" aria-hidden="true"></i>
                    </Link>
                  }
                </div>
              }
              { !tr.organization && 
                <div>--</div>
              }
              </td>
              <td className="col-md-1 col-sm-1">
                {tr.date}
              </td>
              <td className="col-md-2 col-sm-2">
                {tr.time}
              </td>
              <td className="col-md-2 col-sm-2 text-center">
                <div title={tr.users.map(u => u.name ? u.name : u.username).join("\r\n")}>{tr.users.length}</div>
              </td>
              <td className="col-md-2 col-sm-2 text-center">
                <div title={tr.trainingElements.map(id => getTrainingElementById(id).name).join("\r\n")}>{tr.trainingElements.length}</div>
              </td>
              { showActions &&
                <td className="col-md-1 col-sm-1 text-center">
                  <ActionMenu>
                    {/* workspace.ownerID === currentUser.id &&
                      <LinkContainer to={links.workspaceUser.url.invite.replace(/:wid/i, workspace.id)}>
                        <MenuItem eventKey="invite">
                          <i className="fa fa-plus"></i>
                          <span><FormattedMessage {...common.invite} /></span>
                        </MenuItem>
                      </LinkContainer>
                    */}
                    <LinkContainer to={links.training.url.replace(/:tid/i, tr.id)}>
                      <MenuItem eventKey="view">
                        <i className="fa fa-eye"></i>
                        <span><FormattedMessage {...common.view} /></span>
                      </MenuItem>
                    </LinkContainer>
                    {/*workspace.ownerID === currentUser.id &&
                      <LinkContainer to={links.workspace.url.edit.replace(/:wid/i, workspace.id)}>
                        <MenuItem eventKey="edit">
                          <i className="fa fa-pencil"></i>
                          <span><FormattedMessage {...common.edit} /></span>
                        </MenuItem>
                      </LinkContainer>
                      
                    */}
                  </ActionMenu>
                </td>
              }
            </tr>
          )}
        </Table.Body>
      </Table>

      { showPaging && data.content.length > 0 &&
        <Paginate
          pageCount={data.totalPages}
          sizePerPageList={data.sizePerPageList}
          pageSize={data.requestParams.size}
          onPageChange={onPageChange}
          onSizeChange={onSizeChange}
          forcePage={data.requestParams.page}
        />
      }

      { (data.content.length === 0 && !data.isFetching) &&
        <p>
          TODO: Empty{/* <FormattedMessage {...messages.empty} /> */}
        </p>
      }
    </React.Fragment>
  )
}

TrainingsList.propTypes = {
  intl: intlShape.isRequired,
  wid: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  links: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  trainingElements: PropTypes.object.isRequired,
}

export default injectIntl(TrainingsList);
