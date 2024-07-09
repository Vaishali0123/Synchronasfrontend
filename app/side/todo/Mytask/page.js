"use client";
import React, { useCallback, useEffect, useState } from "react";
import pic from "../../../assets/empty.png";
import task from "../../../assets/task.png";
import redflag from "../../../assets/redflag.png";
import greenflag from "../../../assets/greenflag.png";

import Image from "next/image";
import TaskModal from "../../Compo/Addtask";
import TeamModal from "../../Compo/Addteamtask";
import axios from "axios";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import { API } from "@/utils/Essentials";
import moment from "moment";

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamtasks, setTeamtasks] = useState(false);
  const [done, setDone] = useState(1);
  const [tasks, setGetTasks] = useState([]);
  const cookie = Cookies.get("she2202");
  const cook = decryptaes(cookie);
  const d = JSON.parse(cook);
  const [load, setLoad] = useState("load");

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

  const handleImageClick = async ({ taskid, id }) => {
    try {
      setDone(!done);
      const res = await axios.post(`${API}/updatetask`, {
        id,
        taskid,
        status: done ? "completed" : "pending",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = useCallback(async () => {
    try {
      setLoad("unload");
      const res = await axios.post(`${API}/fetchalltasks`, { id: d?._id });
      setGetTasks(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoad("load");
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="font-sans scrollbar-hide flex flex-col justify-evenly items-center">
      {/* Tasks */}
      <div className="h-[80vh] sm:w-[95%] w-[100%] bg-[#e7e7e7] md:rounded-2xl flex overflow-hidden flex-col justify-between items-center object-contain">
        <div className="h-[5%] w-[95%] flex items-center ">
          <div className="text-[14px] text-[#444444] font-semibold">
            Total: {tasks?.tasks?.length || 0} tasks
          </div>
        </div>

        <div className="h-[90%] scrollbar-hide overflow-auto  w-[100%]  flex flex-col justify-start items-center">
          {tasks?.tasks?.length < 1 ? (
            <>
              {/* for empty task */}
              <Image src={pic} className="h-[300px] w-[300px]" />
              <div className="flex flex-row items-center justify-between">
                <Image src={task} className="h-[25px] w-[25px]" />
                <div className="text-[18px] mx-2 text-[#444444] font-semibold">
                  No tasks found.
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full gap-2 flex-col">
              <div className="w-full flex flex-col items-center py-2 justify-center gap-2">
                {load === "load" ? (
                  tasks?.tasks?.map((task, index) => (
                    <div
                      key={index}
                      className="w-[98%] items-center justify-center gap-1 space-y-2 p-2 px-2 rounded-2xl bg-[#fff] flex flex-col"
                    >
                      {/* For each task */}
                      <div className=" w-full items-center justify-between flex flex-row">
                        <div className="flex justify-center items-center">
                          {/* dp  */}
                          <div className="h-[40px] w-[40px] rounded-full bg-yellow-500 ">
                            <img
                              src={{ uri: task?.dp }}
                              className="h-[40px] w-[40px] rounded-full bg-red-50 -ml-[3px] border-2 border-yellow-500 -mt-[3px]"
                            />
                          </div>
                          {/* name  */}
                          <div className=" px-2 flex flex-col">
                            <div className="font-bold font-sans text-[14px] text-black">
                              {task?.name || "Unknown"}
                            </div>
                            <div className="text-[14px] text-[#414141]">
                              You
                            </div>
                          </div>
                        </div>

                        <div className="flex-col flex justify-center gap-2">
                          <div className="text-[14px] text-[#414141] ">
                            {moment(task.createdAt).fromNow()}
                          </div>
                          {/* report changer */}
                          <div
                            onClick={() => {
                              handleImageClick({
                                taskid: task._id,
                                id: d?._id,
                              });
                            }}
                            className=" object-contain bg-[#00ff7774] rounded-full border-[1px] text-green-600 border-green-600 flex items-start justify-center"
                          >
                            Done
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex flex-row bg-[#ffc04a] rounded-xl text-black">
                        <div
                          style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                          className="text-[14px] p-2 text-black "
                        >
                          {task.text}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col w-[100%] justify-center items-center h-[90%]">
                    <div className="w-[98%] gap-2 justify-center p-2 rounded-2xl items-center bg-[#fff] animate-pulse flex flex-col">
                      {/* For each task */}
                      <div className=" w-full items-center justify-between flex flex-row">
                        <div className="flex justify-center items-center">
                          {/* dp  */}
                          <div className="h-[40px] w-[40px] rounded-full bg-[#ededed] ">
                            <div className="h-[40px] w-[40px] rounded-full bg-[#f1f1f1] -ml-[2px] border-2 border-[#ededed] -mt-[2px]" />
                          </div>
                          {/* name  */}
                          <div className=" px-2 flex flex-col gap-2">
                            <div className="font-bold font-sans text-[14px] h-1 px-16 rounded-full bg-[#f2f2f2] text-black"></div>
                            <div className="text-[14px] text-[#414141] h-1 px-5 rounded-full bg-[#f2f2f2]"></div>
                          </div>
                        </div>
                        <div className=" flex-col flex justify-center">
                          {/* report changer */}
                          <div className=" object-contain bg-[#f1f1f1] p-4 px-8 rounded-full flex items-start justify-center"></div>
                        </div>
                      </div>
                      <div className="w-full flex flex-row bg-[#ededed] text-[#ededed] rounded-2xl ">
                        <div
                          style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                          className="text-[14px] p-2  "
                        >
                          hi
                        </div>
                      </div>
                    </div>
                    <div className="w-[98%] mt-4 items-center gap-2 justify-center p-2 rounded-2xl  bg-[#fff] animate-pulse flex flex-col">
                      {/* For each task */}
                      <div className=" w-full  items-center justify-between flex flex-row">
                        <div className="flex justify-center items-center">
                          {/* dp  */}
                          <div className="h-[40px] w-[40px] rounded-full bg-[#ededed] ">
                            <div className="h-[40px] w-[40px] rounded-full bg-[#f1f1f1] -ml-[2px] border-2 border-[#ededed] -mt-[2px]" />
                          </div>
                          {/* name  */}
                          <div className=" px-2 flex flex-col gap-2">
                            <div className="font-bold font-sans text-[14px] h-1 px-16 rounded-full bg-[#f2f2f2] text-black"></div>
                            <div className="text-[14px] text-[#414141] h-1 px-5 rounded-full bg-[#f2f2f2]"></div>
                          </div>
                        </div>
                        <div className=" flex-col flex justify-center">
                          {/* report changer */}
                          <div className=" object-contain bg-[#f1f1f1] p-4 px-8 rounded-full flex items-start justify-center"></div>
                        </div>
                      </div>
                      <div className="w-full flex flex-row bg-[#ededed] text-[#ededed] rounded-2xl ">
                        <div
                          style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                          className="text-[14px] p-2  "
                        >
                          hi
                        </div>
                      </div>
                    </div>
                    <div className="w-[98%] mt-4 items-center gap-2 justify-center p-2 rounded-2xl  bg-[#fff] animate-pulse flex flex-col">
                      {/* For each task */}
                      <div className=" w-full  items-center justify-between flex flex-row">
                        <div className="flex justify-center items-center">
                          {/* dp  */}
                          <div className="h-[40px] w-[40px] rounded-full bg-[#ededed] ">
                            <div className="h-[40px] w-[40px] rounded-full bg-[#f1f1f1] -ml-[2px] border-2 border-[#ededed] -mt-[2px]" />
                          </div>
                          {/* name  */}
                          <div className=" px-2 flex flex-col gap-2">
                            <div className="font-bold font-sans text-[14px] h-1 px-16 rounded-full bg-[#f2f2f2] text-black"></div>
                            <div className="text-[14px] text-[#414141] h-1 px-5 rounded-full bg-[#f2f2f2]"></div>
                          </div>
                        </div>
                        <div className=" flex-col flex justify-center">
                          {/* report changer */}
                          <div className=" object-contain bg-[#f1f1f1] p-4 px-8 rounded-full flex items-start justify-center"></div>
                        </div>
                      </div>
                      <div className="w-full flex flex-row bg-[#ededed] text-[#ededed] rounded-2xl ">
                        <div
                          style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                          className="text-[14px] p-2  "
                        >
                          hi
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <TaskModal isOpen={isModalOpen} onClose={closeModal} /> */}
      <TeamModal isOpen={teamtasks} onClose={close} />
    </div>
  );
}

export default page;
