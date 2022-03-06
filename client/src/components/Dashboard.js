import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const [userId, setUserId] = useState();
  const [username, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [])

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config) => {
    const currDate = new Date();
    if(expire * 1000 < currDate.getTime()){
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUserName(decoded.username);
      setUserId(decoded.userID);

      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get(`http://localhost:5000/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setUsers(response.data);
  }

  return (
    <>
      <div className="container mt-5 text-white">
        <div className="wrapper">
          <h1 className="text-center">Hi {username}, Welcome Back!</h1>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h2 className="text-center">Contact App user list</h2>
            <table className="table text-white text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                    <>
                      <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.fname}</td>
                          <td>{user.lname}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                      </tr>
                    </>
                  ))}
              </tbody>
          </table>
          </div>


        </div>
      </div>
    </>
  )
}

export default Dashboard