import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
const Add_rec = () => {
  const [Nid, SetNid]=useState('');
  const [Fname,SetFname]=useState('');
  const [Lname, SetLname]=useState('');

  const [birth, Setbirth]=useState('');
  const [address, Setaddress]=useState('');
  const [gender, setgender] = useState('');
  const [diagnosis, Setdiagnosis] = useState('');
  const [symp, setsymp] = useState('');
  const [city, Setcity] = useState('');

 function handleRadio(e) {
  
     setgender(e.target.value);
   
 }
 const onChangehanler = (e) => {
  console.log("....");
  console.log(gender);
  console.log(Fname);
  console.log(Lname);
 
  console.log(address);


    e.preventDefault();
}
  return (
    <div class="bg-blue-500 h-screen">
      <Navbar />
      <div class="ml-9 flex items-center justify-center  mb-4 mt-0">
        <div class="">
          <h2 class=" text-white text-4xl font-bold ">Add record</h2>
          <hr class="h-px my-2 bg-gray-200 border-0 opacity-20 white:bg-gray-700" />
        </div>
      </div>

      <div class="bg-blue-500 md:flex md:justify-center px-12">
        <form class="w-full max-w-lg bg-blue-500">


          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Jane"  id="firstname"
              onChange={(e)=>SetFname(e.target.value)}
              value={Fname}/>
            </div>

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Doe" onChange={(e) => SetLname(e.target.value)}
              id='lastname'
              value={Lname} />
            </div>
          </div>




          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                National id
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
      leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="ex. 3010888888204"  id="user_id"
      onChange={(e) => SetNid(e.target.value)}
      value={Nid}/>
            </div>
          </div>





          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Current Address
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text"
                placeholder="ex. 67 Muharram Bey St."  id="address"
                onChange={(e) => Setaddress(e.target.value)}
                value={address} />
            </div>
          </div>




          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                City
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight 
      focus:outline-none focus:bg-white
       focus:border-gray-500" id="city" type="text" placeholder="ex. Alexandria"   onChange={(e) => Setcity(e.target.value)}
       value={city} /> 
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Gender
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={handleRadio} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                </div>
                <div class="flex items-center">
                  <input  type="radio" value="Female" onChange={handleRadio} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label  class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                </div>

              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Birth date
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
      rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="birth" type="text" placeholder="ex. 28/8/1995"  
                onChange={(e) => Setbirth(e.target.value)}
                value={birth}
              /> 

            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Symptoms
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="symp" type="text"
                placeholder="ex.  Fever, Sudden high fever, Seizures, trouble waking." onChange={(e) => setsymp(e.target.value)}
                value={symp} />
            </div>
          </div>


          <div class="flex flex-wrap -mx-3 mb-6 ">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Diagnosis
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="diag" type="text"
                placeholder="ex. Whether patient diagnosed with meningitis or not. " onChange={(e) => Setdiagnosis(e.target.value)}
                value={diagnosis} />
            </div>
          </div>

          <div class="ml-48 mx-3 mb-28 ">
            <div class="w-full ">
              <a href="">
                <button onClick={onChangehanler} type="button" class="focus:outline-none text-white 
     bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
      font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-12 dark:bg-green-600
       dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
              </a>


            </div>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Add_rec;
