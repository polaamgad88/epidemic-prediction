import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const Admin = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    var status = false;
    var code;
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/admin",
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
  },[navigate])
  if (!checked) return (
    <div className="h-screen flex justify-center items-center bg-blue-600">
      <div className="p-10 bg-blue-800 rounded-lg shadow-xl">
        <svg className="animate-spin h-12 w-12 text-gray-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 "></path>
        </svg>
        <h2 className="mt-4 text-lg font-medium text-gray-400 text-center">Loading...</h2>
      </div>
    </div>
  );
  return (
    <div class="h-screen bg-gradient-to-r from-blue-300 to-white">

      <body class=" bg-gradient-to-r from-blue-300 to-white ">

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
