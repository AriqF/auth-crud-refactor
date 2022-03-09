import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
// import jwt_decode from 'jwt-decode';

const ContactAdd = () => {

    const currUsername = localStorage.getItem('currentlyLoggedIn');
    const [uid, setUid] = useState();
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const swal = withReactContent(Swal);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${currUsername}`);
            setUid(response.data.id);
        } catch (error) {
            console.error(error);
        }
    }

    const AddContact = (e) => {
        e.preventDefault(); //prevent page reload on submit
        try{
            axios.post('http://localhost:5000/add-contact', {
                fname: fname, 
                lname: lname, 
                email: email, 
                phoneNum: phoneNum, 
                userId: uid,
            });
            return swal.fire({
                title: <strong>Contact has been added successfully!</strong>,
                icon: 'success'
            }).then(function() {
                navigate('/contacts');
            });
        } catch (error) {
            if(error.response){
                // console.log(error.response.data.msg);
                setMsg(error.response.data.msg);
                return swal.fire({
                    title: <strong>{error.response.data.msg}</strong>,
                    icon: 'error'
                })
            }
        }
    }

  return (
      <section className="page-section">
        <div className="container text-white">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-12">
                    <div className="card w-50 mx-auto text-center" id="contactBox">
                        <div className="card-body">
                            <form onSubmit={AddContact}>
                                <p className="text-center">{msg}</p>
                                <input type="hidden" value={uid} />
                                <div className="mb-3">
                                    <label htmlFor='fname' className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="fname" name="fname" placeholder="First Name" required
                                        value={fname} onChange={(e) => setFName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='lname' className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lname" name="lname" placeholder="Last Name" required
                                        value={lname} onChange={(e) => setLName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='email' className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="someone@mail.com" required
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='phoneNum' className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="phoneNum" name="phoneNum" placeholder="+62-xxx-xx-xxx" required
                                        value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactAdd