import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const Register = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const swal = withReactContent(Swal);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault(); //prevent page reload on submit
        try {
            await axios.post('http://localhost:5000/register', {
                fname: fname,
                lname: lname,
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });
            return swal.fire({
                title: <strong>Register Successfully!</strong>,
                text: "You can login to start using contact app",
                icon: 'success'
            }).then(function() {
                navigate('/login');
            });
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
                    <div className="card w-50 mx-auto text-center d-flex" id="authBox" style={{marginTop: '0px'}}>
                        <div className="card-body">
                            <form onSubmit={Register}>
                                <p className="text-center error-msg">{msg}</p>
                                <div className="form-header text-center">
                                    <h2>Register</h2>
                                    <a className="auth-link badge" onClick={() => navigate('/login')}>Already have an account? Login</a>
                                </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="fname" className="form-label">First Name</label>
                                            <input type="text" className="form-control" name="fname" id="fname" aria-describedby="usernameHelp" 
                                                value={fname} onChange={(e) => setFname(e.target.value)} required
                                            />
                                        </div>    
                                        <div className="col-md-6">
                                            <label htmlFor="lname" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" name="lname" id="lname" aria-describedby="usernameHelp" 
                                                value={lname} onChange={(e) => setLname(e.target.value)} required
                                            />
                                        </div>    
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" name="username" id="username" aria-describedby="usernameHelp" 
                                            value={username} onChange={(e) => setUserName(e.target.value)} required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"
                                            value={email} onChange={(e) => setEmail(e.target.value)} required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" id="password"
                                            value={password} onChange={(e) => setPassword(e.target.value)} required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" name="confirmPassword" id="confirmPassword"
                                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                        />
                                    </div>
                                    <div style={{marginTop: '40px'}}>
                                        <button type="submit" className="btn btn-auth w-100 btn-block">Register</button>
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

export default Register;

//'rafce' to generate auto