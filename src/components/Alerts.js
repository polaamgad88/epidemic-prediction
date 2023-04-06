import React from "react";
import Navbar from "./Navbar";

const Alerts = () => {
  return (
    <div class="bg-blue-500">

      <body class="h-screen bg-blue-500">
        <div class="ml-9 mt-6">
          <div class="flex justify-between mb-2">
            <h2 class=" text-white text-4xl font-bold">Alerts</h2>

            <button
              class=" border-2 border-opacity-10  border-white
     text-white text-xs font-medium py-2 px-4 
     rounded inline-flex items-center"
            >
              <span class="opacity-60 hover:opacity-100">
                {" "}
                Download PDF Report &#x1F4C4;
              </span>
            </button>
          </div>

          <div class="flex justify-between mb-2">
            <h4 class="text-sm font-normal text-slate-300">
              Manage alerts and prevent outbreak
            </h4>
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
                          ADDRESS
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          ALERT DATE
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          OUTBREAK PREDICTED <br />
                          DATE
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          STATUS
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                &#x25FE; 001
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Beni Suef
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            19/2/21
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            29/2/21
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-xl"
                            ></span>
                            <span class="relative">Read</span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                &#x25FE; 002
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">Minya</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">7/5/16</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            14/5/16
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-red-200 opacity-50 rounded-xl"
                            ></span>
                            <span class="relative">Unread</span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                &#x25FE; 003
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">Giza</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            2/11/12
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            22/11/12
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-red-200 opacity-50 rounded-xl"
                            ></span>
                            <span class="relative">Unread</span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                &#x25FE; 004
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Kafr El Sheikh
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            2/11/12
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            22/11/12
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-xl"
                            ></span>
                            <span class="relative">Read</span>
                          </span>
                        </td>
                      </tr>
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
