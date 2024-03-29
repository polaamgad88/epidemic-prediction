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
          navigate("/login")
        })
      .catch(
        (error) => {
          console.log(error)
        });
  };
  

  return (
    <nav class="flex justify-between px-10 py-2 items-center bg-blue-100 rounded-sm " >
      
    <a href="/admin" class="flex items-center bg-blue-100">
     <img src={require('./imgs/FLogo.png')} class="h-8 mr-3" alt="Logo" />
     
    </a>

      <div class="flex items-center bg-blue-100">
        <ul class="flex items-center space-x-12">
          {isLoggedIn ? (
            <>

              <li class="font-mono text-sm font-semibold text-slate-800 hover:animate-pulse  ">
                <button
                  class="hover:animate-pulse"
                  type="button"
                  onClick={onLogOut}>
                  Logout
                </button>
              </li>

            </>
          ) : (
            <li class="font-mono text-sm font-semibold text-slate-800 hover:animate-pulse  ">
              <a href="/Login">
                <button
                  class="hover:animate-pulse"
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