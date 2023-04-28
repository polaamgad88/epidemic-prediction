import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
const Add_doc = () => {
  const [Nid, SetNid] = useState('');
  const [Fname, SetFname] = useState('');
  const [Lname, SetLname] = useState('');
  const [birth, Setbirth] = useState('');
  const [address, Setaddress] = useState('');
  const [gender, setgender] = useState('');
  const [Hosbital, Sethosbital] = useState('');
  const [city, Setcity] = useState('');
  const navigate = useNavigate();
  const [observer, SetObserver] = useState(false);
  const [doctor, SetDoctor] = useState(false);
  const [researcher, SetResearcher] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {

    var status = false;
    var code;
    axios
      .get(
        "http://192.168.1.31:4000/admin",
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
          if (status) {
            setChecked(true)
            console.log("access gained")
          }
          else {
            if (code === 401) {
              console.log("no access to open this page")
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
  }, [navigate])
  const onChangehandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://192.168.1.31:4000/addDoctor",
        {
          Fname: Fname,
          Lname: Lname,
          birth: birth,
          address: address,
          gender: gender,
          Hosbital: Hosbital,
          city: city,
          Nid: Nid,
          observer: observer,
          doctor: doctor,
          researcher: researcher,
        },
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
          console.log(responseJson)
        })
      .catch(
        (error) => {
          console.log(error);
        });
  }
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
    <div class="bg-blue-500 h-screen">
      <Navbar />
      <div class="ml-9 flex items-center justify-center   mb-4 mt-0">
        <div class="">
          <h2 class=" text-white text-4xl font-bold ">New Doctor account</h2>
          <hr class="h-px my-2 bg-gray-200 border-0 opacity-20 white:bg-gray-700" />
        </div>
      </div>


      <div class="bg-blue-500 md:flex md:justify-center mt-6">
        <div class=" ">
          <form class="w-full max-w-lg bg-blue-500" onSubmit={onChangehandler}>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  First Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="D_Fname" type="text" placeholder="Jane" onChange={(e) => SetFname(e.target.value)}
                  value={Fname} />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Last Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="D_Lname" type="text" placeholder="Doe" onChange={(e) => SetLname(e.target.value)}

                  value={Lname} />
              </div>
            </div>




            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  National id
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
      leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="ex. 3010888888204" id="d_id"
                  onChange={(e) => SetNid(e.target.value)}
                  value={Nid} />
              </div>
            </div>





            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Current Address
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" type="text"
                  placeholder="ex. 67 Muharram Bey St." onChange={(e) => Setaddress(e.target.value)}
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
       focus:border-gray-500" id="grid-city" type="text" placeholder="ex. Alexandria" onChange={(e) => Setcity(e.target.value)}
                  value={city} />
              </div>

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Gender
                </label>
                <div class="relative">
                  <div class="flex items-center mb-4">
                    <input type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-2" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                  </div>

                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Type
                </label>
                <div class="relative">
                  <div class="flex items-center ">
                    <input type="checkbox" value="researcher" onChange={(e) => SetResearcher((researcher ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Researcher</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" value="doctor" onChange={(e) => SetDoctor((doctor ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-2" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Doctor</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" value="observer" onChange={(e) => SetObserver((observer ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-3" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Observer</label>
                  </div>


                </div>

              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                  Birth date
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
      rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Did" type="text" placeholder="ex. 28/8/1995" onChange={(e) => Setbirth(e.target.value)}
                  value={birth} />

              </div>
            </div>

            {doctor === true ? (
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">


                  <div class="w-1/2 h-7">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                      Hosbital
                    </label>
                    <select onChange={(e) => Sethosbital(e.target.value)}
                      value={Hosbital} id="hosbital" class="bg-gray-300  w-96 text-gray-900 text-md rounded-none">
                      <option >   </option>
                      <option >Kasr El Aini Teaching Hospita</option>
                      <option >El Safa Hospital        </option>
                      <option >Cleopatra Hospital</option>
                      <option >Dar El Fouad Hospital (Nasr City, Cairo)</option>
                      <option >Dar El Fouad Hospital (6th of October City, Cairo)</option>
                      <option >Andalusia Hospital Smouha</option>
                    </select>
                  </div>


                </div>
              </div>
            ) : (
              <></>
            )}


            <div class="ml-48 mx-3 mb-28 mt-14">
              <div class="w-full ">
                <a href="/Admin">
                  <button type="submit" class="focus:outline-none text-white 
     bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
      font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-12 dark:bg-green-600
       dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                </a>


              </div>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Add_doc;
