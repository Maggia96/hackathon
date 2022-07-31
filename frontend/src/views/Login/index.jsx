import { useState } from 'react';
import AuthUser from '../../components/AuthUser';
import Home from '../Home';
import { HaskathonBG } from '../../assets/img/index';
import { useToasts } from 'react-toast-notifications';

import './style.css'


const Login = () => {
    const { http, setToken, getToken } = AuthUser();
    const { addToast } = useToasts();

    if (getToken()) return <Home />;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        http.post(
            '/login',
            {
                email: email,
                password: password
            }
        ).then((res) => {
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
        }))
    }

    return (
        <div className='container-fluid login_container'>
            <form className="form-horizontal form-control" role="form">
                <h3 className='login-label'>Log In</h3>
                <img className='login-logo' src={HaskathonBG} alt="" />

                <div className="form-group px-lg-5">
                    <div className="">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder='Email...'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group px-lg-5">
                    <div className="">
                        <input
                            placeholder='Password...'
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group submit">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submitForm}
                    >Log in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
