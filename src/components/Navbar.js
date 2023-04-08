import React from "react";

const Navbar = () => (
  <nav class="flex justify-between px-10 py-2 items-center bg-blue-500">
    <a href="/Landing">
      <img class="w-14 h-14" src={require('./imgs/logo.png')} alt="logo" />
    </a>
    <div class="flex items-center">





      <ul class="flex items-center space-x-12">
        <a href="/home" >
          <li class="font-mono text-sm font-semibold text-slate-800 hover:text-white transition-all ">
            <a href="/Main">
              <button
                class="hover:animate-pulse"
                type="button">
                Home
              </button>
            </a>

          </li>
        </a>




        <li class="font-mono text-sm font-semibold text-slate-800 hover:text-white  ">
          <a href="/Admin">
            <button
              class="hover:animate-pulse"
              type="button">
              My profile
            </button>
          </a>
        </li>

        <li class="font-mono text-sm font-semibold text-slate-800 hover:text-white ">
          <a href="/">
            <button
              class="hover:animate-pulse"
              type="button">
              Logout
            </button>
          </a>
        </li>



      </ul>
    </div>
  </nav>
);

export default Navbar;
