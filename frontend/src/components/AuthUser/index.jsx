import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        return user;
    }
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        
        setToken(token);
        setUser(user);
        navigate('/');
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });
    return {
        setToken: saveToken,
        logout,
        getToken,
        token,
        user,
        http
    }
}


export default AuthUser;