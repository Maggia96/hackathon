import './styles.css';
import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import UserProfile from '../UserProfile';

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

const UserModal = (props) => {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [developer, setDeveloper] = useState(null);

    function openModal() {
        setDeveloper(props.developer);
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button className='btn btn-secondary' onClick={openModal}>View</button>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {developer ?
                    <>
                        <div className="close-container d-flex justify-content-between">
                        </div>
                        <h4 className='close-user-modal' onClick={closeModal}>x</h4>
                        <div className='modal-container d-lg-flex'>
                            <UserProfile
                                developer={developer}
                                border={'border-off'}
                                name={developer.user.name}
                                ranking={props?.ranking}
                            />
                        </div>
                    </>
                    : <strong className='modal-loader'>Loading...</strong>}
            </Modal>
        </div>
    );
};

export default UserModal;
