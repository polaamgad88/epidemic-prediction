import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
const Search = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [Nid, SetNid] = useState('');
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
              console.log("unauthorized")
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
  })
  const onChangehandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://192.168.1.31:4000/search",
        {
          Nid: Nid,
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
          if (responseJson.data.success) {
            navigate("/edit_doc")
          }
        })
      .catch(
        (error) => {
          console.log(error);
          console.log("unauthorized")
          navigate("/unauthorized")
        });
  }
  if (!checked) return null;

  return (

    <div class="bg-blue-500 h-screen">
      <Navbar />
      <div class="ml-9 flex items-center justify-center   mb-4 mt-0">
        <div class="">
          <h2 class=" text-white text-4xl font-bold ">Search for account</h2>
          <hr class="h-px my-2 bg-gray-200 border-0 opacity-20 white:bg-gray-700" />
        </div>
      </div>
      <div class="bg-blue-500 md:flex md:justify-center mt-6">
        <form class="w-full max-w-lg mx-auto bg-blue-500" onSubmit={onChangehandler}>

          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Search by ID
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
       focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="ex. 3010888888204" id="d_id " onChange={(e) => SetNid(e.target.value)}
              value={Nid}
            />
          </div>
          <div class="ml-48 mx-3 mb-28 mt-14">
            <div class="w-full ">
              <button type="submit" class="focus:outline-none text-white 
     bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
      font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-12 dark:bg-green-600
       dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>


            </div>
          </div>


        </form>
      </div>
    </div>



  );
};

export default Search;
