import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "axios";
import "../App.css";
import Chart from "chart.js/auto"; // is a must do not remove 

const Dashboard = () => {
   const navigate = useNavigate();
   const [checked, setChecked] = useState(false);
   const [numebrOfCases, setNumebrOfCases] = useState(0);
   const [dataBarChart, setDataBarChart] = useState({
      labels: [],
      datasets: []
   })
   const [dataLineChart, setDataLineChart] = useState({
      labels: [],
      datasets: []
   })
   const [genderChartData, setGenderChartData] = useState({
      labels: [],
      datasets: []
   })
   const [AgeChartData, setAgeChartData] = useState({
      labels: [],
      datasets: []
   })
   const handleStaticData = () => {
      var status = false;
      var code;
      axios
         .get(
            process.env.REACT_APP_URL + ":4000/staticData",
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
                  console.log("access gained")
                  setGenderChartData({
                     labels: ['male', 'female'],
                     datasets: [
                        {
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                           borderColor: 'rgba(75, 192, 192, 1)',
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           data: responseJson.data.gender
                        },
                     ]
                  });
                  setAgeChartData({
                     labels: ['<5 yrs', '(6-15) yrs', '(16-24) yrs', '(25-64) yrs', '>65 yrs'],
                     datasets: [
                        {
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor:
                              [
                                 'rgba(255, 99, 132, 0.6)',
                                 'rgba(54, 162, 235, 0.6)',
                                 'rgba(255, 206, 86, 0.6)',
                                 'rgba(75, 192, 192, 0.6)',
                                 'rgba(153, 102, 255, 0.6)'
                              ],
                           borderColor: 'rgba(75, 192, 192, 1)',
                           borderDashOffset: 0.0,

                           data: responseJson.data.age
                        },
                     ]
                  });
                  setNumebrOfCases(responseJson.data.numebrOfCases)
               }
               else {
                  if (code === 401) {
                     console.log("no access to open this page")
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
   const handleDynamicData = () => {
      var status = false;
      var code;
      axios
         .get(
            process.env.REACT_APP_URL + ":4000/dynamicData",
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
               var dateMonth = responseJson.data.dateMonth
               var dateMonth2 = responseJson.data.dateMonth2
               var dataMonth = responseJson.data.dataMonth
               var dataMonth2 = responseJson.data.dataMonth2

               var dateWeeks = responseJson.data.dateWeeks
               var dateWeeks2 = responseJson.data.dateWeeks2
               var dataWeeks = responseJson.data.dataWeeks
               var dataWeeks2 = responseJson.data.dataWeeks2
               console.log(responseJson)
               if (status) {

                  console.log("access gained")
                  setDataLineChart({
                     labels: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'septemper', 'october', 'november', 'december'], // from database 
                     datasets: [{
                        label: dateMonth,
                        data: dataMonth, // from database 
                        fill: false,
                        backgroundColor: 'rgb(10, 200, 132)',
                        borderColor: 'rgba(10, 200, 132, 0.2)',
                     },
                     {
                        label: dateMonth2,
                        data: dataMonth2, // from database 
                        fill: false,
                        backgroundColor: 'rgb(200, 54, 10)',
                        borderColor: 'rgba(200, 54, 10, 0.2)',
                     },]
                  });
                  setDataBarChart({
                     labels: Array.from({ length: 52 }, (_, i) => i + 1), // from database 
                     datasets: [{
                        label: dateWeeks,
                        data: dataWeeks,
                        fill: false,
                        backgroundColor: 'rgb(10, 200, 132)',
                        borderColor: 'rgba(10, 200, 132, 0.2)',
                     },
                     {
                        label: dateWeeks2,
                        data: dataWeeks2,
                        fill: false,
                        backgroundColor: 'rgb(200, 54, 10)',
                        borderColor: 'rgba(200, 54, 10, 0.2)',
                     },]
                  })
               }
               else {
                  if (code === 401) {
                     console.log("no access to open this page")
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
               if (status) {
                  setChecked(true)
                  console.log("access gained")
                  handleStaticData();
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
      <div class="h-screen bg-blue-500 center">
         <Navbar />
         <h2 class="text-3xl font-bold leading-tighter
    tracking-tighter text-white flex justify-center items-center mb-8 mt-8" >Dashboard</h2>

         <div class="card">
            <div class="title">
               <p class="title-text">total number of cases</p>
            </div>
            <div class="data">
               <p>{numebrOfCases}</p>
            </div>
         </div>

         <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg bg-blue-500 dark:border-gray-700">
            <div class="grid grid-cols-2 gap-4 mb-4">
               <div class="flex items-center justify-center h-96 rounded bg-gray-50 dark:bg-gray-800">
                  <Pie data={AgeChartData} options={{
                     plugins: {
                        legend: {
                           display: true,
                           labels: {
                              boxWidth: 15,
                              boxHeight: 15,
                              padding: 5
                           }
                        },
                        title: {
                           display: true,
                           text: 'age Distribution of meningitis'
                        },

                     },

                  }} />
               </div>
               <div class="flex items-center justify-center h-96 rounded bg-gray-50 dark:bg-gray-800">
                  <Pie data={genderChartData} options={{
                     plugins: {
                        legend: {
                           display: true,
                        },
                        title: {
                           display: true,
                           text: 'gender Distribution of meningitis'
                        }
                     },
                  }} />
               </div>
            </div>
            <button onClick={handleDynamicData}>TEST</button>
            <div class="h-96 flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
               <Line data={dataLineChart} options={{
                  responsive: true,
                  interaction: {
                     mode: 'index',
                     intersect: false,
                  },
                  stacked: false,
                  plugins: {
                     title: {
                        display: true,
                        text: 'line Distribution of meningitis cases according to number in month'
                     }
                  },
                  scales: {
                     yAxes: [
                        {
                           type: 'linear',
                           display: true,
                           position: 'left',
                           gridLines: {
                              drawOnChartArea: false,
                           },
                        },
                     ],
                  },
               }} />

            </div>
            <div class="h-96 flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
               <Bar data={dataBarChart} options={{
                  responsive: true,
                  interaction: {
                     mode: 'index',
                     intersect: false,
                  },
                  stacked: false,
                  plugins: {
                     title: {
                        display: true,
                        text: 'Distribution of meningitis according to epidemiological weeks'
                     }
                  },
                  scales: {
                     yAxes: [
                        {
                           type: 'linear',
                           display: true,
                           position: 'left',
                           gridLines: {
                              drawOnChartArea: false,
                           },
                        },
                     ],
                  },
               }} />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
