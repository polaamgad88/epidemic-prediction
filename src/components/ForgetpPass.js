import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const ForgetpPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onReset = async (e) => {
    e.preventDefault();
    
    console.log(process.env.REACT_APP_URL + ":4000/ResetPassword");
    console.log(process.env);
    
    await axios
      .post(
        process.env.REACT_APP_URL + ":4000/ResetPassword",
        {
          email: email,
        },
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
          localStorage.setItem('Rtoken', responseJson.data.Rtoken)
          console.log(responseJson)
          navigate(`/CheckMail/${email}`);
          console.log("sent")
        })
      .catch(
        (error) => {
          console.log(error);
          console.log("email not found ")
        });
  };
  return (
    <div class=" ">

      <section class="bg-blue-200">
        <div class="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-10 text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot password?
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <input type="email" name="email" id="email"
                  class="bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                   focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" required="" />
              </div>

              <button href="/" type="submit" class="w-full text-blue-900 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={onReset}>Reset passwod</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ForgetpPass;
