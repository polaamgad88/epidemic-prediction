import React, { Component, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const ResetPass = () => {
  const [newPassword, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const changePassword = async (e) => {

    e.preventDefault();
    var status = false;
    var code;
    if (newPassword === ConfirmPassword) {
      await axios
        .post(
          "http://192.168.1.31:4000/changePassword",
          {
            newPassword: newPassword,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": 'Bearer ' + localStorage.getItem('Rtoken')
            }
          }
        )
        .then(
          (responseJson) => {
            status = responseJson.data.success
            code = responseJson.data.code
            localStorage.removeItem('Rtoken')
            console.log(responseJson)
          })
        .catch(
          (error) => {
            console.log(error);
          });
      if (status) {
        navigate("/login")
        console.log("changed")
      }
      else {
        console.log("unauthorized")

        navigate("/unauthorized")
      }
    }
    else {
      console.log("no match")
    }

  };
  return (
    <div class=" ">

      <section class="bg-blue-500 ">
        <div class="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-10 text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={changePassword}>

              <div>
                <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>


              <div>
                <input type="confirm-password" name="confirm-password" id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>


              <button type="submit" class="w-full text-blue-900 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>


            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ResetPass;
