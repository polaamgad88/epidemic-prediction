import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
const Myprofile = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [Nid, SetNid] = useState('');
  const [Fname, SetFname] = useState('');
  const [Lname, SetLname] = useState('');
  const [birth, Setbirth] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [address, Setaddress] = useState('');
  const [gender, setgender] = useState('');
  const [Hosbital, Sethosbital] = useState('');
  const [observer, SetObserver] = useState(false);
  const [doctor, SetDoctor] = useState(false);
  const [researcher, SetResearcher] = useState(false);
  const [districtOptions, setdistrictOptions] = useState([]);
  const [governorateOptions, setgovernorateOptions] = useState([]);
  const [Governorate, SetGovernorate] = useState('');
  const [District, SetDistrict] = useState('');
  useEffect(() => {
    var status = false;
    var code;
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/loadMyProfile",
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
          var data = responseJson.data.data
          console.log(responseJson)
          if (status) {
            SetFname(data.first_name)
            SetLname(data.last_name)
            SetNid(data.national_id)
            Setaddress(data.address)
            setEmail(data.email)
            SetGovernorate(data.Governorate)
            handleGovernorateLoaded(data.Governorate)
            SetDistrict(data.District)
            setSpecialization(data.specialization)
            Setbirth(data.birth_date.split('T')[0])
            SetObserver(data.is_observer === 0 ? false : true)
            SetResearcher(data.is_researcher === 0 ? false : true)
            SetDoctor(data.is_doctor === 0 ? false : true)
            setgender(data.gender)
            Sethosbital(data.hospital)
            console.log("access gained")
            setChecked(true)
          }
          else {
            throw new Error()
          }
        })
      .catch(
        (error) => {
          code = error.response.data.code
          console.log(code)
          if (code === 401) {
            console.log("no access to open this page")
            navigate("/unauthorized")
          }
          else if (code === 404) {
            console.log("not found")
            navigate("/search")
          }
          else if (code >= 500) {
            console.log("server error")
          }
          else
            navigate("/unauthorized")
        });
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/getGovernorates",
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
          setgovernorateOptions(responseJson.data.governorateOptions.map(pair => pair['governorate_name_en']))
        })
      .catch(
        (error) => {
          console.log("unauthorized " + error)
          navigate("/unauthorized")
        });
  }, [navigate])
  function handleGovernorateSelectChange(e) {
    const value = e.target.value;
    SetGovernorate(value);
    SetDistrict('')
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/getDistricts" + value,
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
          setdistrictOptions(responseJson.data.districtOptions.map(pair => pair['district']))
        })
      .catch(
        (error) => {
          console.log("unauthorized " + error)
          navigate("/unauthorized")
        });
  }
  function handleDistrictSelectChange(e) {
    const value = e.target.value;
    SetDistrict(value);
  }
  function handleGovernorateLoaded(Governorate) {
    console.log("here")
    const value = Governorate;
    SetGovernorate(value);
    SetDistrict('')
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/getDistricts" + value,
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
          setdistrictOptions(responseJson.data.districtOptions.map(pair => pair['district']))
        })
      .catch(
        (error) => {
          console.log("unauthorized " + error)
          navigate("/unauthorized")
        });
  }
  if (!checked) return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200 ">
      <div className="p-10 bg-blue-200 rounded-lg shadow-xl">
        <svg className="animate-spin h-12 w-12 text-black-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 "></path>
        </svg>
        <h2 className="mt-4 text-lg font-medium text-black-400 text-center">Loading...</h2>
      </div>
    </div>
  );
  return (
    <div class="bg-blue-200  mb-16 ">
      <Navbar />
      <div class="h-full flex items-center justify-center mb-4 mt-0 ">
       
          <h2 class="  text-4xl font-bold  text-neutral-700">My Profile</h2>
      </div>


      <div class="bg-blue-200 md:flex md:justify-center mt-6">

      
        <div class="h-screen ">
          <form class="w-full max-w-lg bg-transparent">
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-first-name">
                  First Name
                </label>
                <input disabled class="appearance-none block w-full bg-gray-200 text-black-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="D_Fname" type="text" placeholder="Jane" onChange={(e) => SetFname(e.target.value)}
                  value={Fname}
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-last-name">
                  Last Name
                </label>
                <input disabled class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="D_Lname" type="text" placeholder="Doe" onChange={(e) => SetLname(e.target.value)}

                  value={Lname}
                />
              </div>
            </div>




            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                  National id
                </label>
                <input disabled class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
      leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="ex. 3010888888204" id="d_id"
                  onChange={(e) => SetNid(e.target.value)}
                  value={Nid} />
              </div>
            </div>





            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                  Current Address
                </label>
                <input disabled class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" type="text"
                  placeholder="ex. 67 Muharram Bey St." onChange={(e) => Setaddress(e.target.value)}
                  value={address} />
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">

              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-first-name">
                  Governorate
                </label>
                <select disabled id="governorates" value={Governorate} name="governorates" class="form-select block  mt-1 h-10 w-full bg-gray-200 rounded-md text-black-500" onChange={handleGovernorateSelectChange}
                >
                  <option value="">Select a governorate</option>
                  {governorateOptions.map((option) => (<option value={option}>{option}</option>))}
                </select>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-last-name">
                  district
                </label>
                <select disabled id="district" value={District} name="district" class="form-select block w-full mt-1 h-10 bg-gray-200 rounded-md text-black-500" onChange={handleDistrictSelectChange}
                >
                  <option value="">Select a district</option>
                  {districtOptions.map((option) => (<option value={option}>{option}</option>))}

                </select>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                  Email
                </label>
                <input disabled class="disabled appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text"
                  placeholder="ex. test@example.com." onChange={(e) => setEmail(e.target.value)}
                  value={email} />
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                  specialization
                </label>
                <input disabled class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="specialization" type="text"
                  placeholder="ex. GIT" onChange={(e) => setSpecialization(e.target.value)}
                  value={specialization} />
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">

              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-state">
                  Gender
                </label>
                <div class="relative">
                  <div class="flex items-center mb-4">
                    <input disabled type="radio" value="male" checked={gender === 'male'} onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-1" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Male</label>
                  </div>
                  <div class="flex items-center">
                    <input disabled type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-2" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Female</label>
                  </div>

                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-state">
                  Type
                </label>
                <div class="relative">
                  <div class="flex items-center ">
                    <input disabled type="checkbox" value="researcher" checked={researcher} onChange={(e) => SetResearcher((researcher ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-1" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Researcher</label>
                  </div>
                  <div class="flex items-center">
                    <input disabled type="checkbox" value="doctor" checked={doctor} onChange={(e) => SetDoctor((doctor ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-2" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Doctor</label>
                  </div>
                  <div class="flex items-center">
                    <input disabled type="checkbox" value="observer" checked={observer} onChange={(e) => SetObserver((observer ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-3" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Observer</label>
                  </div>


                </div>

              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-zip">
                  Birth date
                </label>
                <input disabled class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 
      rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Did" type="date" placeholder="ex. 28/8/1995" onChange={(e) => Setbirth(e.target.value)}
                  value={birth} />

              </div>
            </div>
            {doctor === true ? (
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">


                  <div class="h-7">
                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold " for="grid-zip">
                      Hosbital
                    </label>
                    <select disabled onChange={(e) => Sethosbital(e.target.value)}
                      value={Hosbital} id="hosbital" class="form-select block w-full mt-1 h-10 bg-gray-200 rounded-md text-black-500">
                      <option >   </option>
                      <option >Kasr El Aini Teaching Hospital</option>
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
            <div class="ml-48 mx-3 mb-28 mt-14"></div>
          </form>

        </div>

      </div>

    </div>
  );
};

export default Myprofile;
