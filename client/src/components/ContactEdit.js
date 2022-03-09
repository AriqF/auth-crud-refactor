import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ContactEdit = () => {

    // const [uid, setUid] = useState();
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getContact();
        console.log(id)
    }, []);

    const getContact = async () => {
        try {
            const contact = await axios.get(`http://localhost:5000/contact/${id}`);
            // console.log(contact.data);
            // console.log(`fname: ${contact.data[0].fname}`);
            setFName(contact.data[0].fname);
            setLName(contact.data[0].lname);
            setEmail(contact.data[0].email);
            setPhoneNum(contact.data[0].phoneNum);
        } catch (error) {
            if(error.response){
                console.error(error.response.data.msg);
            }
            console.log(error);
        }
    };

    const updateContact = async(e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/contact/${id}`, {
            fname, lname, email, phoneNum
        });
        navigate('/contacts');
    }

  return (
    <section className="page-section">
        <div className="container text-white">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-12">
                    <div className="card w-50 mx-auto text-center" id="contactBox">
                        <div className="card-body">
                            <form onSubmit={updateContact}>
                                <div className="mb-3">
                                    <label htmlFor="fname" className="form-label">First Name</label>
                                    <input type="text" name="fname" placeholder={fname} className="form-control"
                                        value={fname} onChange={(e) => setFName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lname" className="form-label">Last Name</label>
                                    <input type="text" name="lname" placeholder={lname} className="form-control"
                                        value={lname} onChange={(e) => setLName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" name="email" placeholder={email} className="form-control"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNum" className="form-label">Phone Number</label>
                                    <input type="text" name="phoneNum" placeholder={phoneNum} className="form-control"
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

export default ContactEdit;