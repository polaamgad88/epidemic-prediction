import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";


const Admin = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    var status = false;
    var code;
    axios
      .get(
        "http://192.168.1.31:4000/admin",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('Atoken')
          }
        }
      )
      .then(
        (responseJson) => {
          status = responseJson.data.success
          code = responseJson.data.code
          if (status) {
            setChecked(true)
            console.log("access gained")
          }
          else {
            if (code === 401) {
              console.log("no access to open this page")
              console.log("unauthorized")
              navigate("/unauthorized")
            }
            else {
              console.log("server error")
              navigate("/Login")
            }
          }
        })
      .catch(
        (error) => {
          console.log("unauthorized" + error)
          navigate("/unauthorized")
        });
  })
  if (!checked) return null;
  return (
    <div class="h-screen bg-blue-500">

      <body class=" bg-blue-500 ">

        <div class="p-10 ml-44 mr-16  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-28">



          <div class=" rounded overflow-hidden shadow-none mt-20">
            <button>
              <a href="/Add_doc">
                <img class="w-S64 h-64flex items-center justify-center rounded-full
       transition-transform duration-500 transform hover:scale-75
       " src={require('./imgs/1114161.png')}
                  alt="logo" />
              </a>

              <a href="/Add_doc">
                <p class=" hover:text-white text-neutral-900 mt-3 mb-3 
        font-mono text-lg font-extrabold 
          py-2 px-10   rounded-lg focus:outline-none focus:shadow-outline">Add Doctor profile</p>
              </a>
            </button>

          </div>




          <div class=" rounded overflow-hidden shadow-none my-20">
            <button>
              <a href="/search">
                <img class="w-64 h-64flex items-center justify-center rounded-full
       transition-transform duration-500 transform hover:scale-75
       " src={require('./imgs/1114190.png')}
                  alt="logo" />
              </a>
              <a href="/search">
                <div class=" mx-auto">
                  <p class=" hover:text-white text-neutral-900 
       font-mono text-lg font-extrabold 
        w-72 rounded-lg focus:outline-none focus:shadow-outline">Edit doctor profile</p></div>
              </a>
            </button>
          </div>







        </div>


      </body>
    </div>
  )
}

export default Admin;
