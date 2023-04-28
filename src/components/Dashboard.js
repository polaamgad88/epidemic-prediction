import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
const Dashboard = () => {
   const navigate = useNavigate();
   const [checked, setChecked] = useState(false);
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
               var researcher = responseJson.data.researcher
               var observer = responseJson.data.observer
               if (status && (researcher || observer)) {
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
   },[])
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
      <div class="h-screen bg-blue-500">
         <Navbar />

         <h2 class="text-3xl font-bold leading-tighter
    tracking-tighter text-white flex justify-center items-center mb-8 mt-8">Dashboard</h2>


         <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg bg-blue-500 dark:border-gray-700">
            <div class="grid grid-cols-3 gap-4 mb-4">
               <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
               </div>
               <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
               </div>
               <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
               </div>
            </div>
            <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
               <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
               </div>
               <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
               </div>
               <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
               </div>
               <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
               </div>
            </div>


         </div>
      </div>
   );
};

export default Dashboard;
