import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import '../../App.css'
const Register = ({ history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>

            <MetaData title={'Register'} />

            <div id="register-page">
                <div className="box-form">
                    <div className="left">
                        <div className="overlay">
                            <h1>Sprezza</h1>
                            <p>Fashion is what you adopt when you don't know who you are.</p>
                            <span>
                                <p>Register with social media</p>
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-google" aria-hidden="true"></i> Login with Google</a>
                            </span>
                        </div>
                    </div>

                    <div className="right">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h5>Register</h5>
                            <p>You Already have an account? <link to="/login" className="css-a">Log in</link> now!</p>

                            <div className="inputs">
                                <input id="fullname" className="fullname" type="text" placeholder="Enter your name" />
                                <br />
                                <input id="birthday" type="datetime" placeholder="Your birthday" />
                                <br />
                                <input id="email" type="text" placeholder="Enter your email" />
                                <br />
                                <input id="password" type="password" placeholder="Password" />
                                <input id="password" type="password" placeholder="Confirm Password" />
                                <div className="message__noti"></div>
                            </div>

                            <br />
                            <div className='form-group-av'>
                                <h2 htmlFor='avatar_upload'>Avatar</h2>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Ảnh nền'
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className=' input-custom'
                                            id='customFile'
                                            accept="images/*"
                                            onChange={onChange}
                                            placeholder='Select Images'
                                        />

                                    </div>
                                </div>
                            </div>

                            <br />
                            <br />

                            {loading ? <Loader /> : (
                                <button
                                    id="register_button"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    Register
                                </button>
                            )}
                            </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Register
