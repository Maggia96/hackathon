import './style.css'
import Home from '../Home';
import { useState } from 'react';
import AuthUser from '../../components/AuthUser';
import { HaskathonBG, HackLogo } from '../../assets/img/index';
import { useToasts } from 'react-toast-notifications';

const Login = () => {
    const { http, setToken, getToken } = AuthUser();
    const { addToast } = useToasts();

    if (getToken()) return <Home />;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        return email === '' || password === '';
    }
    const submitForm = () => {
        if (validateForm())
            return addToast('You must complete the user and password fields.', {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'warning'
            });
        setLoading(true);
        http.post(
            '/login',
            {
                email: email,
                password: password
            }
        ).then((res) => {
            setLoading(false);
            addToast(`Welcome ${res.data.user.name}`, {
                autoDismiss: true,
                autoDismissTimeout: 3000,
                appearance: 'success'
            });
            setToken(res.data.user, res.data.access_token);
        }).catch((error => {
            addToast('Incorrect credentials.', {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'error'
            });
            setLoading(false);
        }))
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            submitForm();
        }
    }
    return (
        <div className="main-login-container">
            <div className='container-fluid login_container'>
                <form className="form-horizontal form-control" role="form">
                    <h3 className='login-label'>Log In</h3>
                    <img className='login-logo' src={HackLogo} alt="" />
                    <div className="form-group px-lg-5">
                        <div className="">
                            <input
                                type="email"
                                className="form-control login-inputs"
                                name="email"
                                placeholder='Email...'
                                onChange={e => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="form-group px-lg-5">
                        <div className="">
                            <input
                                placeholder='Password...'
                                type="password"
                                className="form-control login-inputs"
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="form-group submit">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={submitForm}
                        >
                          { loading ?
                             <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                             : 'log in'
                          }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
