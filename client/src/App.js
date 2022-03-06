import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './index.css';
import AddContact from "./components/AddContact";
import UserEdit from "./components/UserEdit";
import ContactList from "./components/ContactList";


//1:01:18
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<><Navbar /> <Dashboard /></>} />
        <Route path="/contacts" element={<><Navbar /> <ContactList /></>} />
        <Route path="/add-contact" element={<><Navbar /> <AddContact /></>} />
        <Route path="/user-settings/:username" element={<><Navbar /> <UserEdit /></>} />
      </Routes>
    </BrowserRouter>
  );
}


//react-router-dom v6
export default App;
