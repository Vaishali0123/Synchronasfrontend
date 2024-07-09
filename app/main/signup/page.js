"use client";
import Image from "next/image";
import bgg from "../../assets/mainbg.png";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userData } from "@/lib/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import firebase from "../../../firebase";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("fsayush100@gmail.com");
  const [username, setUsername] = useState("Ayush Dixit");
  const [password, setPassword] = useState("12345678");
  const [imge, setImge] = useState("");

  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // };

  const func = async () => {
    try {
      // const ema = await validateEmail(email);

      if (email && password.length > 7 && username) {
        dispatch(userData({ name: username, email, password, image: imge }));
        console.log("done");
        router.push(
          "../main/signedup"
          // query: {
          //   email,
          //   username,
          //   password,
          //   image: imge,
          // },
        );
      } else {
        console.log(email && password.length > 7 && imge && username)
        toast.error("Details Missing", email && password.length > 7 && imge && username);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className="w-screen font-sans h-screen bg-[#f9f9f9] sm:bg-[#FFC977] flex justify-center items-center">
      <ToastContainer />
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
            <div className="text-[#3e3e3e] text-[24px] font-bold">Sign Up</div>
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
                href={"/main/signin"}
                className="text-[#ffbf67] hover:underline font-semibold text-[14px]"
              >
                Sign In
              </Link>
            </div>

            {/* Upload picture */}
            <div className="w-[100%] flex justify-center items-center flex-col">
              <img src={{ uri: imge }} className="h-10 w-10" />
              <input
                type="file"
                onClick={(e) => {
                  const file = e.target.files[0];

                  setImge(file);
                }}
                className="h-[50px] w-[50px] bg-slate-400 rounded-full"
              ></input>
              <div className="text-[12px]">Upload profile picture</div>
            </div>
          </div>
          <div>
            <div className="h-[200px] flex flex-col justify-evenly">
              {/* Enter your username or email address */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Email address
                </div>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email address"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
              {/* user and contact */}
              {/* <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Username
                </div>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter your username"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div> */}

              {/* password */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Password
                </div>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your Password"
                  type="password"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
              {/* Full name */}
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Full Name
                </div>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter your full name"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
            </div>
            {/* Next page */}
            <div
              // href={{
              //   pathname: "../main/signedup",
              //   query: { email, username, password, image: imge },
              // }}
              onClick={() => {
                func();
              }}
              className="bg-[#ffc061] hover:bg-[#E48700] mt-8 text-white font-bold text-[16px] flex justify-center items-center rounded-full py-3 shadow-lg w-[350px]"
            >
              Continue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
