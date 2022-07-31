import "./styles.css";
import AuthUser from '../../components/AuthUser';
import { HackLogo } from '../../assets/img/index';
import { Link, useLocation } from 'react-router-dom';


const Menu = () => {
    const { logout } = AuthUser();
    const { pathname } = useLocation();

    return (
        <div className="menu-container">
            <ul className='sidebar-list'>
                <li className='sidebar-item mobile-hide'>
                    <Link
                        to="/"
                        className={
                            pathname == '/'
                                ? `active menu-link`
                                : 'menu-link'
                        }
                    >
                        <img className='hack-logo' src={HackLogo} alt="" />
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link
                        to="/"
                        className={
                            pathname == '/'
                                ? `active menu-link`
                                : 'menu-link'
                        }
                    >
                        Home
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link
                        to="/hackathons"
                        className={
                            pathname == '/hackathons'
                                ? `active menu-link`
                                : 'menu-link'
                        }
                    >
                        Hackathons
                    </Link>

                </li>
                <li className='sidebar-item'>
                    <Link
                        to="/developers"
                        className={
                            pathname == '/developers'
                                ? `active menu-link`
                                : 'menu-link'
                        }
                    >
                        Top Devs
                    </Link>
                </li>
                <li className='sidebar-item logout'>
                    <p className='menu-link logout' onClick={logout}>Logout</p>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
