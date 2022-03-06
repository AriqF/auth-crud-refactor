import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import "bulma/css/bulma.css";
import axios from 'axios';

//default credentials, agar tidak mengirim credentian setiap request
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

