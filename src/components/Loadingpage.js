import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
const Loadingpage = () => {
  
  return (
    <div>
    <Navbar />
    <div className="h-screen flex justify-center items-center bg-blue-600">
    <div className="p-10 bg-blue-800 rounded-lg shadow-xl">
      <svg className="animate-spin h-12 w-12 text-gray-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 "></path>
      </svg>
      <h2 className="mt-4 text-lg font-medium text-gray-400 text-center">Loading...</h2>
    </div>
  </div>
    </div>

  );
  }
  

export default Loadingpage;
