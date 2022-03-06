import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-white d-flex align-items-center justify-content-center flex-column">
      <div className="wrapper">
        <h1 className="typewrite">Welcome To Contact App!</h1>  
      </div>
      <div className="d-flex flex-row">
        <Link to="/login" className="btn home-auth-button">Login</Link>
        <Link to="/register" className="btn home-auth-button">Register</Link>

      </div>
    </div>
  )
}

export default Home