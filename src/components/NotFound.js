import React from "react";

const NotFound = () => {
  return (
    <div class=" ">
  
    <main class="h-screen w-full flex flex-col justify-center items-center bg-blue-500">
      <h1 class="text-12xl font-extrabold text-white tracking-widest">404</h1>
      <div class="bg-[#FF6A3D] px-2 text-xl rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
          <a href="/Main" class="relative inline-block text-sm font-medium
             text-white group active:text-orange-500 focus:outline-none focus:ring">
            <span
              class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white 
              group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span class="relative block px-8 py-3 bg-[#FF6A3D] border border-current">
              <p>Go Home</p>
            </span>
          </a>
        </button>
    </main>
    </div>
  );
};

export default NotFound;
