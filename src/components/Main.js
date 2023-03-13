import React from "react";
import Navbar from "./Navbar";

const Main = () => {
  return (
    <div class="h-screen bg-blue-500">
     
      <body class="mt-28 bg-blue-500 ">
        <div class="md:flex md:justify-center p-10  grid grid-cols-1 sm:grid-cols-1 
        md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-3 gap-16 justify-center">


        
          <div class=" rounded overflow-hidden shadow-none">
          <a href="/Add_rec">  
          <button>
              <img
                class="w-64 h-64flex items-center justify-center rounded-full
       transition-transform duration-500 transform hover:scale-75"
                src={require("./imgs/AddRec.jpg")}
                alt="logo"/>
              <p class=" hover:text-neutral-900 hover:font-extrabold font-sans text-lg font-bold
                text-white mt-3 mb-3 py-2 px-10   rounded-lg focus:outline-none focus:shadow-outline">
                Add Record</p></button></a>
          </div>

          <div class=" rounded overflow-hidden shadow-none">


          <a href="/Dashboard">
            <button>
              <img
                class="w-64 h-64flex items-center justify-center rounded-full
       transition-transform duration-500 transform hover:scale-75
       "
                src={require("./imgs/Dashb.jpg")}
                alt="logo"
              />
              <div class="py-2 px-10 mr-20 ">
              <p
              class=" hover:text-neutral-900 hover:font-extrabold font-sans text-lg font-bold  text-white mt-3 mb-3 
      
        py-2 px-10   rounded-lg focus:outline-none focus:shadow-outline"
            >
              View Dashboard
            </p>
              </div>
            </button>
            </a>
          </div>

          <div class=" rounded overflow-hidden shadow-none">


          <a href="/Alerts">
            <button>
              <img
                class="w-64 h-64flex items-center justify-center rounded-full
       transition-transform duration-500 transform hover:scale-75
       "
                src={require("./imgs/warnin.jpg")}
                alt="logo"
              />

              <p
                class="  mt-3 mb-3 
                hover:text-neutral-900 hover:font-extrabold font-sans text-lg font-bold  text-white
       py-2 px-10  w-52 rounded-lg focus:outline-none focus:shadow-outline"
              >
                View Alerts
              </p>
            </button>
            </a>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Main;
