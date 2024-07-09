"use client";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TaskModal from "../Compo/Addtask";
import TeamModal from "../Compo/Addteamtask";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function SideLayout({ children }) {
  const [swtch, setSwtch] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamtasks, setTeamtasks] = useState(false);
  const [done, setDone] = useState(1);
  const openModal = () => {
    setIsModalOpen(true);
  };

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
      <div className="h-[70px] w-[95%] pn:max-sm:w-[100%] bg-white sm:rounded-xl flex items-center justify-between px-2">
        <div className=" h-[100%] flex flex-row  items-center">
          <Link
            href={"../../side/todo/Mytask"}
            onClick={() => {
              setSwtch(0);
            }}
            className={`font-semibold text-[16px] select-none cursor-pointer ${
              swtch === 0
                ? " text-[#ffffff] bg-[#FFC977] p-2 rounded-lg"
                : "text-[#4e4e4e] bg-[#ffc97700] p-2 rounded-lg"
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
                ? " text-[#ffffff] bg-[#FFC977] p-2 rounded-lg"
                : "text-[#4e4e4e] bg-[#ffc97700] p-2 rounded-lg"
            }`}
          >
            Team tasks
          </Link>
        </div>
        <div className=" h-[100%] flex justify-center items-center">
          <div
            onClick={open}
            className="px-3 py-2 text-[#333232] text-[16px] flex justify-center space-x-2 items-center font-semibold bg-[#FFC977] rounded-lg"
          >
            <IoMdAdd className="font-bold" />
            <span className="pn:max-sm:hidden"> Add New Task</span>
          </div>
        </div>
      </div>
      <div className="w-full md:mt-1">{children}</div>
      {swtch === 1 ? (
        <TeamModal isOpen={teamtasks} onClose={close} />
      ) : (
        <TaskModal isOpen={teamtasks} onClose={close} />
      )}
    </div>
  );
}
