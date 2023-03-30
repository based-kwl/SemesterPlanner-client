import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import axios from "axios";
import {HandleLogout} from "./components/Authentication/Authentification";
import 'react-perfect-scrollbar/dist/css/styles.css';


axios.defaults.withCredentials = true; // to implicitly send cookie with all axios requests

// implicitly intercept all axios responses; on fulfilled response, return the response to the axios request call;
// if error is returned, check if error code is 403 (missing or bad/expired token)
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 403 || (error.response.status === 401 && localStorage.getItem('email')))
        HandleLogout();
    else
        return Promise.reject(error);
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
