"use client";
import { decryptaes } from "@/app/security";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

function page() {
  const cookie = Cookies.get("she2202");
  const cook = decryptaes(cookie);
  const d = JSON.parse(cook);
  const [name, setName] = useState("");
  const userdata = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/get/alldata");
      const data = response.data;
      console.log(data);
      const userid = data.find((e) => e._id === d._id);
      if (userid) {
        setName(userid.username);
      } else {
        console.log("Not getting user");
      }
    } catch (e) {
      console.error("No User found", e.message);
    }
  };
  useEffect(() => {
    userdata();
  }, []);
  return (
    <div className="h-full w-full sm:pt-1 sm:px-4">
      <div className="w-full py-4 rounded-2xl pn:max-sm:hidden font-semibold text-[18px] bg-white px-4">
        Account Settings
      </div>
      <div className="sm:mt-2 w-full h-[100%] sm:h-[90%] sm:rounded-2xl flex space-x-2">
        {/* web-left */}
        <div className="h-full sm:w-[25%] w-[100%] bg-white sm:rounded-2xl p-2">
          <div className="w-full bg-[#f9f9f9] h-[100px] sm:h-[200px] rounded-2xl sm:flex-col flex items-center sm:justify-center px-2 space-x-2">
            <div className="h-[65px] w-[65px] bg-[#fff] rounded-full"></div>
            <div>
              <div className="font-semibold text-[18px]">Name</div>
              <div className="font-medium text-[14px] text-[#4b4b4b]">
                @Username
              </div>
            </div>
          </div>
          <div className="flex justify-between px-1 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] hover:rounded-lg border-[#f1f1f1] mt-2">
            <div className="font-medium text-[#3e3e3e]">Edit profile</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] hover:rounded-lg border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">Notifications</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">All My task</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">My Storage</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>

          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">Privacy & Security</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center border-b-[1px] hover:bg-[#fafafa] border-[#f1f1f1]">
            <div className="font-medium text-[#3e3e3e]">T&C</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
          <div className="flex justify-between px-2 h-[50px] items-center hover:bg-[#fafafa] ">
            <div className="font-medium text-[#3e3e3e]">Log out</div>
            <div className="text-[#7e7e7e]">
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        {/* web-right */}
        <div className="h-full w-[75%] pn:max-sm:hidden bg-white rounded-2xl flex flex-col items-center justify-center">
          {/* dp */}
          <div className="w-full h-[100px] mt-2 flex items-center justify-center flex-col">
            <div className="h-[90px] w-[75px] rounded-full mt-3 bg-[#f9f9f9]"></div>
            <div className="font-medium text-blue-300">change</div>
          </div>
          <div className="h-full w-full mt-4 ">
            {/* name */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">Name</div>
              <input
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="enter you name"
              />
            </div>
            {/* username */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                Username
              </div>
              <input
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="enter your username"
              />
            </div>
            {/* email */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                E-mail
              </div>
              <input
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="@ e-mail"
              />
            </div>
            {/* password */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                Password
              </div>
              <input
                type="password"
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="enter your Password"
              />
            </div>
            {/* job role */}
            <div className="h-[70px] w-full flex flex-col items-center mt-2 ">
              <div className="w-[50%] font-semibold text-[#3e3e3e] ">
                Job role
              </div>
              <input
                className="h-[50%] w-[50%] border-b-2 border-[#c7c5c5] outline-none"
                placeholder="enter you rol"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
