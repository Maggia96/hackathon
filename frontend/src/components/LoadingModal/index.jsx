import './styles.css';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
    },
};


const LoadingModal = () => {

    const modalIsOpen = true;

    return (
        <div className='loader'>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <strong className='modal-loader'>Loading...</strong>
            </Modal>
        </div>
    );
};

export default LoadingModal;
