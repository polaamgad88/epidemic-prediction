import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
const Add_rec = () => {
  const [Nid, SetNid] = useState('');
  const [Fname, SetFname] = useState('');
  const [Lname, SetLname] = useState('');
  const [birth, Setbirth] = useState('');
  const [address, Setaddress] = useState('');
  const [gender, setgender] = useState('');
  const [diagnosis, Setdiagnosis] = useState('');
  const [notes, SetNotes] = useState('');
  const [error_msg, SetError_msg] = useState('');
  const [symp, setsymp] = useState(0);
  const [Irritability, setIrritability] = useState(false);
  const [Vomiting, setVomiting] = useState(false);
  const [Headache, setHeadache] = useState(false);
  const [SIEZURE, setSIEZURE] = useState(false);
  const [BULGING_FONTANEL, setBULGING_FONTANEL] = useState(false);
  const [ALTERD_CONSCIOUSNESS, setALTERD_CONSCIOUSNESS] = useState(false);
  const [NECK_RIGIDITY, setNECK_RIGIDITY] = useState(false);
  const [fever, setFever] = useState(false);
  const [Governorate, SetGovernorate] = useState('');
  const [District, SetDistrict] = useState('');
  const [occupation, SetOccupation] = useState('');
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [districtOptions, setdistrictOptions] = useState([]);
  const [governorateOptions, setgovernorateOptions] = useState([]);
  useEffect(() => {
    var status = false;
    var code;
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

  const onChangehandler = async (e) => {
    e.preventDefault();
    if (Nid === '' || Fname === '' || Lname === '' || birth === '' || address === '' || gender === '' || diagnosis === '' || District === '' || Governorate === '' || occupation === '') {
      SetError_msg('⚠️One or more fields have an error, Please check and try again.')
      return;
    }
    const currentDate = new Date();
    const selectedDateObj = new Date(birth);
    if (selectedDateObj > currentDate)
      SetError_msg('⚠️Selected date is after the current date')
    else {
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
            notes: notes,
            Irritability: Irritability,
            ALTERD_CONSCIOUSNESS: ALTERD_CONSCIOUSNESS,
            BULGING_FONTANEL: BULGING_FONTANEL,
            SIEZURE: SIEZURE,
            fever: fever,
            Headache: Headache,
            Vomiting: Vomiting,
            NECK_RIGIDITY: NECK_RIGIDITY,
            Governorate: Governorate,
            District: District,
            occupation: occupation,
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
            SetNid('');
            SetFname('');
            Setbirth('');
            setgender(null);
            SetLname('');
            Setaddress('');
            setALTERD_CONSCIOUSNESS(false);
            setBULGING_FONTANEL(false);
            setFever(false);
            setHeadache(false);
            setIrritability(false);
            setNECK_RIGIDITY(false);
            setSIEZURE(false);
            setVomiting(false);
            SetGovernorate('');
            SetDistrict('');
            SetOccupation('');
            SetNotes('');
            setsymp('');
            SetNotes('')
            setgender('')
            Setdiagnosis('')
            SetError_msg('')
            setdistrictOptions([])
          })
        .catch(
          (error) => {
            console.log(error);
            navigate("/unauthorized")
          });
    }
  }
  function handleGovernorateSelectChange(e) {
    const value = e.target.value;
    if (value === '' || value === undefined) {
      SetGovernorate('')
      SetDistrict('')
      return;
    }
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
    <div class="bg-blue-200 ">
      <Navbar />
      <div class="flex items-center justify-center  mb-12 mt-4">
        <div class="">
          <h2 class="bg-clip-text text-neutral-800 text-4xl font-bold font-sans">Add record</h2>
          <hr class="h-px my-2 bg-gray-200 border-0 opacity-20 white:bg-gray-700" />
        </div>
      </div>

      <div class=" md:flex md:justify-center px-12">
        <form class="w-full max-w-lg bg-transparent ">


          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane" id="firstname"
                onChange={(e) => SetFname(e.target.value)}
                value={Fname} />
            </div>

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe" onChange={(e) => SetLname(e.target.value)}
                id='lastname'
                value={Lname} />
            </div>
          </div>



          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                National id
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 mb-3 
            leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"
                placeholder="ex. 3010888888204" id="user_id" onChange={(e) => SetNid(e.target.value)} value={Nid} />
            </div>
            <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                Current Address
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border
             border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text" placeholder="ex. 67 Muharram Bey St." id="address" onChange={(e) => Setaddress(e.target.value)} value={address} />
            </div>
          </div>




          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-city">
                Governorate
              </label>
              <select id="governorates" value={Governorate} name="governorates" class="form-select block  mt-1 h-10 w-full bg-gray-200 rounded-md text-black-500" onChange={handleGovernorateSelectChange}
              >
                <option value="">Select a governorate</option>
                {governorateOptions.map((option) => (<option value={option}>{option}</option>))}
              </select>

            </div>




            <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-city">
                District
              </label>
              <select id="district" value={District} name="district" class="form-select block w-full mt-1 h-10 bg-gray-200 rounded-md text-black-500" onChange={handleDistrictSelectChange}
              >
                <option value="">Select a district</option>
                {districtOptions.map((option) => (<option value={option}>{option}</option>))}

              </select>

            </div>




            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-state">
                Gender
              </label>
              <div class="relative">
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" checked={gender === 'male'} type="radio" value="male" onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-black-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-radio-1" class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Male</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" checked={gender === 'Female'} value="Female" onChange={(e) => setgender(e.target.value)} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
       focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label class="ml-1 text-sm font-medium text-black-900 dark:text-black-300">Female</label>
                </div>

              </div>
            </div>


          </div>


          <div class="flex flex-wrap -mx-3 mb-2 mt-5">
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-zip">
                Birth date
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 
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
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-last-name">
                Symptoms duration (in days)
              </label>
              <input value={symp} class="appearance-none block w-full bg-gray-200 text-black-700 border
             border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
              focus:border-gray-500" type="number" placeholder="ex. 3" min="0"
                id='sym_days' onChange={(e) => setsymp(e.target.value)}
              />
            </div>
          </div>


          {/* 

          
            <div class="flex items-center mb-6">
            <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2" for="grid-state">
              Irritability
            </label>
          </div>


         
Here's code for symptoms it , on change here is set to setgender -NOT CORRECT Onchange- 
and to be edited..
----->

*/}
          <div class="flex flex-wrap -mx-3 mb-10 mt-8">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div class="flex items-center py-2">
                <input type="checkbox" checked={Irritability} value="no1" onChange={(e) => setIrritability((Irritability ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  Irritability
                </label>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 py-2">
              <div class="flex items-center">
                <input type="checkbox" checked={Vomiting} value="no2" onChange={(e) => setVomiting((Vomiting ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  Vomiting
                </label>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 py-2">
              <div class="flex items-center">
                <input type="checkbox" value="no3" checked={Headache} onChange={(e) => setHeadache((Headache ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  Headache
                </label>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 py-2">
              <div class="flex items-center">
                <input type="checkbox" checked={SIEZURE} value="no4" onChange={(e) => setSIEZURE((SIEZURE ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  SIEZURE
                </label>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 py-2">
              <div class="flex items-center">
                <input type="checkbox" checked={BULGING_FONTANEL} value="no4" onChange={(e) => setBULGING_FONTANEL((BULGING_FONTANEL ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  BULGING FONTANEL

                </label>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 py-2">
              <div class="flex items-center">
                <input type="checkbox" checked={NECK_RIGIDITY} value="no4" onChange={(e) => setNECK_RIGIDITY((NECK_RIGIDITY ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  NECK RIGIDITY

                </label>
              </div>
            </div>


            <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0 py-2">
              <div class="flex items-center">
                <input type="checkbox" checked={ALTERD_CONSCIOUSNESS} value="no4" onChange={(e) => setALTERD_CONSCIOUSNESS((ALTERD_CONSCIOUSNESS ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  ALTERD CONSCIOUSNESS

                </label>
              </div>
            </div>


            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 py-2">
              <div class="flex items-center">
                <input type="checkbox" checked={fever} value="no4" onChange={(e) => setFever((fever ? false : true))} name="default-radio1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold ml-2 p-0.5" for="grid-state">
                  fever

                </label>
              </div>
            </div>






          </div>
          <div class="flex flex-wrap -mx-3 mb-12">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-diagnosis">
                occupation
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="ex. teacher" id='occupation'
                onChange={(e) => SetOccupation(e.target.value)}
                value={occupation} />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-12">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-diagnosis">
                diagnosis
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="ex. miningites" id='diagnosis'
                onChange={(e) => Setdiagnosis(e.target.value)}
                value={diagnosis} />
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-12 ">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2" for="grid-password">
                Notes
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-black-700 border h-full border-gray-200
               rounded py-3 px-4 mb-3 
                leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="diag" type="text"
                placeholder="ex. Any notes you wanna add " onChange={(e) => SetNotes(e.target.value)}
                value={notes} />
            </div>
          </div>


          <div >
            <p className="font-semibold  text-red-600 p-4">{error_msg}</p>
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
