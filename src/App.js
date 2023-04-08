import Login from "./components/Login";
import Main from "./components/Main";
import Landing from "./components/Landing";
import Alerts from "./components/Alerts";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Add_rec from "./components/Add_rec";
import Add_doc from "./components/Add_doc";
import { Routes, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import React , { Component , useEffect } from "react";
import NotFound from "./components/NotFound";
import ResetPass from "./components/ResetPass";
import ForgetpPass from "./components/ForgetpPass";
import CheckMail from "./components/CheckMail";
class App extends Component {
  render() {
    return (
      <div class=" bg-blue-500">
      <Router>
      <Routes >
      <Route exact path="/" element={<Login/>} />
        <Route path='/Main' element={<Main />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Alerts' element={<Alerts />} />
        <Route path='/Add_rec' element={<Add_rec />} />
        <Route path='/Add_doc' element={<Add_doc />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Landing' element={<Landing />} />
        <Route path='/NotFound' element={<NotFound />} />
      </Routes>
      </Router>
      </div>
    );
  };
}


export default App;