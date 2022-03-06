import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
    
    const currUsername = localStorage.getItem('currentlyLoggedIn');
    const[id, setId] = useState();
    const[email, setEmail] = useState('');
    const[fname, setFname] = useState('');
    const[lname, setLname] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async() =>{
        try {
            const response = await axios.get(`http://localhost:5000/user/${currUsername}`)
            setId(response.data.id);
            setFname(response.data.fname);
            setLname(response.data.lname);
            setEmail(response.data.email);
        } catch (error) {
            console.error(error);
        }
    }

    const updateUser = async (e) => {
        try {
            await axios.patch(`http://localhost:5000/user/edit/${id}`, {
                fname, lname
            });
            // console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error(`error => ${error}`);
        }
    }

  return (
    <section className="page-section">
        <div className="container text-white">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-12">
                    <div className="card w-50 mx-auto text-center" id="contactBox">
                        <h2 className="mt-3">User Settings</h2>
                        <div className="card-body">
                            <form onSubmit={updateUser}>
                                {/* <p className="text-center">{msg}</p> */}
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
                                    <label htmlFor='email' className="form-label">Email</label>
                                    <abbr title="You can't change your email">                                    
                                        <input type="email" className="form-control" id="email" name="email" disabled
                                            value={email} 
                                        />
                                    </abbr>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Change</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default UserEdit