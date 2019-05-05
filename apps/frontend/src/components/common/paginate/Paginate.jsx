import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

import './style.css'

const selectorStyle = {
  control: base => ({ ...base, width: 85 })
}

const Paginate = (props) => {
  const { sizePerPageList, pageCount, onPageChange, forcePage, pageSize, onSizeChange } = props;
  const options = sizePerPageList.map(item => {
    return { value: item, label: item.toString() };
  });

  return (
    <div className="row paginate-wrapper">
      <div className="col-sm-6 pull-left">
        <ReactPaginate
          previousLabel={"‹"}
          nextLabel={"›"}
          breakLabel={<span>...</span>}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          onPageChange={onPageChange}
          forcePage={forcePage} />
      </div>
      <div className="col-sm-6 pull-right">
        <Select className="pull-right paginate-select"
          name="size"
          isSearchable={false}
          styles={selectorStyle}
          menuPlacement="top"
          value={{ label: pageSize.toString(), value: pageSize }}
          onChange={onSizeChange}
          options={options}
        />
      </div>
    </div>
  )
}

Paginate.propTypes = {
  forcePage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  sizePerPageList: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Paginate;