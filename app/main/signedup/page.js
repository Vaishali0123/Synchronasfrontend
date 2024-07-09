"use client";
import Image from "next/image";
import bgg from "../../assets/mainbg.png";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "@/lib/userSlice";
import { decryptaes, encryptaes } from "@/app/security";
import Cookies from "js-cookie";
import { API } from "@/utils/Essentials";
// import firebase from "../../../firebase";

function page() {
  const router = useRouter();
  const { id, email, image, name, password } = useSelector(
    (state) => state.user
  );
  const search = useSearchParams();
  const dispatch = useDispatch();
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");
  const [jobrole, setJobrole] = useState("");
  const [data, setData] = useState([]);
  const [join, setJoin] = useState(0);

  // Access the query parameters
  // useEffect(() => {
  //   // Access the query parameters from the URL
  //   const email = search.get("email");
  //   setEmail(email);
  //   const password = search.get("password");
  //   setPassword(password);
  //   const username = search.get("username");
  //   const image = search.get("imge");
  //   setUsername(username);
  //   console.log(email);
  //   console.log(password);
  //   console.log(username);
  // }, []);
  // const id = useSelector((state) => state.user.id);
  // console.log(id);
  // const orgfunc = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3500/api/get/alldataorg");
  //     //console.log(response.data);
  //     const dataArray = res.data;
  //     setOrgdata(dataArray);
  //     // const team = dataArray.map((i) => i.organization).flat();
  //     // setOrgdata(team);
  //     // console.log(orgdata);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(() => {
  //   orgfunc();
  // }, []);

  // const userfunc = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3500/api/get/all-data");
  //     console.log(res.data);
  //     const data = res.data;
  //     setData(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(() => {
  //   userfunc();
  //   // console.log(data, "data");
  // }, []);
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API}/signup`, {
        org,
        email,
        username,
        jobrole,
        password,
        image,
      });
      if (response.status === 200) {
        router.push("../main/signin");
      } else {
        console.log("User unable to signup");
      }

      // dispatch(
      //   userData({ id: response.data._id, orgname: orgname, email: email })
      // );
      //  console.log("User created:", response.data);

      // router.push("../side/todo");
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="w-screen font-sans h-screen bg-[#FFC977] flex justify-center items-center">
      <div className="flex flex-row w-[80%]  h-[80%] items-center justify-between max-lg:justify-center">
        <Image
          src={bgg}
          priority={true}
          alt="pic"
          className="max-lg:hidden object-contain w-[600px] h-[600px]"
        />
        <div className="h-[95%] w-[400px] rounded-2xl bg-white flex flex-col justify-center items-center">
          {/* Create /Join */}
          {join === 0 ? (
            <div className="flex flex-col">
              <div
                onClick={() => {
                  setJoin(1);
                }}
                className="text-[16px] hover:bg-[#f1e4d0] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl bg-[#FFC977] text-black"
              >
                Create an organization
              </div>
              <div className="text-[16px] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl  text-black">
                OR
              </div>
              <div
                onClick={() => {
                  setJoin(2);
                }}
                className="text-[16px] hover:bg-[#f1e4d0] flex justify-center items-center font-semibold h-[40px] w-[300px] rounded-2xl bg-[#FFC977] text-black"
              >
                Join an organization
              </div>
            </div>
          ) : null}

          {/* Create Organization */}
          {join === 1 ? (
            <div className="flex flex-col justify-between h-[90%]">
              <div className="h-[50px]  w-[350px] flex justify-between">
                <div className="text-black text-[20px] font-semibold">
                  Enter your organization's details
                </div>
                {/* <div className="flex flex-col">
                  <div className="text-[12px] text-[#8D8D8D]">No Account ?</div>

                  <Link
                    href={"/main/signup"}
                    className="text-[#B87514] hover text-[12px]"
                  >
                    Sign up
                  </Link>
                </div> */}
              </div>

              <div className=" h-[340px] flex flex-col justify-evenly">
                {/* Enter industry */}
                <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Name
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization's name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>

                {/* Enter Location */}
                <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Location
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>

                {/* Enter field */}
                <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Type
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>

                {/* Enter no. of employees */}
                <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Number of members
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>
                {/* job */}

                <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Enter Your Job Role
                  </div>
                  <input
                    value={jobrole}
                    onChange={(e) => {
                      setJobrole(e.target.value);
                    }}
                    placeholder="Job Title"
                    className="my-2  text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>
              </div>
              {/* Continue */}
              <div
                onClick={handleSubmit}
                className="bg-[#E48700] m-[2] text-white text-[12px] flex justify-center items-center rounded-lg h-[40px] w-[350px]"
              >
                Next
              </div>
            </div>
          ) : null}

          {/* Join Organization */}
          {join === 2 ? (
            <div className="flex flex-col h-[70%]">
              <div className="h-[50px] w-[350px] flex justify-between">
                <div className="text-black text-[26px] font-semibold">
                  Join an organization
                </div>
                {/* <div className="flex flex-col">
                  <div className="text-[12px] text-[#8D8D8D]">No Account ?</div>

                  <Link
                    href={"/main/signup"}
                    className="text-[#B87514] hover text-[12px]"
                  >
                    Sign up
                  </Link>
                </div> */}
              </div>

              <div className=" h-[340px] flex flex-col justify-evenly">
                {/* Enter industry */}
                <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Enter Organization's Name
                  </div>
                  <input
                    value={org}
                    onChange={(e) => {
                      setOrg(e.target.value);
                    }}
                    placeholder="Organization name"
                    className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>
                {/* job */}

                <div>
                  <div className="text-[14px] font-sans font-semibold text-black">
                    Enter Your Job Title
                  </div>
                  <input
                    value={jobrole}
                    onChange={(e) => {
                      setJobrole(e.target.value);
                    }}
                    placeholder="Job Title"
                    className="my-2  text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                  />
                </div>
              </div>
              {/* Continue */}
              <div
                onClick={handleSubmit}
                className="bg-[#E48700] text-white text-[12px] flex justify-center items-center rounded-lg h-[40px] w-[350px]"
              >
                Next
              </div>
            </div>
          ) : null}
          {/* <div className="flex flex-col">
            <div className="h-[50px] w-[350px] flex justify-between">
              <div className="text-black text-[26px] font-semibold">
                Sign Up
              </div>
              <div className="flex flex-col">
                <div className="text-[12px] text-[#8D8D8D]">No Account ?</div>

                <Link
                  href={"/main/signup"}
                  className="text-[#B87514] hover text-[12px]"
                >
                  Sign up
                </Link>
              </div>
            </div>

            <div className=" h-[340px] flex flex-col justify-evenly"> */}
          {/* Enter industry */}
          {/* <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Create/Join an Organization
                </div>
                <input
                  value={organization}
                  onChange={(e) => {
                    setOrg(e.target.value);
                  }}
                  placeholder="Organization name"
                  className=" my-2 text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                />
              </div> */}
          {/* job */}
          {/* 
              <div>
                <div className="text-[14px] font-sans font-semibold text-black">
                  Enter Your Job Title
                </div>
                <input
                  value={jobrole}
                  onChange={(e) => {
                    setJobrole(e.target.value);
                  }}
                  placeholder="Job Title"
                  className="my-2  text-[#808080] text-[12px] px-2 flex justify-center items-center border-2 outline-none rounded-lg h-[40px] w-[350px]"
                />
              </div>
            </div> */}
          {/* Continue */}
          {/* <div
              onClick={handleSubmit}
              className="bg-[#E48700] text-white text-[12px] flex justify-center items-center rounded-lg h-[40px] w-[350px]"
            >
              Next
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default page;
