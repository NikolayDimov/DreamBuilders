import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import './Register.css';


function Register() {
    const { register } = useAuth();
    // const { errors, validateForm } = useFormValidation();

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });


    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');

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


    // Function to validate confirmPassword
    function validateConfirmPassword(confirmPass) {

        let isConfirmPassword = true;
        setConfirmPassError('');

        if (confirmPass === '') {
            setConfirmPassError('Confirm Password is required');
            isConfirmPassword = false;
            return isConfirmPassword;
        }

        if (confirmPass != values.password) {
            setConfirmPassError('Passwords do not match');
            isConfirmPassword = false;
            return isConfirmPassword;
        }

        return isConfirmPassword;
    }



    const changeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            let isEmailValid = validateEmail(values.email);
            let isPasswordValid = validatePassword(values.password);
            let isConfirmPasswordValid = validateConfirmPassword(values.confirmPassword);

            if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
                console.log(`email: ${values.email}`);
                console.log(`password: ${values.password}`);
                console.log(`confirmPass: ${values.confirmPassword}`);
            } else {
                await register(values.email, values.password);
            }
        } catch (error) {
            console.error('Registration error:', error);
            console.error('Registration error message:', error.message);
        }
    };


    return (
        <div className="container-register">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                    <div className="form-block mx-auto">
                        <div className="title">
                            <h3>Register</h3>
                        </div>
                        <form onSubmit={handleRegister} noValidate>

                            <div className="form-group first">
                                <label htmlFor="email">Email</label>
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

                            <div className="form-group last mb-3">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm your password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={changeHandler}
                                />
                                {confirmPassError && <p className='error'>{confirmPassError}</p>}
                            </div>

                            <div className="d-sm-flex mb-5 align-items-center">
                                <label className="control control--checkbox mb-3 mb-sm-0">
                                    <input type="checkbox" defaultChecked="checked" />
                                    <span className="caption">Remember me</span>
                                    <div className="control__indicator" />
                                </label>
                            </div>

                            <button className="btn btn-block btn-primary btn-margin" type="submit">Create Account</button>
                        </form>

                        <div className="register-link">
                            <p className="login-link">{`You already have an account`}</p>
                            <Link to="/login" className="login-link login-link-to">Login here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;