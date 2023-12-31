import { useState } from "react";
import { useAuth } from '../../../../contexts/AuthContext';
import { useLoginFormError } from './LoginErrorHadnler'
import { Link } from 'react-router-dom';
import './Login.css';



function Login() {
    const { login } = useAuth();
    const [firebaseError, setFirebaseError] = useState('');

    const [values, setValues] = useState({
        email: '',
        password: '',
    });


    const {
        formErrors,
        validateEmail,
        validatePassword
    } = useLoginFormError();


    const handleEmailBlur = () => {
        validateEmail(values.email);
    };

    const handlePasswordBlur = () => {
        validatePassword(values.password);
    };




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
                console.log('Login successful.');
            }
        } catch (error) {
            console.error('Login error:', error);
            console.error('login error message:', error.message);

            let errorMessage = 'Invalid email or password!';
            console.log('Setting firebase error:', errorMessage);
            setFirebaseError(errorMessage);
        };
    }


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
                                    onBlur={handleEmailBlur}
                                />
                                {formErrors.email && <p className='error'>{formErrors.email}</p>}
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
                                    onBlur={handlePasswordBlur}
                                />
                                {formErrors.password && <p className='error'>{formErrors.password}</p>}
                            </div>


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