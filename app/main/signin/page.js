// Import necessary libraries and assets
"use client";
import Image from "next/image";
import bgg from "../../assets/mainbg.png";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { decryptaes, encryptaes } from "@/app/security";
import Cookies from "js-cookie";
import { userData } from "@/lib/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { API } from "@/utils/Essentials";
// import firebase from "../../../firebase";

// // Define the functional component
function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [organization, setOrganization] = useState("");

  const checklogin = async () => {
  
    try {
      const response = await axios.post(`${API}/signin`, {
        email: email,
        pass: password,
        org: organization,
      });

      if (response.data.success) {
        const details = response.data.user;
        const postdata = JSON.stringify(details);
        const dis = encryptaes(postdata);
        Cookies.set("she2202", dis);

        dispatch(
          userData({
            id: details._id,
            organization: details.organization,
            email: details.email,
          })
        );

        router.push("../side/todo");
      } else {
        router.push("../main/signup");
      }
    } catch (e) {
      console.error("Error logging in", e.message);
    }
  };

  return (
    <div className="w-screen font-sans h-screen bg-[#f9f9f9] sm:bg-[#FFC977] flex justify-center items-center">
      <div className="flex flex-row w-[80%] h-[80%] bg-white p-2 items-center justify-between rounded-3xl max-lg:justify-center">
        <div className="w-[50%] h-full flex items-center justify-center">
          <Image
            src={bgg}
            priority={true}
            alt="pic"
            className="pn:max-vs:hidden object-contain w-[600px] h-[600px]"
          />
        </div>
        <div className="h-[100%] w-[300px] vs:w-[400px] rounded-3xl bg-[#f9f9f9] flex flex-col justify-evenly items-center p-2">
          <div>
            <div className="text-[#3e3e3e] text-[24px] font-bold">Login!</div>
            <div className="h-[50px] w-[350px] items-center flex justify-between">
              <div className="text-[#3e3e3e] text-[20px] font-bold">
                Welcome to Nexoo
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-[14px] font-medium text-[#8D8D8D]">
                New user ? Sign up today for exclusive access and benefits.
              </div>
              <Link
                href={"/main/signup"}
                className="text-[#ffbf67] hover:underline font-semibold text-[14px]"
              >
                Sign Up Now
              </Link>
            </div>
          </div>

          {/* Enter your details */}
          <div className="h-[260px]  flex flex-col justify-between">
            {/* Organization name */}
            <div>
              <div className="text-[14px] font-sans font-semibold text-[#3e3e3e]">
                Organization
              </div>
              <input
                placeholder="Organization name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
              />
            </div>
            {/* Email */}
            <div>
              <div className="text-[14px] font-sans font-semibold text-[#3e3e3e]">
                Enter your email address
              </div>
              <input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
              />
            </div>
            {/* Password */}
            <div>
              <div className="text-[14px] font-sans font-semibold text-[#3e3e3e]">
                Enter your password
              </div>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
              />
            </div>
            <div className="flex h-[40px] items-start w-[350px] justify-end">
              <div className="text-[#AD3113] text-[14px]">Forgot Password?</div>
            </div>
          </div>

          {/* Sign In */}
          <button
            onClick={checklogin}
            className="bg-[#e0a54c] hover:bg-[#E48700] text-white font-bold text-[14px] flex justify-center items-center rounded-full py-2 shadow-lg w-[240px]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
