"use client";
import React, { useCallback, useEffect, useState } from "react";
import pic from "../../../assets/empty.png";
import task from "../../../assets/task.png";
import redflag from "../../../assets/redflag.png";
import greenflag from "../../../assets/greenflag.png";

import { FaAngleDown } from "react-icons/fa6";
import Image from "next/image";
import TaskModal from "../../Compo/Addtask";
import TeamModal from "../../Compo/Addteamtask";
import axios from "axios";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import { API } from "@/utils/Essentials";
import moment from "moment";
import { useAuthContext } from "@/utils/auth";

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamtasks, setTeamtasks] = useState(false);
  const [done, setDone] = useState(1);
  const [tasks, setGetTasks] = useState([]);
  const [assignedtasks, setAssignedasks] = useState([]);
  const [team, setTeam] = useState([]);
  const [load, setLoad] = useState("load");
  const [click, setClick] = useState(false);
  const [clickself, setClickself] = useState(false);
  const [selfindex, setSelfindex] = useState(-1);
  const { data } = useAuthContext();
  const id = data.id;
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
      const res = await axios.post(`${API}/updatetask, {
        id,
        taskid,
        status: done ? "completed" : "pending",
      }`);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/getAssignedTasks/${id}`);

      setAssignedasks(res?.data?.assignedTasks);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getTasks();
    }
  }, [id]);

  const combinedTasks = [
    ...assignedtasks.map((task) => ({
      ...task,
      type: "task",
      timestamp: task.createdAt,
    })),
  ];

  combinedTasks.sort((a) => new Date(a.timestamp));

  // Fetch teams
  const getTeams = async () => {
    try {
      const response = await axios.get(`${API}/getteams/${data?.orgid?.[0]}`);
      const updatedTeams = response.data.teams.map((team) => {
        // If the current user is member of the team than show the team there else not
        const filteredMembers = team.members.filter(
          (member) => member._id === data?.id
        );
        return {
          ...team,
        };
      });
      setTeam(updatedTeams);
      //setTeam(response.data.teams);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data?.orgid?.[0]) {
      getTeams();
    }
  }, [data?.orgid?.[0]]);

  return (
    <div className="font-sans scrollbar-hide h-[100%] flex flex-col justify-evenly items-center">
      {/* Tasks */}
      <div className="h-[100%] w-[100%] bg-[#EAEEF4]  rounded-2xl  flex flex-col justify-between items-center object-contain">
        <div className="p-2 pl-4 w-[100%] flex items-center ">
          {/* <div className="text-[14px] text-[#444444] font-semibold">
            Total: {tasks?.tasks?.length || 0} Team Tasks
          </div> */}
        </div>

        <div className="h-full scrollbar-hide overflow-auto  w-[100%] flex flex-col justify-start items-center">
          {assignedtasks.length < 1 ? (
            <div className="h-full w-full flex flex-col justify-center items-center">
              {/* for empty task */}
              <Image src={pic} className="h-[300px] w-[300px]" />
              <div className="flex flex-row items-center justify-between">
                <Image src={task} className="h-[25px] w-[25px]" />
                <div className="text-[18px] mx-2 text-[#444444] font-semibold">
                  No tasks found.
                </div>
              </div>
            </div>
          ) : (
            <>
              {team.map((team, index) => {
                const sortedAssignedTasks = [...team.assignedtasks].sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                return (
                  <div
                    key={index}
                    className="w-[99%]  items-center justify-center rounded-xl bg-white flex flex-col"
                  >
                    {/* For each task */}
                    <div className="h-[60px] px-4 w-[100%] items-center justify-between flex flex-row">
                      <div className="flex">
                        <div className=" flex items-center justify-center">
                          <div className="h-[40px] w-[40px] rounded-full bg-yellow-500 ">
                            <div
                              // src={{ uri: task?.dp }}
                              className="h-[40px] w-[40px] rounded-full bg-red-50 -ml-[3px] border-2 border-yellow-500 -mt-[3px]"
                            />
                          </div>
                        </div>
                        <div className="  h-[100%] px-2 flex flex-col">
                          <div className=" flex flex-row  text-[16px] font-semibold">
                            {/* {task?.assignedusers != []
                      ? task?.assignedusers.map((u, i) => (
                          <div className="font-bold font-sans  text-[14px] text-black">
                            {u?.name || "Unknown"} ,
                          </div>
                        ))
                      : null}
                    {task?.assignedteams != []
                      ? task?.assignedteams.map((t, i) => (
                          <div className="font-bold font-sans  text-[14px] text-black">
                            , {t?.teamName || "Unknown"}
                          </div>
                        ))
                      : null} */}
                            {team?.teamname}
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="text-[12px] font-semibold text-[#414141] w-[100%] ">
                              {team?.admin?.name}
                            </div>
                            <div
                              className="bg-blue-400 items-center justify-center flex
                     w-[30px] h-[15px] text-white p-2 rounded-md  text-[8px] ml-1"
                            >
                              Admin
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" flex justify-center pn:max-sm:hidden">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center justify-start">
                            <div className="h-[25px] w-[25px] rounded-full z-30 bg-slate-300 -mr-2"></div>
                            <div className="h-[25px] w-[25px] rounded-full z-20 bg-slate-200 -mr-2 "></div>
                            <div className="h-[25px] w-[25px] rounded-full z-10 bg-slate-100 -mr-2"></div>
                            <div className="h-[25px] w-[25px] rounded-full z-0 bg-slate-50 -mr-2"></div>
                          </div>
                          <div className="text-[14px] font-semibold text-[#414141] w-[100%] pl-3 ">
                            {team?.members?.length > 1
                              ? `${team?.members?.length} Members`
                              : `${team?.members?.length} Member`}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[98%] m-2 flex flex-col  bg-[#FFF8EB] rounded-2xl text-black">
                      {team?.assignedtasks?.length > 0 ? (
                        sortedAssignedTasks.map((m, i) => (
                          <div key={i} className="w-[95%] p-4 border-b-[1px] ">
                            <div>
                              <div className="text-[14px] w-[100%]   text-[#414141] ">
                                <div className="  flex justify-between items-center">
                                  <div className="font-semibold text-[12px]">
                                    Assigned by: {m?.assignedBy?.name}
                                  </div>
                                  <div className="text-[14px] text-[#414141] ">
                                    {moment(m.createdAt).fromNow()}
                                  </div>
                                </div>
                              </div>

                              <div
                                className="text-[14px]  text-black"
                                style={{ wordBreak: "break-word" }}
                              >
                                {m?.task}
                              </div>
                            </div>
                            <div className="w-[100%]  flex items-center justify-end">
                              <div
                                onClick={() => {
                                  handleImageClick({
                                    taskid: m._id,
                                    id: data.id,
                                  });
                                }}
                                className={`object-contain text-[14px]  ${
                                  m?.progress === "Not Started"
                                    ? "bg-red-500"
                                    : "bg-[#17643b74]"
                                }  px-2 rounded-full  relative
                   flex items-center gap-2 justify-center w-[10%] self-end`}
                              >
                                <div className="text-[12px] text-white">
                                  {" "}
                                  {m?.progress}{" "}
                                </div>
                                <FaAngleDown
                                  onClick={() => {
                                    setClickself(!clickself);
                                    setSelfindex(i);
                                  }}
                                />
                                <div
                                  className={`duration-100 ${
                                    clickself === true && i === selfindex
                                      ? "h-auto w-auto text-[#000000] font-medium top-5 bg-white p-1 shadow-lg rounded-lg absolute z-50 text-[14px] "
                                      : "h-0 w-0 text-[0px] shadow-sm p-0"
                                  }`}
                                >
                                  <div
                                    className={`${
                                      clickself === true && i === selfindex
                                        ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                                        : " py-0 duration-100 cursor-pointer px-0"
                                    }`}
                                  >
                                    Not started
                                  </div>
                                  <div
                                    className={`${
                                      clickself === true && i === selfindex
                                        ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                                        : "py-0 duration-100 cursor-pointer px-0"
                                    }`}
                                  >
                                    In progress
                                  </div>
                                  <div
                                    className={`${
                                      clickself === true && i === selfindex
                                        ? "hover:bg-[#f8f8f8] rounded-lg py-1 duration-100 cursor-pointer px-2"
                                        : " py-0 duration-100 cursor-pointer px-0"
                                    }`}
                                  >
                                    Done
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="w-[100%] text-[12px] font-semibold flex items-center justify-center">
                          No assigned tasks yet
                        </div>
                      )}

                      <div className=" object-contain flex items-start justify-center py-2"></div>
                    </div>
                  </div>
                  // <div
                  //   key={index}
                  //   className="w-[95%] my-3 items-center justify-center rounded-xl bg-white flex flex-col"
                  // >
                  //   {/* For each task */}
                  //   <div className="h-[60px] w-[98%] bg-white items-center justify-center flex flex-row">
                  //     <div className="w-[5%]  flex items-center justify-center">
                  //       <img
                  //         src={{ uri: task?.dp }}
                  //         className="h-[45px] w-[45px] bg-orange-700 rounded-full"
                  //       />
                  //     </div>

                  //     <div className="w-[85%]  h-[60%] px-2 flex flex-col">
                  //       <div className=" flex flex-row  py-1">
                  //         {task?.assignedusers != []
                  //           ? task?.assignedusers.map((u, i) => (
                  //               <div className="font-bold font-sans  text-[14px] text-black">
                  //                 {u?.name || "Unknown"} ,
                  //               </div>
                  //             ))
                  //           : null}
                  //         {task?.assignedteams != []
                  //           ? task?.assignedteams.map((t, i) => (
                  //               <div className="font-bold font-sans  text-[14px] text-black">
                  //                 , {t?.teamName || "Unknown"}
                  //               </div>
                  //             ))
                  //           : null}
                  //       </div>
                  //       <div className="text-[14px] text-[#414141]">You</div>
                  //     </div>

                  //     <div className="w-[10%] flex justify-center">
                  //       <div className="text-[14px] text-[#414141] ">
                  //         {moment(task.createdAt).fromNow()}
                  //       </div>
                  //     </div>
                  //   </div>
                  //   <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
                  //     <div className="w-[95%] p-4">
                  //       <div className="text-[14px]  text-black">
                  //         {task?.task}
                  //       </div>
                  //     </div>

                  //     <div className="w-[5%] object-contain flex items-start justify-center py-2">
                  //       <Image
                  //         alt="pic"
                  //         src={greenflag}
                  //         onClick={() => {
                  //           handleImageClick({ taskid: task._id, id: d?._id });
                  //         }}
                  //         className="h-[45px] w-[45px] object-contain"
                  //       />
                  //     </div>
                  //   </div>
                  // </div>
                );
              })}
            </>
          )}

          {/* <div className="w-[95%]  items-center justify-center rounded-xl bg-white flex flex-col">
            <div className="h-[60px] w-[98%] bg-white items-center justify-center  flex flex-row">
              <div className="w-[5%]  flex items-center justify-center">
                <div className="h-[45px] w-[45px] bg-orange-700 rounded-full"></div>
              </div>

              <div className="w-[85%] h-[60%] px-2 flex flex-col">
                <div className="font-bold font-sans text-[14px] text-black">
                  Lekan Okeowo
                </div>
                <div className="text-[14px] text-[#414141]">You</div>
              </div>

              <div className="w-[10%] flex justify-center">
                <div className="text-[14px] text-[#414141] ">24 Nov 2022</div>
              </div>
            </div>
            <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
              <div className="w-[95%] p-4">
                <div className="text-[14px]  text-black">
                  As a translator, I want integrate Crowdin webhook to notify
                  translators about changed stringsAs a translator, I want
                  integrate Crowdin webhook to notify translators about changed
                  strings As a translator, I want integrate Crowdin webhook to
                  notify translators about changed strings As a translator, I
                  want integrate Crowdin webhook to notify translators about
                  changed stringsAs a translator
                </div>
              </div>

              <div className="w-[5%] object-contain flex items-start justify-center py-2">
                <Image
                  alt="pic"
                  src={greenflag}
                  onClick={handleImageClick}
                  className="h-[45px] w-[45px] object-contain "
                />
              </div>
            </div>
          </div>
          <div className="w-[95%]  items-center justify-center rounded-xl bg-white flex flex-col">
            <div className="h-[60px] w-[98%] bg-white items-center justify-center  flex flex-row">
              <div className="w-[5%]  flex items-center justify-center">
                <div className="h-[45px] w-[45px] bg-orange-700 rounded-full"></div>
              </div>

              <div className="w-[85%] h-[60%] px-2 flex flex-col">
                <div className="font-bold font-sans text-[14px] text-black">
                  Lekan Okeowo
                </div>
                <div className="text-[14px] text-[#414141]">You</div>
              </div>

              <div className="w-[10%] flex justify-center">
                <div className="text-[14px] text-[#414141]">24 Nov 2022</div>
              </div>
            </div>
            <div className="w-[98%] m-2 flex flex-row bg-[#FFF8EB] rounded-2xl text-black">
              <div className="w-[95%] p-4">
                <div className="text-[14px]  text-black">
                  As a translator, I want integrate Crowdin webhook to notify
                  translators about changed stringsAs a translator, I want
                  integrate Crowdin webhook to notify translators about changed
                  strings As a translator, I want integrate Crowdin webhook to
                  notify translators about changed strings As a translator, I
                  want integrate Crowdin webhook to notify translators about
                  changed stringsAs a translator
                </div>
              </div>

              <div className="w-[5%] object-contain flex items-start justify-center py-2">
                <Image
                  alt="pic"
                  src={greenflag}
                  onClick={handleImageClick}
                  className="h-[45px] w-[45px] object-contain "
                />
              </div>
            </div>
          </div>*/}
        </div>
      </div>
      {/* <TaskModal isOpen={isModalOpen} onClose={closeModal} /> */}
      <TeamModal isOpen={teamtasks} onClose={close} />
    </div>
  );
}

export default page;
