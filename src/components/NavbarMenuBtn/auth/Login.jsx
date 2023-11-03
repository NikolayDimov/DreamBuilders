import { useState } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Login.css';



function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await login(email, password);
        } catch (error) {
          console.error('Login error:', error);
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
                        <form onSubmit={handleLogin}>
                            <div className="form-group first">
                                <label htmlFor="username">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your Email"
                                    id="username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group last mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your Password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
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