"use client";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TaskModal from "../Compo/Addtask";
import TeamModal from "../Compo/Addteamtask";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useAuthContext } from "@/utils/auth";
import { API } from "@/utils/Essentials";

export default function SideLayout({ children }) {
  const [swtch, setSwtch] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamtasks, setTeamtasks] = useState(false);
  const [done, setDone] = useState(1);
  const { data } = useAuthContext();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const userdata = async () => {
    try {
      const response = await axios.get(`${API}/getuserdata/${data.id}`);
      //setProfile(response?.data);
      console.log(response?.data, "response.data");
      // const userid = data.find((e) => e._id === d._id);
      // if (userid) {
      //   setName(userid.username);
      // } else {
      //   console.log("Not getting user");
      // }
    } catch (e) {
      console.error("No User found", e.message);
    }
  };
  useEffect(() => {
    userdata();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const open = () => {
    setTeamtasks(true);
  };

  const close = () => {
    setTeamtasks(false);
  };
  const handleImageClick = () => {
    setDone(!done);
  };
  // Organization id and details

  return (
    <div className="font-sans h-full w-full scrollbar-hide flex flex-col sm:justify-evenly items-center ">
      {/* Creating task */}
      <div className="py-2 w-[100%] pn:max-sm:w-[100%] bg-white sm:rounded-2xl flex items-center justify-between px-2">
        <div className=" h-[100%] flex flex-row  items-center">
          <Link
            href={"../../side/todo/Mytask"}
            onClick={() => {
              setSwtch(0);
            }}
            className={`font-semibold text-[16px] select-none cursor-pointer ${
              swtch === 0
                ? " text-[#ffffff] bg-[#FFC977] p-2 rounded-xl"
                : "text-[#4e4e4e] bg-[#ffc97700] p-2 rounded-xl"
            }`}
          >
            My tasks
          </Link>
          <Link
            href={"../../side/todo/Teamtask"}
            onClick={() => {
              setSwtch(1);
            }}
            className={`font-semibold text-[16px] select-none cursor-pointer ${
              swtch === 1
                ? " text-[#ffffff] bg-[#FFC977] p-2 rounded-xl"
                : "text-[#4e4e4e] bg-[#ffc97700] p-2 rounded-xl"
            }`}
          >
            Team tasks
          </Link>
        </div>
        <div className=" h-[100%] flex justify-center items-center">
          <div
            onClick={open}
            className="px-3 py-2 text-[#333232] text-[16px] flex justify-center space-x-2 items-center font-semibold bg-[#FFC977] rounded-xl"
          >
            <IoMdAdd className="font-bold" />
            <span className="pn:max-sm:hidden"> Add New Task</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[90vh] md:mt-1">{children}</div>
      {swtch === 1 ? (
        <TeamModal isOpen={teamtasks} onClose={close} />
      ) : (
        <TaskModal isOpen={teamtasks} onClose={close} />
      )}
    </div>
  );
}
