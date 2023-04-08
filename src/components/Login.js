import React, { Component, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onLogin = async (e) => {
    e.preventDefault();
    var status = false;
    const data = { email, password }; // get from form data 
    await fetch('http://192.168.1.31:4000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(
        (response) => response.json()
      )
      .then(
        (responseJson) => {
          localStorage.setItem('token', responseJson.token)
          status = responseJson.success
        })
      .catch(
        (error) => {
          console.log(error);
        });
    if (status)
      navigate("/Main")
    else {
      console.log("wrong password")
    }
  };
  return (
    <div class="sm:flex sm:justify-center  min-h-screen  items-center  bg-gradient-to-t from-blue-500 to-cyan-900">
      <div class="max-w-md h-max w-96 mx-auto inline-block mr-0 ">
        <div class="bg-slate-900 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 ">
          <div class="">
            <nav class="flex  bg-blue-500 rounded-3xl p-2  py-2 ">
              <div class="w-12 h-12">
                <img
                  src={require('./imgs/logo.png')}
                  alt="logo"
                />
              </div>
            </nav>
          </div>

          <div class=" mb-9">
            <img class="rounded-xl mt-9" src={require("./imgs/loginIMG.jpg")} />
          </div>

          <h2 class="text-xl animate-bounce font-mono font-normal mb-4 text-center text-white">
            {" "}
            &#x1F44B; Welcome Back <br /> Doctor!
          </h2>
          <h2 class="text-xs font-normal mb-2 text-center text-gray-400">
            <h2 class="text-gray-200 opacity-90">Tip of the day <br /></h2>
            Be extremely organized and make sure you make a system for all the things
            you have to get done during the day, prioritizing those that are most important.{" "}
          </h2>
        </div>
      </div>

      <div class="max-w-md h-max w-96 mx-auto inline-block ml-0">
        <div class="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
          <h2 class="text-3xl font-bold mb-6 mt-14 text-center text-blue-500">
            Login
          </h2>
          <h2 class="text-xs font-normal mb-20 text-center text-gray-400">
            Welcome Back dear user, <br />
          </h2>

          <form onSubmit={onLogin}
          >
            <div class="mb-8">
              <input
                class="h-9 shadow-md rounded w-full py-2 px-3
             text-gray-900  border border-slate-100 hover:border-blue-500 "
                id="username"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email "
              />
            </div>

            <div class="mb-1">
              <input
                class="h-9 shadow-md rounded w-full py-2 px-3
             text-gray-900  border border-slate-100 hover:border-blue-500 "
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <a
              class=" ml-48 mb-28 font-bold text-xs text-decoration-line: underline
           text-gray-400 hover:text-black"
              href="#">
              Forgot Password?
            </a>
            <div class="flex items-center justify-center">

              <button
                class="bg-blue-500 hover:bg-blue-700 text-white mt-16 mb-3
              font-bold py-2 px-4 w-52 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
                value="Submit"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
