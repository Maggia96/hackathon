import { useState } from 'react';
import { useEffect } from 'react';
import AuthUser from '../../components/AuthUser';
import Pagination from "react-js-pagination";
import { useToasts } from 'react-toast-notifications';

const Developers = () => {
    const { http } = AuthUser();
    const [developers, setDevelopers] = useState();
    const [response, setResponse] = useState();
    const { addToast } = useToasts();

    const getDevelopers = (pageNumber = 1) => {

        http.get(
            '/get_top_developers?page=' + pageNumber
        ).then((res) => {
            if (res.data.status === "Token is Expired") {
                addToast('Your session has expired.',{
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
                                    <td><button className='btn btn-secondary'>view</button></td>
                                </tr>
                            )
                        })
                        : <tr className='loader-label'><p>Loading...</p></tr>}
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
        </div>

    );
};

export default Developers;
