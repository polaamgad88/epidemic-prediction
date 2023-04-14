import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";

const Main = () => {
  /*variables for account level should get this values at login stage */
  //BACK FARKHA 
  //------------------------
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [researcher, setresearcher] = useState(false);
  const [doctor, setdoctor] = useState(false);
  const [observer, setobserver] = useState(false);
  useEffect(() => {
    var status = false;
    var code;
    axios
      .get(
        "http://192.168.1.31:4000/main",
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
          setresearcher(responseJson.data.researcher)
          setdoctor(responseJson.data.doctor)
          setobserver(responseJson.data.observer)
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
      <Navbar />

      <body class="mt-28 bg-blue-500 ">
        <div class="md:flex md:justify-center p-10  grid grid-cols-1 sm:grid-cols-1 
        md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-3 gap-16 justify-center">


          {/* doctor is only have access to add record */}
          <div class=" rounded overflow-hidden shadow-none"
            className={`${doctor ? 'block' : 'hidden'}`}>
            <a href="/Add_rec">
              <button>
                <img class="w-64 h-64flex items-center justify-center rounded-full transition-transform duration-500 transform hover:scale-75"
                  src={require("./imgs/AddRec.jpg")} alt="logo" />
                <p class=" hover:text-neutral-900 hover:font-extrabold font-sans text-lg font-bold
                text-white mt-3 mb-3 py-2 px-10   rounded-lg focus:outline-none focus:shadow-outline">
                  Add Record</p></button></a>
          </div>



          {/* researcher OR representative of ministry have access to view alerts */}
          <div class=" rounded overflow-hidden shadow-none"
            className={`${researcher || observer ? 'block' : 'hidden'}`}>
            <a href="/Dashboard">
              <button>
                <img class="w-64 h-64flex items-center justify-center 
                rounded-full transition-transform duration-500 transform hover:scale-75" src={require("./imgs/Dashb.jpg")}
                  alt="logo" />

                <p class="mt-5  hover:text-neutral-900 hover:font-extrabold font-sans text-lg font-bold  text-center 
                text-white  inline-block  rounded-lg focus:outline-none focus:shadow-outline">
                  View Dashboard
                </p></button></a>
          </div>


          {/* doctor and representative of ministry are only have access to view alerts */}
          <div class=" rounded overflow-hidden shadow-none"
            className={`${observer ? 'block' : 'hidden'}`}>
            <a href="/Alerts" >
              <button>
                <img
                  class="w-64 h-64flex items-center justify-center rounded-full transition-transform duration-500 transform hover:scale-75"
                  src={require("./imgs/warnin.jpg")} alt="logo" />
                <p class="mt-3 mb-3 text-center inline-block  hover:text-neutral-900 hover:font-extrabold font-sans text-lg font-bold 
                   text-white py-2 px-10  w-52 rounded-lg focus:outline-none focus:shadow-outline">
                  View Alerts </p></button></a>
          </div>




        </div>
      </body>
    </div>
  );
};

export default Main;
