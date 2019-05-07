import React from 'react';
import { connect } from 'react-redux';

import CreateOrganizationModal from './CreateOrganizationModal';

const MODAL_COMPONENTS = {
  'CREATE_ORGANIZATION': CreateOrganizationModal,
}

const ModalRoot = ({ modalType, modalProps }) => {
  console.log("ModalRoot [1] type:", modalType, ", props: ", modalProps);

  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

export default connect(state => state.modal)(ModalRoot)
