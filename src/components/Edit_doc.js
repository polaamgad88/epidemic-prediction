import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from "./Navbar_Admin";
import axios from "axios";
const Edit_doc = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [Nid, SetNid] = useState('');
  const [Fname, SetFname] = useState('');
  const [Lname, SetLname] = useState('');
  const [birth, Setbirth] = useState('');
  const [email, setEmail] = useState('');
  const [error_msg, SetError_msg] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [address, Setaddress] = useState('');
  const [gender, setgender] = useState('');
  const [Hosbital, Sethosbital] = useState('');
  const [Governorate, SetGovernorate] = useState('');
  const [District, SetDistrict] = useState('');
  const [observer, SetObserver] = useState(false);
  const [doctor, SetDoctor] = useState(false);
  const [researcher, SetResearcher] = useState(false);
  const [districtOptions, setdistrictOptions] = useState([]);
  const [governorateOptions, setgovernorateOptions] = useState([]);
  const onChangehandler = async (e) => {
    e.preventDefault();
    if (Nid === '' || Fname === '' || Lname === '' || birth === '' || address === '' ||
      email === '' || specialization === '' || gender === '' || District === '' || Governorate === '' || !(researcher || doctor || observer)) {
      console.log("here")
      SetError_msg('⚠️One or more fields have an error.Please check and try again.')
      return;
    }
    if (doctor && Hosbital === '') {
      SetError_msg('⚠️One or more fields have an error.Please check and try again.')
      return;
    }
    const currentDate = new Date();
    const selectedDateObj = new Date(birth);
    if (selectedDateObj > currentDate)
      SetError_msg('⚠️Selected date is after the current date')
    else {
      await axios
        .post(
          process.env.REACT_APP_URL + ":4000/editDoctor",
          {
            Fname: Fname,
            Lname: Lname,
            birth: birth,
            address: address,
            gender: gender,
            Hosbital: Hosbital,
            specialization: specialization,
            email: email,
            Governorate: Governorate,
            District: District,
            Nid: params.Nid,
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
            console.log("edited")
          })
        .catch(
          (error) => {
            console.log(error);
            if (error.response.status === 401) {
              console.log("unauthorized")
              navigate("/unauthorized")
            }
            else if (error.response.status === 404)
              console.log("not found")
            else
              console.log("server error")
          });
    }
  }
  useEffect(() => {
    var status = false;
    var code;

    axios
      .get(
        process.env.REACT_APP_URL + ":4000/loadDoctorData" + params.Nid,
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
            setChecked(true)
            SetFname(data.first_name)
            SetLname(data.last_name)
            SetNid(data.national_id)
            Setaddress(data.address)
            setEmail(data.email)
            setSpecialization(data.specialization)
            Setbirth(data.birth_date.split('T')[0])
            SetObserver(data.is_observer === 0 ? false : true)
            SetResearcher(data.is_researcher === 0 ? false : true)
            SetDoctor(data.is_doctor === 0 ? false : true)
            setgender(data.gender)
            console.log("access gained")
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
  }, [navigate, params.Nid])
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
  if (!checked) return (
    <div className="h-screen flex justify-center items-center bg-blue-600">
      <div className="p-10 bg-blue-800 rounded-lg shadow-xl">
        <svg className="animate-spin h-12 w-12 text-black-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 "></path>
        </svg>
        <h2 className="mt-4 text-lg font-medium text-black-400 text-center">Loading...</h2>
      </div>
    </div>
  );
  return (
    <div class="bg-gradient-to-r from-blue-300 to-white h-screen">
      <Navbar />
      <div class="ml-9 flex items-center justify-center   mb-4 mt-0">
        <div class="">
          <h2 class=" bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-4xl font-bold ">Edit account</h2>
          <hr class="h-px my-2 bg-gray-200 border-0 opacity-20 white:bg-gray-700" />
        </div>
      </div>


      <div class="bg-gradient-to-r from-blue-300 to-white md:flex md:justify-center mt-6">
        <div class=" ">
          <form class="w-full max-w-lg bg-transparent" onSubmit={onChangehandler}>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-first-name">
                  First Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-black-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="D_Fname" type="text" placeholder="Jane" onChange={(e) => SetFname(e.target.value)}
                  value={Fname}
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-last-name">
                  Last Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="D_Lname" type="text" placeholder="Doe" onChange={(e) => SetLname(e.target.value)}

                  value={Lname}
                />
              </div>
            </div>




            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                  National id
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
      leading-tight focus:outline-none focus:bg-white focus:border-gray-500" disabled={true} type="text" placeholder="ex. 3010888888204" id="d_id"
                  onChange={(e) => SetNid(e.target.value)}
                  value={Nid} />
              </div>
            </div>





            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                  Current Address
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
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
                <select id="governorates" name="governorates" class="form-select block  mt-1 h-10 w-full bg-gray-200 rounded-md text-black-500" onChange={handleGovernorateSelectChange}
                >
                  <option value="">Select a governorate</option>
                  {governorateOptions.map((option) => (<option value={option}>{option}</option>))}
                </select>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-last-name">
                  district
                </label>
                <select id="district" name="district" class="form-select block w-full mt-1 h-10 bg-gray-200 rounded-md text-black-500" onChange={handleDistrictSelectChange}
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
                <input class="disabled appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
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
                <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
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
                    <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-1" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Male</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
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
                    <input type="checkbox" value="researcher" checked={researcher} onChange={(e) => SetResearcher((researcher ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-1" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Researcher</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" value="doctor" checked={doctor} onChange={(e) => SetDoctor((doctor ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-2" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Doctor</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" value="observer" checked={observer} onChange={(e) => SetObserver((observer ? false : true))} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-radio-3" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Observer</label>
                  </div>


                </div>

              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-zip">
                  Birth date
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 
      rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Did" type="date" placeholder="ex. 28/8/1995" onChange={(e) => Setbirth(e.target.value)}
                  value={birth} />

              </div>
            </div>
            {doctor === true ? (
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">


                  <div class="w-1/2 h-7">
                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-zip">
                      Hosbital
                    </label>
                    <select onChange={(e) => Sethosbital(e.target.value)}
                      value={Hosbital} id="hosbital" class="bg-gray-300  w-96 text-black-900 text-md rounded-none">
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



            <div >
              <p className="font-semibold  text-red-600 p-4">{error_msg}</p>
            </div>
            <div class="ml-48 mx-3 mb-28 mt-14">
              <div class="w-full ">
                <button onClick={onChangehandler} type="submit" class="focus:outline-none text-white 
     bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
      font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-12 dark:bg-green-600
       dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>


              </div>
            </div>



          </form>

        </div>

      </div>

    </div>
  );
};

export default Edit_doc;
