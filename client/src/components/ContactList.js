import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const ContactList = () => {

  const currUsername = localStorage.getItem('currentlyLoggedIn');
  const [uid, setUid] = useState();
  const [contacts, setContacts] = useState([]);

  const swal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, [uid]);


  const getUser = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/user/${currUsername}`);
        setUid(response.data.id);
    } catch (error) {
        if(error.response){
          console.log(`server error: ${error}`);
        }
        console.error(error);
    }
  }

  const getContacts = async () => {
    getUser();
    try {
      const response = await axios.get('http://localhost:5000/contacts', {
        params: {
          userId: uid
        }
      });
      setContacts(response.data);
    } catch (error) {
      if(error.response){
        console.error(error.response.data.msg);
      }
      console.error(error);
    }
  }

  const deleteContact = async (id) => {
    try {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then( async (result) => {
        const response = await axios.delete('http://localhost:5000/contact/delete', {
          params: {
            id: id,
            userId: uid
          }
        });
        // console.log(response.status)
        if (response.status === 200) {
          Swal.fire(
            'Deleted!',
            'Contact has been deleted.',
            'success'
          ).then(() => {
            navigate('/dashboard');
          })
        }
      })
    } catch (error) {
      if(error.response){
        console.log(error.response.data.msg);
      }
      console.log(error);
    }
  }

  return (
    <div className="container mt-5 text-white">
        <div className="container text-center d-flex align-items-center">
          <h2>UID: {uid}</h2>
            <table className="table text-white">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                    <>
                      <tr key={contact.id}>
                          <td>{index + 1}</td>
                          <td>{contact.fname}</td>
                          <td>{contact.lname}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phoneNum}</td>
                          <td>
                            <div className="row">
                              <div className="col-6">
                                <button className="badge btn btn-info">
                                  Edit
                                </button>  
                              </div>  
                              <div className="col-6">
                                <button className="badge btn btn-danger" onClick={(() => deleteContact(contact.id))}>
                                  Delete
                                </button>  
                              </div>  
                            </div>
                          </td>

                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
        </div>
    </div>
  )
}

export default ContactList