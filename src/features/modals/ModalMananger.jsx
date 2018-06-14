import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

//centralize all modals
const modalLookup = {
    TestModal,
    LoginModal,
    RegisterModal
};

const MapStateToProps = state => ({
    currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
    let renderModal;

    if (currentModal) {
        const { modalType, modalProps } = currentModal;
        const ModalComponent = modalLookup[modalType];
        return (renderModal = <ModalComponent {...modalProps} />);
    }

    return <span>{renderModal}</span>;
};

export default connect(MapStateToProps)(ModalManager);
