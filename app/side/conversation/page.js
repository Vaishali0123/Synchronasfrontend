"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { decryptaes, encryptaes } from "@/app/security";
import axios from "axios";
import { API } from "@/utils/Essentials";
import { receiverData } from "@/lib/receiverSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const cookie = Cookies.get("she2202");
  const dispatch = useAppDispatch();
  // const cook = decryptaes(cookie);
  // // const d = JSON.parse(cook);
  // const recc = Cookies.get("rooms");
  // const cc = decryptaes(recc);
  // const chatdata = JSON.parse(cc);
  // const receiverId = d._id;
  // const senderId = chatdata.rid;
  const [data, setData] = useState([]);
  const [memdata, setMemdata] = useState([]);
  const [convId, setConvId] = useState("");
  const [click, setClick] = useState(1);

  // const func = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:7900/api/getmembers/${d?.orgid}`
  //     );
  //     setMemdata(response?.data);
  //   } catch (e) {
  //     console.error("Error in finding member", e.message);
  //   }
  // };
  // useEffect(() => {
  //   func();
  // }, []);

  const userchat = async (email) => {
    try {
      const receiverid = memdata.find((e) => e.email === email);
      console.log(receiverid, "cv");
      if (receiverid) {
        const res = await axios.post(`${API}/updateconv`, {
          senderId: d?._id,
          receiverId: receiverid._id,
        });
        console.log(res?.data, "res");
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

        const chatData = encryptaes(cookieData);
        Cookies.set("rooms", chatData);
        router.push("../side/chit");
      } else {
        console.log("User does not exist ");
      }
    } catch (e) {
      console.error("No User found", e.message);
    }
  };

  const fetchconv = async () => {
    try {
      const res = await axios.get(`${API}/getconv/${d?._id}`);
      console.log(res.data.data, "convdata");
      setData(res?.data?.data);
    } catch (e) {
      console.log("Messages not fetched", e.message);
    }
  };
  useEffect(() => {
    fetchconv();
  }, []);
  return (
    <div className="bg-white w-[100%] h-[100%] flex flex-col">
      {/* Header */}
      <div className="w-[100%] md:h-[100px] bg-white pn:max-sm:h-[70px] flex flex-row items-center justify-evenly border-b-2 border-[#000]">
        <div className="text-white p-2 px-4 rounded-lg bg-[#FFC977]">Chats</div>
        <div className="text-white p-2 px-4 rounded-lg bg-[#FFC977]">
          Discuss
        </div>
      </div>
      {/* Conversations */}
      <div className="h-[90%] bg-[#f1f1f1] w-[100%]">
        {data.map((d, i) => (
          <div
            key={i}
            onClick={() => {
              userchat(d?.email);
            }}
            className="h-[70px] bg-[#f8f8f8] w-[100%] flex flex-row mb-2 items-center justify-evenly"
          >
            <div className="w-[4%] h-[70%] items-center justify-center p-1   bg-gray-500 rounded-full ">
              <Image
                src={require("../../assets/people.png")}
                alt="dp"
                className="w-[100%] h-[100%] object-contain self-center"
              />
            </div>
            <div className="w-[90%] h-[100%] flex flex-col justify-center">
              {/* other name */}
              <div className="text-black font-bold text-[16px]">
                {d?.frndname}
              </div>
              {/* last msg */}
              <div className="text-black text-[12px]">
                {d?.lastMessageText === ""
                  ? "Start a new conversation"
                  : d?.lastMessageText}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
