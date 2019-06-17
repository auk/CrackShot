import React from 'react';
import { connect } from 'react-redux';

import CreateOrganizationModal from './CreateOrganizationModal';
import CreateTrainingModal from './CreateTrainingModal';
import CreateTrainingElementModal from './CreateTrainingElementModal';
import DeleteTrainingElementModal from './DeleteTrainingElementModal';
import DeleteUserModal from './DeleteUserModal';

const MODAL_COMPONENTS = {
  'CREATE_ORGANIZATION': CreateOrganizationModal,
  'CREATE_TRAINING': CreateTrainingModal,
  'CREATE_TRAINING_ELEMENT': CreateTrainingElementModal,
  'DELETE_TRAINING_ELEMENT': DeleteTrainingElementModal,
  'DELETE_USER': DeleteUserModal,
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

export default connect(state => state.modal)(ModalRoot)
