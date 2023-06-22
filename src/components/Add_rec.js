import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
const Add_rec = () => {
  // add fixition to radio change to chckboxes and connect to backend 
  const [Nid, SetNid] = useState('');
  const [Fname, SetFname] = useState('');
  const [Lname, SetLname] = useState('');
  const [birth, Setbirth] = useState('');
  const [address, Setaddress] = useState('');
  const [gender, setgender] = useState('');
  const [diagnosis, Setdiagnosis] = useState('');
  const [symp, setsymp] = useState('');
  const [city, Setcity] = useState('');
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    var status = false;
    var code;
    console.log("load")
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/main",
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
          var doctor = responseJson.data.doctor
          if (status && doctor) {
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
        process.env.REACT_APP_URL + ":4000/addRecord",
        {
          Fname: Fname,
          Lname: Lname,
          birth: birth,
          address: address,
          gender: gender,
          diagnosis: diagnosis,
          city: city,
          Nid: Nid,
          symp: symp,
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
          navigate("/unauthorized")
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
      <div class="ml-9 flex items-center justify-center  mb-4 mt-0">
        <div class="">
          <h2 class="text-white text-4xl font-bold font-sans">Add record</h2>
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
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane" id="firstname"
                onChange={(e) => SetFname(e.target.value)}
                value={Fname} />
            </div>

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe" onChange={(e) => SetLname(e.target.value)}
                id='lastname'
                value={Lname} />
            </div>
          </div>



          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                National id
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
            leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                placeholder="ex. 3010888888204" id="user_id" onChange={(e) => SetNid(e.target.value)} value={Nid} />
            </div>
            <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Current Address
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
             border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text" placeholder="ex. 67 Muharram Bey St." id="address" onChange={(e) => Setaddress(e.target.value)} value={address} />
            </div>
          </div>




          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Governorate
              </label>
              <select id="governorates" name="governorates" class="form-select block  mt-1 h-10 w-full bg-gray-200 rounded-md text-gray-500" onChange={(e) => Setcity(e.target.value)}
              >
                <option value="">Select a governorate</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Cairo">Cairo</option>
                <option value="Luxor">Luxor</option>
                <option value="Sharm El Sheikh">Sharm El Sheikh</option>
              </select>

            </div>




            <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                District
              </label>
              <select id="district" name="district" class="form-select block w-full mt-1 h-10 bg-gray-200 rounded-md text-gray-500" onChange={(e) => Setcity(e.target.value)}
              >
                <option value="">Select a district</option>
                <option value="Al Azbakeyah">Al Azbakeyah</option>
                <option value="Tebin">Tebin</option>
                <option value="Ataba">Ataba</option>

              </select>

            </div>




            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Gender
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                </div>

              </div>
            </div>


          </div>


          <div class="flex flex-wrap -mx-3 mb-2 mt-5">
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Birth date
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
              rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="birth" type="date" placeholder="ex. 28/8/1995"
                min="1900-01-01"
                onChange={(e) => Setbirth(e.target.value)}
                value={birth} />
            </div>




            {/* 

Here's code for symptoms duration days 
and value, onchange to be edited..
----->

*/}
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Symptoms duration (in days)
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
             border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
              focus:border-gray-500" type="number" placeholder="ex. 3" min="0"
                id='sym_days'
              />
            </div>
          </div>


          {/* 

Here's code for symptoms it , on change here is set to setgender -NOT CORRECT Onchange- 
and to be edited..
----->

*/}
          <div class="flex justify-between mb-10 mt-8">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                fever
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="y1" onChange={(e) => setgender(e.target.value)} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="no1" onChange={(e) => setgender(e.target.value)} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>

              </div>  </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                vomiting
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>

              </div>  </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                headache
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio3" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio3" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>

              </div>  </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                siezure
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio4" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio4" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div></div> </div></div>
          <div class="flex justify-between mb-10">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Bulging Fontanel
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio5" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio5" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>

              </div>  </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Alterd Consciousness
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio6" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio6" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No </label>
                </div>

              </div>  </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6" for="grid-state">
                Neck Rigidity
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio7" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio7" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>

              </div>  </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6" for="grid-state">
                Irritability
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio8" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio8" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div></div> </div></div>








          <div class="flex flex-wrap -mx-3 mb-12 ">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Notes
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border h-full border-gray-200 rounded py-3 px-4 mb-3 
  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="diag" type="text"
                placeholder="ex. Any notes you wanna add " onChange={(e) => Setdiagnosis(e.target.value)}
                value={diagnosis} />
            </div>
          </div>



          <div class="ml-48 mx-3 mb-28 ">
            <div class="w-full ">
              <button onClick={onChangehandler} type="button" class="focus:outline-none text-white 
     bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
      font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-12 dark:bg-green-600
       dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
            </div>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Add_rec;
