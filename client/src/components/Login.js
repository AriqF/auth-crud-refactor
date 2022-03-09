import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault(); //prevent page reload on submit
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            localStorage.setItem('currentlyLoggedIn', response.data.username);
            navigate('/dashboard');
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <section className="page-section">
        <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-12">
                    <div className="card w-50 mx-auto text-center" id="authBox">
                        <div className="card-body">
                           <form onSubmit={Auth}>
                               <p className="text-center error-msg">{msg}</p>
                               <div className="form-header text-center">
                                   <h2>Login</h2>
                                   <a className="auth-link badge" onClick={() => navigate('/register')}>Don't have an account, Register</a>
                               </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"
                                        value={email} onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" id="password"
                                        value={password} onChange={(e) => {setPassword(e.target.value)}}
                                    />
                                </div>
                                <div style={{marginTop: '40px'}}>
                                    <button type="submit" className="btn btn-auth w-100 btn-block">Login</button>
                                </div>
                           </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login;

//'rafce' to generate auto