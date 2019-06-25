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

const UserTrainingsList = props => {
  const { data, links, trainingElements, onSizeChange, onPageChange, onClick, intl: { formatMessage } } = props;
  const { showActions = true, showOrganizationLink = true, showPaging = true } = props;

  const getTrainingElementById = id => {
    return trainingElements ? trainingElements.find(te => te.id === id) : undefined;
  } 
  
  const getTrainingElementName = id => {
    const trainingElement = getTrainingElementById(id);
    return trainingElement ? trainingElement.name : undefined;
  }
  
  // console.log("UserTrainingsList elements:", trainingElements);

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
          { data.content && data.content.map((tr) =>
            <tr key={tr.id} className={tr.id === 'wid' ? "active" : ""} onClick={() => { if (onClick) onClick(tr); } }>
              <td className="col-md-5 col-sm-5">
              { tr.training.organization && 
                <div>
                  {tr.training.organization.name}
                  &nbsp;
                  { showOrganizationLink &&
                    <Link to={links.organization.url.replace(/:oid/i, tr.training.organization.id)}>
                      <i className="fa fa-external-link" aria-hidden="true"></i>
                    </Link>
                  }
                </div>
              }
              { !tr.training.organization && 
                <div>--</div>
              }
              </td>
              <td className="col-md-1 col-sm-1">
                <Link to={links.training.url.replace(/:tid/i, tr.id)}>
                  {tr.training.date}
                </Link>
              </td> 
              <td className="col-md-2 col-sm-2">
                <Link to={links.training.url.replace(/:tid/i, tr.id)}>
                  {tr.training.time}
                </Link>
              </td>
              <td className="col-md-2 col-sm-2 text-center">
                { tr.training.users && tr.training.users.map((part) => <div class="badge">{part.name}</div> )

                }
              </td>
              <td className="col-md-2 col-sm-2 text-center">
                {tr.shots} / {tr.cost}
              </td>
              { showActions &&
                <td className="col-md-1 col-sm-1 text-center">
                  <ActionMenu>
                    <LinkContainer to={links.training.url.replace(/:tid/i, tr.id)}>
                      <MenuItem eventKey="view">
                        <i className="fa fa-eye"></i>
                        <span><FormattedMessage {...common.view} /></span>
                      </MenuItem>
                    </LinkContainer>
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
          <FormattedMessage {...common.no_data} />
        </p>
      }
    </React.Fragment>
  )
}

UserTrainingsList.propTypes = {
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

export default injectIntl(UserTrainingsList);
