"use client";
import React, { useEffect, useState } from "react";
import assign from "../../assets/assign.png";
import upload from "../../assets/upload.png";
import figma from "../../assets/figma.png";
import file from "../../assets/file.png";
import pic from "../../assets/pic.png";
import edit from "../../assets/edit.png";
import del from "../../assets/del.png";
import chat from "../../assets/chat.png";
import Dropdown from "../../assets/Dropdown.png";
import gallery from "../../assets/gallery.png";
import frame from "../../assets/frame.png";
import Checkbox from "../../assets/Checkbox.png";
import Search from "../../assets/Search.png";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import Cookies from "js-cookie";
import { decryptaes, encryptaes } from "@/app/security";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { receiverData } from "@/lib/receiverSlice";
import { useAppDispatch } from "@/lib/hooks";
import { API } from "@/utils/Essentials";

function page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const [allorganizations, setAllorganizations] = useState([]);
  const [createteam, setCreateteam] = useState(false);
  const [teamname, setTeamname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [convId, setConvId] = useState("");
  const [team, setTeam] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [receiver_id, setReceiver_id] = useState();
  const cookie = Cookies.get("she2202");
  const cook = decryptaes(cookie);
  const d = JSON.parse(cook);
  const [memdata, setMemdata] = useState([]);

  const gochat = async () => {
    router.push(`../side/teamchat`);
  };

  const func = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7900/api/getmembers/${d?.orgid}`
      );
      setMemdata(response?.data);
      console.log(response?.data);
      // const matchedOrg = data.find(
      //   (org) => org.organization === d.organization
      // );
      // if (matchedOrg) {
      //   const organizationId = matchedOrg._id;
      //   setOrgid(organizationId);
      // } else {
      //   console.log("No matching organization found");
      // }
    } catch (e) {
      console.error("Error in finding member", e.message);
    }
  };
  useEffect(() => {
    func();
  }, []);
  console.log(d, "d");
  // Fetching users data
  // const id = useSelector((state) => state.user.id);
  // console.log(id);
  // const userfunc = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3500/api/get/alldata");
  //     const data = response.data;
  //     console.log(response.data, "kk");
  //     setUserdata(data);
  //   } catch (e) {
  //     console.error("No User found", e.message);
  //   }
  // };
  // useEffect(() => {
  //   userfunc();
  // }, []);

  // Passing userid for chatting
  const userchat = async (mail) => {
    try {
      // const response = await axios.get(
      //   `http://localhost:7900/api/getmembers/${d?.orgid}`
      // );
      // const data = response.data;

      const receiverid = memdata.find((e) => e.email === mail);

      if (receiverid) {
        const res = await axios.post(`${API}/updateconv`, {
          senderId: d?._id,
          receiverId: receiverid._id,
        });
        console.log(res.data, "res?.data");
        const rid = receiverid._id;
        const rusername = receiverid.name;
        // const idArray = [d._id, rid];
        // idArray.sort();
        // const convId = idArray.join("_");
        const convId = res.data.convId;
        setConvId(convId);
        console.log("convid", convId);
        dispatch(
          receiverData({
            rid: rid,
            rusername: rusername,
            convId: convId,
          })
        );
        const cookieData = JSON.stringify({
          rid: rid,
          rusername: rusername,
          convId: convId,
        });

        // Encrypt the serialized data
        const chatData = encryptaes(cookieData);
        // Set the chat data in the cookie
        Cookies.set("rooms", chatData);
        router.push("../side/chit");
      } else {
        console.log("User not found");
      }
    } catch (e) {
      console.error("No User found", e.message);
    }
  };

  // fetching teams data
  // const funcc = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3500/api/team");
  //     //console.log(response.data);
  //     const dataArray = response.data;
  //     //console.log(dataArray);
  //     const team = dataArray.map((i) => i.teamname).flat();
  //     setTeam(team);
  //     // console.log(team);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //   // const team = data.map((i) => i).flat();
  //   // setTteam(team);
  //   // console.log(tteam);
  // };
  // useEffect(() => {
  //   funcc();
  // }, []);

  const joinTeams = async (teamId) => {
    try {
      const userId = d?._id;
      const res = await axios.post(`${API}/joinedteam/${userId}/${teamId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // Create new team
  const create = async () => {
    try {
      const res = await axios.post(
        `${API}/v1/createteam/${d?._id}/${d?.orgid?.[0]}`,
        {
          teamname,
          email,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        await getTeams();
      }
      closeModal();
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const openModal = () => {
    setCreateteam(true);
  };

  const closeModal = () => {
    setCreateteam(false);
  };

  const getTeams = async () => {
    try {
      const response = await axios.get(`${API}/getteams/${d?.orgid?.[0]}`);
      setTeam(response.data.teams);
      console.log(response.data.teams, "team");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // const team = data.map((i) => i).flat();
    // setTteam(team);
    // console.log(tteam);
  };

  console.log(team);

  useEffect(() => {
    if (d?.orgid?.[0]) {
      getTeams();
    }
  }, [d?.orgid?.[0]]);
  return (
    <div className="h-[100%] w-full scrollbar-hide flex flex-col items-center sm:pt-1 sm:px-4">
      {/* Search members */}
      <div className=" w-full py-4 sm:rounded-2xl pn:max-sm:hidden font-semibold text-[18px] bg-white px-2  flex flex-row items-center justify-between">
        <div className=" w-[60%] text-[18px] px-4 font-semibold  flex flex-row rounded-xl items-center justify-between">
          Members & teams
        </div>

        {/* Storage used */}
        <div className="w-[40%] h-[100%] flex flex-row justify-evenly items-center">
          <div
            onClick={openModal}
            className=" rounded-xl flex h-[37px] w-[150px] border-2 text-[14px] text-white bg-[#FFC248] border-[#FFC248] justify-center items-center font-semibold"
          >
            + Create new team
          </div>
          {/* Modal for creating a new team */}
          {createteam && (
            <div className="modal">
              {/* Add your modal content and form for creating a new team here */}
              <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-50 bg-gray-800">
                <div className="bg-white p-4 rounded-xl w-[100%] sm:w-[30%] flex-col h-[50%] flex justify-evenly items-center">
                  <div className="flex flex-row  h-[5%] justify-between items-center w-[90%] ">
                    <div className="text-[16px] text-black flex items-center h-[100%] font-semibold ">
                      Create new team
                    </div>
                    {/* Add your form or other content here */}
                  </div>

                  <input
                    className="p-2 bg-[#FFFBF3] outline-none h-[15%] flex justify-start w-[90%] overflow-auto border-2 rounded-xl border-[#FFC248]"
                    placeholder="Enter Team name"
                    value={teamname}
                    onChange={(e) => setTeamname(e.target.value)}
                  />
                  <input
                    className="p-2 bg-[#FFFBF3] outline-none h-[15%] flex justify-start w-[90%] overflow-auto border-2 rounded-xl border-[#FFC248]"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="p-2 bg-[#FFFBF3] outline-none h-[15%] flex justify-start w-[90%] overflow-auto border-2 rounded-xl border-[#FFC248]"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex flex-row justify-between items-center w-[90%] space-x-1 h-[10%]">
                    <div
                      onClick={closeModal}
                      className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-white rounded-3xl"
                    >
                      Cancel
                    </div>
                    <div
                      onClick={create}
                      className="w-[50%] flex justify-center items-center text-black text-[14px] font-semibold h-[100%] bg-[#FFC248] rounded-3xl"
                    >
                      Create team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className=" rounded-xl flex h-[37px] w-[150px] border-2 text-[14px] text-white bg-[#FFC248] border-[#FFC248] justify-center items-center font-semibold">
            + Add Members
          </div>
        </div>
      </div>
      {/* Team */}
      <div className=" text-[#5A5A5A] text-[14px] h-full sm:h-[45%] bg-white sm:p-1 sm:rounded-2xl mt-2 w-full flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-row bg-[#FFF8EB] sm:rounded-2xl font-bold w-[100%] h-[10%] items-center pn:max-sm:hidden justify-evenly">
          <div className=" w-[45%] px-4 justify-center items-center flex">
            Team name
          </div>
          <div className=" w-[15%] flex justify-center items-center">
            Members
          </div>
          <div className=" w-[20%] flex justify-center items-center">
            Action
          </div>
          <div className=" w-[20%] flex justify-center items-center">
            Discuss
          </div>
        </div>

        {/*Members data */}
        {team.length <= 0 ? (
          <div className="h-[50px] w-[100%]  flex justify-center items-center">
            No teams are there
          </div>
        ) : (
          // Members List
          <div className="w-[100%] overflow-auto scrollbar-hide bg-white h-full flex flex-col text-black">
            {team.map(
              (f, i) => (
                // orgname === d?.orgname ?
                <div
                  key={i}
                  className="flex flex-row my-2 w-[100%]  h-[75px] items-center  border-b-[1px] border-[#f1f1f1]"
                >
                  <div className="flex items-center pn:max-sm:w-[30%]  w-[45%] space-x-2 px-2">
                    <Image
                      alt="pic"
                      src={pic}
                      className="h-[40px] w-[40px] object-contain"
                    />
                    <div className="flex flex-col ">
                      <div className="text-[14px] font-bold">{f?.teamname}</div>
                      <div className="text-[12px] ">{f?.admin?.name}</div>
                    </div>
                  </div>
                  <div className="w-[15%] pn:max-sm:hidden text-[12px] flex justify-center items-center">
                    {f?.totalMembers}
                  </div>

                  <div className="w-[20%] pn:max-sm:hidden text-[12px] flex justify-center items-center">
                    <div className="w-[20px] flex justify-start items-center ">
                      {f?.admin?._id !== d?._id && (
                        <div onClick={() => joinTeams(f?._id)}>join</div>
                      )}
                      <MdDeleteOutline className="h-[20px] w-[20px] text-red-400" />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      router.push(
                        `../side/teamchat?teamId=${f?._id}&userId=${d?._id}`
                      );
                    }}
                    className="w-[20%]  h-full flex flex-row items-center justify-center"
                  >
                    <Image
                      src={chat}
                      alt="chat"
                      className="w-[20px] h-[20px] resize"
                    />
                  </div>
                </div>
              )
              // : null
            )}
          </div>
        )}
      </div>
      {/* Members */}
      <div className=" text-[#5A5A5A] text-[14px] h-full sm:h-[42%] bg-white sm:p-1 sm:rounded-2xl mt-2 w-full flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-row bg-[#FFF8EB] sm:rounded-2xl font-bold w-[100%] h-[10%] items-center pn:max-sm:hidden justify-evenly">
          <div className=" w-[45%] px-4 justify-center items-center flex">
            Name
          </div>
          <div className=" w-[15%] flex justify-center items-center">Role</div>
          <div className=" w-[20%] flex justify-center items-center">
            Action
          </div>
          <div className=" w-[20%] flex justify-center items-center">
            Discuss
          </div>
        </div>

        {/*Members data */}
        {memdata.length <= 0 ? (
          <div className="h-[50px] w-[100%]  flex justify-center items-center">
            No members are there
          </div>
        ) : (
          // Members List
          <div className="w-[100%] overflow-auto scrollbar-hide bg-white h-full flex flex-col text-black">
            {memdata.map((m, i) => (
              <div
                key={i}
                className="flex flex-row my-2 w-[100%] h-[75px] items-center justify-between border-b-[1px] border-[#f1f1f1]"
              >
                <div className="flex items-center pn:max-sm:w-[30%] w-[45%] space-x-2 px-2">
                  <Image
                    alt="pic"
                    src={pic}
                    className="h-[40px] w-[40px] object-contain"
                  />
                  <div className="flex flex-col">
                    <div className="text-[14px] font-bold">{m?.name}</div>
                    <div className="text-[12px] ">{m?.email}</div>
                  </div>
                </div>
                <div className="w-[15%] pn:max-sm:hidden flex justify-center items-center">
                  <div className="bg-[#EBF6F1] text-[12px] rounded-xl text-[#46BD84] px-4 py-2">
                    {m?.jobrole}
                  </div>
                </div>

                <div className="w-[20%] h-full flex flex-row items-center justify-center">
                  <div className="w-[20px] flex justify-start items-center">
                    <MdDeleteOutline className="h-[20px] w-[20px] text-red-400" />
                  </div>
                </div>
                <div
                  onClick={() => userchat(m?.email)}
                  className="w-[20%] h-full flex flex-row  items-center justify-center"
                >
                  <Image
                    src={chat}
                    alt="chat"
                    className="w-[20px] h-[20px] resize"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
