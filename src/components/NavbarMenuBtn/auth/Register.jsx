import { useState } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import './Register.css';




function Register() {
    const { register } = useAuth();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [values, setRegisterValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });


    console.log(`email: ${values.email}, password: ${values.password}`);

    const changeHandler = (e) => {
        setRegisterValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(values.email, values.password);
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
                        <form onSubmit={handleRegister}>

                            <div className="form-group first">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    // with Separed State:
                                    // onChange={(e) => setEmail(e.target.value }
                                    // with Combined State: 
                                    // onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    // with changeHandler: 
                                    onChange={(e) => changeHandler(e)}
                                />
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
                                    // onChange={(e) => setPassword(e.target.value }
                                    // onChange={(e) => setValues({ ...values, password: e.target.value })}
                                    onChange={(e) => changeHandler(e)}
                                />
                            </div>

                            <div className="form-group last mb-3">
                                <label htmlFor="password">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm your password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={values.password}
                                    // onChange={(e) => setPassword(e.target.value }
                                    // onChange={(e) => setValues({ ...values, password: e.target.value })}
                                    onChange={(e) => changeHandler(e)}
                                />
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