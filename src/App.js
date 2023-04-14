import Login from "./components/Login";
import Main from "./components/Main";
import Landing from "./components/Landing";
import Alerts from "./components/Alerts";
import Dashboard from "./components/Dashboard";
import TooManyRequests from "./components/TooManyRequests";
import Admin from "./components/Admin";
import Add_rec from "./components/Add_rec";
import Add_doc from "./components/Add_doc";
import { Routes, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component, useEffect } from "react";
import NotFound from "./components/NotFound";
import ResetPass from "./components/ResetPass";
import ForgetpPass from "./components/ForgetpPass";
import CheckMail from "./components/CheckMail";
import Search from './components/Search';
import Myprofile from './components/Myprofile';
import Edit_doc from './components/Edit_doc';
import Unauthorized from "./components/Unauthorized";
class App extends Component {
  render() {
    return (
      <div class=" bg-blue-500">
        <Router>
          <Routes >
            <Route exact path="/" element={<Landing />} />
            <Route path='/main' element={<Main />} />
            <Route path='/forgetpassword' element={<ForgetpPass />} />
            <Route path='/ResetPass' element={<ResetPass />} />
            <Route path='/CheckMail' element={<CheckMail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/alerts' element={<Alerts />} />
            <Route path='/add_rec' element={<Add_rec />} />
            <Route path='/add_doc' element={<Add_doc />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/Search' element={<Search/>} />
            <Route path='/editdoc' element={<Edit_doc/>} />
            <Route path='/toomanyrequests' element={<TooManyRequests />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    );
  };
}


export default App;
