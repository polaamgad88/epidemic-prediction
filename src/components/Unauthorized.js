import React from "react";
import Navbar from "./Navbar";

const Unauthorized = () => {
  return (
    <div class=" ">
    <Navbar/>
    <div class="h-screen w-full flex flex-col justify-center items-center bg-blue-500">
      <h1 class="text-12xl font-extrabold text-white tracking-widest">401</h1>
      <div class="bg-[#FF6A3D] px-2 text-xl rounded rotate-12 absolute">
       Unauthorized Access
      </div>
      <button class="mt-5">
          <a href="/Main" class="relative inline-block text-sm font-medium
             text-white group active:text-orange-500 focus:outline-none focus:ring">
          
          </a>
        </button>
    </div>
    </div>
  );
};

export default Unauthorized;
