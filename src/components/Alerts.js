import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
const Alerts = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false)
  const [alerts, setAlerts] = useState([])
  useEffect(() => {
    var status = false;
    var code;
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/alerts",
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
          console.log(responseJson)
          setAlerts(responseJson.data.alerts)
          var observer = responseJson.data.observer
          if (status && observer) {
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
  }, [navigate])
  const handleReadForAlerts = (number, is_read) => {
    var status = false;
    var code;
    if (is_read)
      return;
    axios
      .get(
        process.env.REACT_APP_URL + ":4000/alert/" + number,
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
          console.log(responseJson)
          if (status) {
            console.log("read")
          }
          else {
            if (code === 401) {
              console.log("no access to read this alert")
              console.log("unauthorized")
              navigate("/unauthorized")
            }
            else {
              console.log("server error")
            }
          }
        })
      .catch(
        (error) => {
          console.log("unauthorized " + error)
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
    <div class="bg-gradient-to-r from-blue-300 to-white">
      <Navbar />
      <body class=" bg-gradient-to-r from-blue-300 to-white">
        <div class="ml-9 mt-6">
          <div class="flex justify-between mb-2">
            <h2 class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-4xl font-bold">Alerts</h2>


          </div>


          <hr class="h-px my-2 bg-gray-200 border-0 opacity-20 white:bg-gray-700" />

          <div class="bg-transparent p-8 rounded-md ">
            <div>
              <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table class="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          ALERT NUMBER
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          governorate
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          ALERT DATE
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          OUTBREAK DATE
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          disease
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          expected cases
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          STATUS
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {alerts.map(data => (
                        <tr key={data.alert_id} onClick={handleReadForAlerts(data.alert_id, (data.is_read == 0 ? false : true))}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  &#x25FE; {data.alert_id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{data.governorate}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{data.prediction_date.split("T")[0]}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{data.outbreak_date.split("T")[0]}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{data.disease}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{data.cases_number}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className={(data.is_read == 0 ? 'relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight' : 'relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight')}>
                              <span aria-hidden className={(data.is_read == 0 ? 'absolute inset-0 bg-red-200 opacity-50 rounded-xl' : 'absolute inset-0 bg-green-200 opacity-50 rounded-xl')}></span>
                              <span className="relative">{(data.is_read == 0 ? 'unread' : 'read')}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Alerts;
