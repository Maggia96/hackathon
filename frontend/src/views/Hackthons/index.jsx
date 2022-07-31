import "./style.css"
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from "react-js-pagination";
import AuthUser from '../../components/AuthUser';
import { useToasts } from 'react-toast-notifications';
import LoadingModal from '../../components/LoadingModal';
import DevelopmentsModal from '../../components/DevelopmentsModal';

const Hackthons = () => {
    const { http, logout } = AuthUser();
    const [hackathons, setHackathons] = useState();
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    const getHackatons = (pageNumber = 1) => {
        setLoading(true);
        http.get(
            '/get_hackatons?page=' + pageNumber
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
            setHackathons(res.data.hackathons.data)
            setResponse(res.data.hackathons)
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            addToast(error.message, {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'warning'
            });
        })
    }

    useEffect(() => {
        getHackatons();
    }, [])

    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Place</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {hackathons ?
                        hackathons?.map((hack, i) => {
                            return (
                                <tr key={i}>
                                    <td>{hack?.name}</td>
                                    <td>{hack?.place}</td>
                                    <td>{hack?.date}</td>
                                    <td>
                                        <DevelopmentsModal hackathonId={hack?.id} />
                                    </td>
                                </tr>
                            )
                        })
                        : null}
                </tbody>
            </table>
            <div className="pagination">
                <Pagination
                    activePage={response?.current_page ? response?.current_page : 0}
                    itemsCountPerPage={response?.per_page ? response?.per_page : 0}
                    totalItemsCount={response?.total ? response?.total : 0}
                    onChange={(pageNumber) => {
                        getHackatons(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </div>
            {loading ?
                <LoadingModal></LoadingModal>
                : null
            }
        </div>

    );
};

export default Hackthons;
