import React, {useState, useEffect}  from 'react'
import {useNavigate, Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Navbar = () => {

    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const[url, setUrl] = useState(null);

    useEffect(() => {
      refreshToken();
      setUsername(localStorage.getItem('currentlyLoggedIn'));
    }, []);

    useEffect(() => {
      setUrl(location.pathname);
    },[location]);

    const refreshToken = async() => {
      try {
        const response = await axios.get('http://localhost:5000/token');
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      } catch (error) {
        if(error.response){
          navigate("/");
        }
      }
    };
    
    const axiosJWT = axios.create();
  
    axiosJWT.interceptors.request.use(async(config) => {
      const currDate = new Date();
      if(expire * 1000 < currDate.getTime()){
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            localStorage.removeItem('currentlyLoggedIn');
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

  return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                      <Link className={"nav-link" + (url === "/dashboard" ?" active" : "")} to="/dashboard">Home</Link>
                  </li>
                  <li className="nav-item">
                      <Link className={"nav-link" + (url === "/contacts" ?" active" : "")} to={`/contacts`}>My Contacts</Link>
                  </li>
                  <li className="nav-item">
                      <Link className={"nav-link" + (url === "/add-contact" ?" active" : "")} to='/add-contact'>Add Contact</Link>
                  </li>

              </ul>
          </div>
          <div className="mx-auto order-0">
              <a className="navbar-brand mx-auto" onClick={() => navigate('/dashboard')}>Contact App</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                  <span className="navbar-toggler-icon"></span>
              </button>
          </div>
          <div className="navbar-collapse collapse w-100 order-0 dual-collapse2">
              <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                      <Link className={"nav-link" + (url === `/user-settings/` + username ?" active" : "")} to={`/user-settings/${username}`}>{username}</Link>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" onClick={Logout}>Log Out</a>
                  </li>
              </ul>
          </div>
        </nav>
    )
}

export default Navbar;