import './styles.css';
import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import UserProfile from '../UserProfile';
import AuthUser from '../../components/AuthUser';

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

const DevelopmentsModal = (props) => {

    const { http } = AuthUser();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [hackathon, setHackathon] = useState();
    const [developments, setDevelopments] = useState();
    const [developer, setDeveloper] = useState(null);

    function openModal() {
        getHackaton(props.hackathonId);
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }

    const getHackaton = (id) => {

        http.get(
            '/get_hackaton/' + id
        ).then((res) => {
            if (res.data.status === "Token is Expired") {
                addToast('Your session has expired.', {
                    autoDismiss: true,
                    autoDismissTimeout: 5000,
                    appearance: 'warning'
                });
                logout();
                return;
            }
            if (res.data.status === "Token is Invalid") {
                addToast('Invalid session, Please login. ', {
                    autoDismiss: true,
                    autoDismissTimeout: 5000,
                    appearance: 'warning'
                });
                logout();
                return;
            }
            setHackathon(res.data.hackathon)
            setDevelopments(res.data.hackathon.developments)
            setDeveloper(res.data.hackathon.developments[0].developer)
        }).catch(error => {
            setLoading(false);
            addToast(error.message, {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'warning'
            });
        })
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
                {developments ?
                    <>
                        <div className="close-container d-flex justify-content-between mx-lg-1 mx-5">
                            <h4 className='modal-title'>{hackathon?.name}</h4>
                            <h4 className='close-small' onClick={closeModal}>x</h4>
                        </div>
                        <div className='modal-container d-lg-flex'>
                            <table className='developments-table'>
                                <thead>
                                    <tr>
                                        <th>Developments</th>
                                        <th>Technology</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        developments?.map((development, i) => {
                                            return (
                                                <tr key={i} onClick={() => { setDeveloper(development?.developer) }}
                                                    className={
                                                        developer?.development_id === development?.id
                                                            ? "active-profile select-tr"
                                                            : "select-tr"
                                                    }
                                                >
                                                    <td>{development?.name}</td>
                                                    <td>{development?.technology}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <UserProfile developer={developer} />
                        </div>
                    </>
                    : <strong className='modal-loader'>Loading...</strong>}
            </Modal>
        </div>
    );
};

export default DevelopmentsModal;
