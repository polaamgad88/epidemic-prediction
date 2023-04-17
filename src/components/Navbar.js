import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("Rtoken")
    localStorage.removeItem("Atoken")
    axios
      .get(
        "http://192.168.1.31:4000/logOut",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        }
      )
      .then(
        (responseJson) => {
          console.log(responseJson)
          navigate("/")
        })
      .catch(
        (error) => {
          console.log(error)
        });
  };

  return (

    <nav class="flex justify-between px-10 py-2 items-center bg-blue-500" >
      <a href="/">
        <img class="w-14 h-14" src={require('./imgs/logo.png')} alt="logo" />
      </a>
      <div class="flex items-center">
        <ul class="flex items-center space-x-12">
          <a href="/home" >
            <li class="font-mono text-sm font-semibold text-slate-800 hover:text-white transition-all ">
              <a href="/Main">
                <button
                  class="hover:animate-pulse"
                  type="button">
                  Home
                </button>
              </a>
            </li>
          </a>




          <li class="font-mono text-sm font-semibold text-slate-800 hover:text-white  ">
            <a href="/Admin">
              <button
                class="hover:animate-pulse"
                type="button">
                Admin page
              </button>
            </a>
          </li>

          <li class="font-mono text-sm font-semibold text-slate-800 hover:text-white ">
            <button
              class="hover:animate-pulse"
              type="button"
              onClick={onLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav >
  );
}

export default Navbar;
