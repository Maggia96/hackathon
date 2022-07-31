import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from "react-js-pagination";
import AuthUser from '../../components/AuthUser';
import UserModal from '../../components/UserModal';
import { useToasts } from 'react-toast-notifications';
import LoadingModal from '../../components/LoadingModal';

const Developers = () => {
    const { http } = AuthUser();
    const [developers, setDevelopers] = useState();
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    const getDevelopers = (pageNumber = 1) => {
        setLoading(true);
        http.get(
            '/get_top_developers?page=' + pageNumber
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
            setDevelopers(res.data.developers.data)
            setResponse(res.data.developers)
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
        getDevelopers();
    }, [])

    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Username</th>
                        <th>Hackathon</th>
                        <th className='mobile-hide'>Ranking</th>
                        <th className='mobile-hide'>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {developers ?
                        developers?.map((hack, i) => {
                            return (
                                <tr key={i}>
                                    <td><img src={hack?.developer.picture} alt="" /></td>
                                    <td>{hack?.developer.user_name}</td>
                                    <td>{hack?.developer.hackathon.name}</td>
                                    <td className='mobile-hide'>{`°${hack?.ranking}`}</td>
                                    <td className='mobile-hide'>{hack?.developer.phone}</td>
                                    <td><UserModal developer={hack?.developer} ranking={hack?.ranking} /></td>
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
                        getDevelopers(pageNumber)
                    }}
                    pageRangeDisplayed={5}
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

export default Developers;
