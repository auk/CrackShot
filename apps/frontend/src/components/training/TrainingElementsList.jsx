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

const commonMessages = defaultMessage.common;

const TrainingElementsList = (props) => {
  const { data, links, onSizeChange, onPageChange, onClick, intl: { formatMessage } } = props;
  const { showActions = true, showPaging = true } = props;

  // console.log("TrainingElementsList - data:", data);
  // console.log("TrainingElementsList - content:", data.content);

  return (
    <React.Fragment>
      <Table addClass="table-hover table-striped table-big">
        <Table.Head>
          <HeadItem noSort name="name" className="col-lg-10">
            {formatMessage(commonMessages.name)}
          </HeadItem>
          { showActions &&
            <HeadItem noSort className="col-lg-3 pull-right">
              {formatMessage(commonMessages.actions)}
            </HeadItem>
          }
        </Table.Head>
        <Table.Body>
          {data.content && data.content.map((tr) =>
            <tr key={tr.id} onClick={() => onClick(tr)}>
              <td className="col-lg-10">
                {tr.name}
              </td>
              { showActions &&
                <td className="col-lg-3 pull-right">
                  <ActionMenu>
                    <LinkContainer to={links.trainingElement.url.replace(/:tid/i, tr.id)}>
                      <MenuItem eventKey="view">
                        <i className="fa fa-eye"></i>
                        <span><FormattedMessage {...commonMessages.edit} /></span>
                      </MenuItem>
                    </LinkContainer>
                    <LinkContainer to={links.trainingElement.url.replace(/:tid/i, tr.id)}>
                      <MenuItem eventKey="delete">
                        <i className="fa fa-times"></i>
                        <span><FormattedMessage {...commonMessages.delete} /></span>
                      </MenuItem>
                    </LinkContainer>
                  </ActionMenu>
                </td>
              }

            </tr>
          )}
        </Table.Body>
      </Table>

      { data.content.length > 0 &&
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
          <FormattedMessage {...commonMessages.no_data} />
        </p>
      }
    </React.Fragment>
  )
}

TrainingElementsList.propTypes = {
  intl: intlShape.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  links: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default injectIntl(TrainingElementsList);