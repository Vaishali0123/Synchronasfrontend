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
  const [email, setEmail] = useState("");

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imge, setImge] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // };
  // Select file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImge(file);
      console.log(file, "love");
      console.log(imageUrl, "hate");
    }
  };

  const func = async () => {
    try {
      // const ema = await validateEmail(email);
      console.log(email, fullname);
      if (email && password.length > 7 && fullname) {
        dispatch(
          userData({ name: fullname, email, password, image: imageUrl })
        );
        console.log("done");
        router.push(
          "../main/signedup"
          // query: {
          //   email,
          //   fullname,
          //   password,
          //   // image: imageUrl,
          // },
        );
      } else {
        console.log(email && password.length > 7 && imge && fullname);
        if (password.length <= 7) {
          toast.error("Enter password more than 7 letters");
        } else {
          toast.error(
            "Details Missing",
            email && password.length > 7 && imge && fullname
          );
        }
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
            {/* <div className="w-[100%] flex justify-center 0 items-center flex-col">
              <img src={imageUrl} className="h-10 w-10  rounded-full" />
              <input
                type="file"
                onChange={handleFileChange}
                className="h-12 w-[100%] rounded-full mt-2"
              ></input>
              <div  className="text-[12px] mt-2">Upload profile picture</div>
            </div> */}
            <div className="w-full  flex flex-col  justify-center items-center">
              <label className="relative flex items-center flex-col">
                <img
                  src={imageUrl || "/placeholder-image.png"}
                  alt="Choose"
                  className="rounded-full text-[8px] bg-gray-200 h-[50px] w-[50px]"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer h-12 w-full rounded-full"
                />
                {!imageUrl ? (
                  <div className="mt-2 text-[10px] text-black">Upload</div>
                ) : (
                  <div className="mt-2 text-[10px] text-black">{imge.name}</div>
                )}
                {/* <div className="text-sm mt-2">{imge}</div> */}
              </label>
              {imageUrl && (
                <button
                  className="mt-1 text-[10px] underline text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => {
                    setImge(null);
                    setImageUrl(null);
                  }}
                >
                  Remove
                </button>
              )}
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
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  placeholder="Enter your full name"
                  className="text-[#808080] bg-[#f9f9f9] my-2 text-[14px] px-2 flex justify-center items-center border-b-2 outline-none border-[#E48700] h-[40px] w-[350px]"
                />
              </div>
            </div>
            {/* Next page */}
            <Link
              className="bg-[#ffc061] hover:bg-[#E48700] mt-8 text-white font-bold text-[16px] flex justify-center items-center rounded-full py-3 shadow-lg w-[350px]"
              href={{
                pathname: "../main/signedup",
                query: {
                  email,
                  fullname,
                  password,
                  // image: JSON.stringify(encodeURIComponent(imge)),
                },
              }}
            >
              Continue
            </Link>
            {/* <div
              onClick={func}
              className="bg-[#ffc061] hover:bg-[#E48700] mt-8 text-white font-bold text-[16px] flex justify-center items-center rounded-full py-3 shadow-lg w-[350px]"
            >
              Continue
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
