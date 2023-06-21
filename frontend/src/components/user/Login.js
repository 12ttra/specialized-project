import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import '../../App.css'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

const Login = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div id="login-page">
                        <div className="box-form">
                            <div className="left">
                                <div className="overlay">
                                    <h1>Sprezza</h1>
                                    <p>Fashion is what you adopt when you don't know who you are.</p>
                                    <span>
                                        <p>login with social media</p>
                                        <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                        <a href="#"><i className="fa fa-google" aria-hidden="true"></i> Login with Google</a>
                                    </span>
                                </div>
                            </div>

                            <div className="right">
                                <h5>Login</h5>
                                <p>Don't have an account? <a href="/register" className="css-a">Create Your Account</a> it takes less than a minute</p>
                                <div className="inputs">
                                    <input id="email-login" type="text" placeholder="Enter your email" />
                                    <br />
                                    <input id="pass-login" type="password" placeholder="Password" />
                                </div>

                                <br /><br />

                                <div className="remember-me--forget-password">
                                    {/* Angular */}
                                    <label>
                                        <input type="checkbox" name="item" checked />
                                        <span className="text-checkbox">Remember me</span>
                                    </label>
                                    <p>Forget password?</p>
                                </div>

                                <div className="message-error">

                                </div>

                                <br />
                                <button id="btn-login">Login</button>
                            </div>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
