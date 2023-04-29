import React, { useState } from "react";
import { useNavigate , useParams  } from 'react-router-dom'

import axios from "axios";

const CheckMail = () => {
  const params = useParams();
  const [number, setNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");
  const navigate = useNavigate();
  const onCheck = async (e) => {
    e.preventDefault();
    var status = false;
    var code;
    await axios
      .post(
        process.env.REACT_APP_URL + ":4000/ConfirmCode",
        {
          number: number,
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
          console.log(responseJson)
          console.log("sent")
          navigate("/ResetPass")
        })
      .catch(
        (error) => {
          code = error.response.status
          console.log(error);
          if (code === 429)
            navigate("/toomanyrequests")
          else if (code === 403) {
            console.log("wrong code")
            setErrorMessage("wrong password")
          }
          else
            navigate("/unauthorized")
        });

    if (status) {

    }
    else {

    }
  };
  return (
    <div class=" ">

      <section class="bg-blue-500 ">
        <div class="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-2 text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              We sent a code to your email 

            </h2>

            <h4 class="mb-12 text-md text-center font-normal leading-tight tracking-tight
             text-gray-900 md:text-md dark:text-white opacity-50">
              Enter the 6-digit verification code sent to {params.email}.

            </h4>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={onCheck}>
              <div className="mb-5">
                <input type=" " name="code" id="code" maxlength="6"
                  class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                     focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                       dark:focus:border-blue-500"
                  onChange={(e) => setNumber(e.target.value)} placeholder="6 digit-code" required="" />
              </div>

              <a href="/forgetpassword">
                <p href="/forgetpassword" className=" text-right  text-sm text-white hover:text-[#FF6A3D] hover:underline">Resend code</p>
              </a>


              <button type="submit" class="w-full text-blue-900 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Submit</button>

              <p className="text-sm text-white opacity-50">If you don't see the email in your inbox, check your spam folder.</p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CheckMail;
