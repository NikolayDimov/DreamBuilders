import { useState, useEffect } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Login.css';



function Login() {
    const { login } = useAuth();
    const [firebaseError, setFirebaseError] = useState('');

    const [values, setValues] = useState({
        email: '',
        password: '',
    });


    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isEmailValid = true;
        setEmailError('');

        if (email === '') {
            setEmailError('Email is required');
            isEmailValid = false;
            return isEmailValid;
        }

        if (!emailRegex.test(email)) {
            setEmailError('Provide a valid email address');
            isEmailValid = false;
            return isEmailValid;
        }

        return isEmailValid;
    }


    // Function to validate password
    function validatePassword(pass) {

        let isPasswordValid = true;
        setPasswordError('');

        if (pass === '') {
            setPasswordError('Password is required');
            isPasswordValid = false;
            return isPasswordValid;
        }

        if (pass.length < 6 || pass.length > 12) {
            setPasswordError('Password must be between 6 and 12 characters long');
            isPasswordValid = false;
            return isPasswordValid;
        }

        return isPasswordValid;
    }


    const changeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let isEmailValid = validateEmail(values.email);
            let isPasswordValid = validatePassword(values.password);

            if (!isEmailValid || !isPasswordValid) {
                console.log(`email: ${values.email}`);
                console.log(`password: ${values.password}`);
            } else {
                await login(values.email, values.password);
            }
        } catch (error) {
            console.error('Login error:', error);
            console.error('login error message:', error.message);
            let errorMessage = 'Invalid email or password. Please try again.';

            // Check if the error from Firebase has more specific information
            if (error.code === 400) {
                errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            }

            console.log('Setting firebase error:', errorMessage);
            setFirebaseError(errorMessage);
        }
    };



    return (
        <div className="container-login">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                    <div className="form-block mx-auto">
                        <div className="title">
                            <h3>Login</h3>
                        </div>
                        <form onSubmit={handleLogin} noValidate>

                            <div className="form-group first">
                                <label htmlFor="username">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={changeHandler}
                                />
                                {emailError && <p className='error'>{emailError}</p>}
                            </div>

                            <div className="form-group last mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={changeHandler}
                                />
                                {passwordError && <p className='error'>{passwordError}</p>}
                            </div>

                            {firebaseError}
                            {firebaseError && <p className='error'>{firebaseError}</p>}

                            <div className="d-sm-flex mb-5 align-items-center">
                                <label className="control control--checkbox mb-3 mb-sm-0">
                                    <input type="checkbox" defaultChecked="checked" />
                                    <span className="caption">Remember me</span>
                                    <div className="control__indicator" />
                                </label>
                                <span className="ml-auto">
                                    <a href="#" className="forgot-pass">
                                        Forgot Password
                                    </a>
                                </span>
                            </div>
                            <button className="btn btn-block btn-primary btn-margin" type="submit">Log In</button>

                        </form>
                        <div className="register-link">
                            <p className="register">{`You don't have an account`}</p>
                            <Link to="/register" className="register register-link-to">Register here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;