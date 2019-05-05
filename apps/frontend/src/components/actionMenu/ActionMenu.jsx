import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './actionMenu.css';

const ActionMenu = (props) => {
  return (
    <Dropdown id="actionsDropdown" componentClass="nav" role="menuitem" className={props.className}>
      <Dropdown.Toggle className="btn-dis-style btn-xs" noCaret={true} onClick={e => e.stopPropagation()}>
        <i className="fa fa-ellipsis-v toggle-icon"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="animated fadeInRight m-t-xs actions-menu pull-right">
        {props.children}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ActionMenu;