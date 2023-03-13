import Login from "./components/Login";
import Main from "./components/Main";

import Landing from "./components/Landing";
import Alerts from "./components/Alerts";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Add_rec from "./components/Add_rec";
import Add_doc from "./components/Add_doc";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ReactDOM } from 'react';

const App = () => {
  return (
    <div class="bg-blue-500 ">
    <Navbar/>
    <Landing/>
    </div>
  );
};

export default App;