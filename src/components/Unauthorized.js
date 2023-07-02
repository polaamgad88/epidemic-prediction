import React from "react";
import Navbar from "./Navbar";

const Unauthorized = () => {
  return (
    <div class=" ">
      <Navbar />
      <div class="h-screen w-full flex flex-col justify-center items-center bg-blue-200">
        <h1 class="text-12xl font-extrabold text-black tracking-widest">401</h1>
        <div class="bg-[#FF6A3D] px-2 text-xl rounded rotate-12 absolute">
          Unauthorized Access
        </div>
        <button class="mt-5">
          <a href="/login" class="relative inline-block text-sm font-medium
             text-white group active:text-orange-500 focus:outline-none focus:ring">
            <span
              class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white 
              group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span class="relative block px-8 py-3 bg-[#FF6A3D] border border-current">
              <p>Go login</p>
            </span>
          </a>
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
