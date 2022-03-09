import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './index.css';
import UserEdit from "./components/UserEdit";
import ContactAdd from "./components/ContactAdd";
import ContactList from "./components/ContactList";
import ContactEdit from "./components/ContactEdit";


//1:01:18
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<><Navbar /> <Dashboard /></>} />
        <Route path="/user-settings/:username" element={<><Navbar /> <UserEdit /></>} />
        <Route path="/contacts" element={<><Navbar /> <ContactList /></>} />

        <Route path="/add-contact" element={<><Navbar /> <ContactAdd /></>} />
        <Route path="/contact/:id" element={<><Navbar /> <ContactEdit /></>} />
      </Routes>
    </BrowserRouter>
  );
}


//react-router-dom v6
export default App;
