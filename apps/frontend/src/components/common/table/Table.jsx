import React from 'react';
import PropTypes from 'prop-types';
import './table.css';

/**
 * Available classes: table-striped, table-hover, table-big
 */
const Table = (props) => {
  const { addClass } = props;
  return (
    <table className={`table  ${addClass}`}>
      {props.children}
    </table>
  )
}

Table.propTypes = {
  addClass: PropTypes.string,
}

const Head = (props) => {
  return (
    <thead>
      <tr className="sorter">{props.children}</tr>
    </thead>
  )
}

export const HeadItem = (props) => {
  const { name, sort, onSortChange, className, noSort } = props;
  const oppositeOrder = sort && sort.order === 'asc' ? 'desc' : 'asc';
  const attr = {
    className: (sort && sort.field === name) ? oppositeOrder : '',
  }

  if (onSortChange) {
    attr.onClick = () => onSortChange(name, oppositeOrder);
  }

  return (
    <th className={`${className} ${noSort ? 'no-sort' : ''}`}>
      <span {...attr}>{props.children}</span>
    </th>
  )
}

HeadItem.propTypes = {
  name: PropTypes.string,
  sort: PropTypes.shape({
    order: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
  }),
  onSortChange: PropTypes.func,
  className: PropTypes.string,
}

const Body = (props) => {
  return (
    <tbody>{props.children}</tbody>
  )
}

export const MobileSorter = (props) => {
  return (
    <ul className="sorter mobile-sorter">
      {props.children}
    </ul>
  )
}

export const SortItem = (props) => {
  const { name, sort, onSortChange } = props;
  const oppositeOrder = sort && sort.order === 'asc' ? 'desc' : 'asc';
  const attr = {
    className: (sort && sort.field === name) ? oppositeOrder : '',
  }
  if (onSortChange) {
    attr.onClick = () => onSortChange(name, oppositeOrder);
  }

  return (
    <li>
      <span {...attr}>
        {props.children}
      </span>
    </li>
  )
}

SortItem.propTypes = {
  name: PropTypes.string,
  sort: PropTypes.shape({
    order: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
  }),
  onSortChange: PropTypes.func,
}

Table.Head = Head;
Table.Body = Body;

export default Table;