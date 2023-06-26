import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Rtoken") || localStorage.getItem("Atoken");
    setIsLoggedIn(!!token);
  }, []);

  const onLogOut = () => {
    localStorage.removeItem("Rtoken")
    localStorage.removeItem("Atoken")
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/logOut",
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
          setIsLoggedIn(false);
          navigate("/")
        })
      .catch(
        (error) => {
          console.log(error)
        });
  };

  return (
    <nav class="flex justify-between px-10 py-2 items-center bg-gradient-to-r from-gray-200 to-blue-200 rounded-sm" >
      <a href="/">
        <img class="w-8 h-8" src={require('./imgs/logo.png')} alt="logo" />
      </a>
      <div class="flex items-center">
        <ul class="flex items-center space-x-12">
          {isLoggedIn ? (
            <>
              <li class="font-mono text-sm font-semibold text-slate-800 hover:animate-pulse transition-all ">
                <a href="/Main">
                  <button
                    class="hover:animate-pulse"
                    type="button">
                    Home
                  </button>
                </a>
              </li>
          
              <li class="font-mono text-sm font-semibold text-slate-800 hover:animate-pulse  ">
                <button
                  class="hover:animate-pulse"
                  type="button"
                  onClick={onLogOut}>
                  Logout
                </button>
              </li>
              
          <li class="font-mono text-sm font-semibold text-slate-800  hover:animate-pulse ">
            <a href="/Myprofile">
          <button class="hover:animate-pulse"
          type="button">       
          <span class="text-2xl">👨‍⚕️</span>

           
          </button>
          </a>
        </li> 
              
            </>
          ) : (
            <li class="font-mono text-sm font-semibold text-slate-800 ">
              <a href="/Login">
                <button
                  class="bg-blue-500 text-black px-3 py-1 rounded-md hover:animate-pulse"
                  type="button">
                  Login
                </button>
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav >
  );
}

export default Navbar;
