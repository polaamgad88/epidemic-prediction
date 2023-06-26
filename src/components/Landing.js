import React from 'react'
import Navbar from './Navbar';

const HeroMain = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-white">
      <Navbar />
      <body className="h-screen">
        <div className="text-center pb-12 md:pb-16 mt-10 ">
          <h1 className="text-blue-600 text-2xl md:text-6xl font-extrabold leading-tighter
             tracking-tighter mb-1" data-aos="zoom-y-out">Advanced Medicine,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600
              ">Trusted Care.</span></h1>

          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-center text-blue-500 mb-0" data-aos="zoom-y-out"
              data-aos-delay="150">Help us to save more lives....</p>
          </div>
        </div>

        <div className="relative flex justify-center mb-8" >
          <div className="flex flex-col justify-center">
            <img class="w-64 h-64flex items-center justify-center border-4
            border-blue-400 rounded-lg 
          transition-transform duration-500 transform hover:scale-125
          " src={require('./imgs/Land.jpg')}
              alt="logo" />

          </div>
        </div>


        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div>
            <button type='button'
              className='flex break-inside bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              <div className='flex items-center justify-between flex-1'>
                <a href="/Login">
                  <span id="b1" className='text-sm font-medium text-white'>Get Started &rarr;
                  </span>
                </a>
              </div>
            </button>
          </div>
        </div>
      </body>
    </div>
  )
}

export default HeroMain;