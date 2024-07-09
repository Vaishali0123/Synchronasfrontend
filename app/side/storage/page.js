"use client";
import React, { useCallback, useEffect, useState } from "react";
import assign from "../../assets/assign.png";
import upload from "../../assets/upload.png";
import figma from "../../assets/figma.png";
import file from "../../assets/file.png";
import Dropdown from "../../assets/Dropdown.png";
import gallery from "../../assets/gallery.png";
import frame from "../../assets/frame.png";
import Checkbox from "../../assets/Checkbox.png";
import Search from "../../assets/Search.png";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { API } from "@/utils/Essentials";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/security";
import moment from "moment";

function page() {
  const cookie = Cookies.get("she2202");
  const cook = decryptaes(cookie);
  const d = JSON.parse(cook);

  const [data, setData] = useState([]);
  const [uploadpop, setUploadpop] = useState(false);
  const [filename, setFilename] = useState("");
  const [filestorage, setFilestorage] = useState("");

  const uploadfile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", d?._id);
      formData.append("orgid", d?.orgid[0]);

      const response = await axios.post(`${API}/uploadtostorage`, formData);
      if (response.status === 200) {
        console.log(response.data.message); // Log the success message from the server
        fetchstorage();
        setUploadpop(false);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchstorage = useCallback(async () => {
    try {
      const res = await axios.post(`${API}/fetchstorage`, { id: d?.orgid[0] });
      if (res.data.success) {
        setData(res.data.storage);
        setFilestorage(res.data.storageused);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handledel = async (o) => {
    try {
      const res = await axios.post(`${API}/deleteitem`, {
        id: d?.orgid[0],
        sid: o,
      });
      if (res.data.success) {
        fetchstorage();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchstorage();
  }, []);

  function convertFromBytes(bytes) {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    } else if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return bytes + " Bytes";
    }
  }

  return (
    <div className="h-[100%] w-full scrollbar-hide  flex flex-col items-center sm:pt-1 sm:px-4 ">
      <div className="bg-white w-full sm:rounded-2xl">
        <div className="h-[60px] w-full flex flex-row items-center px-2 justify-between">
          <div className="font-semibold text-[18px] px-2">Storage</div>
          {/* Storage used */}
          <div className="w-[45%] pn:max-sm:w-[100%]  h-[50px] flex flex-col items-center justify-center">
            <div className="flex flex-row items-center  w-[100%]">
              <div className="px-2 w-full flex flex-col gap-1">
                <div className="text-sm text-[#615E83]">
                  <div className="flex flex-row items-center justify-between w-[100%]">
                    <div className="text-[#121212] font-bold text-[13px] ">
                      Storage used:
                    </div>
                    <div className="text-[#121212] text-[12px] ">
                      {convertFromBytes(filestorage)}
                    </div>
                    <div className="text-[#121212] text-[12px] w-[70%] justify-end flex">
                      15 GB
                    </div>
                  </div>
                </div>
                <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#e2e2ff] rounded-full">
                  <div
                    style={{ width: "40%" }}
                    className="absolute top-0 left-0 rounded-r-xl z-10 bg-[#08A0F7] h-full "
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          {/* <div className="w-[50%]  pn:max-sm:hidden h-[50px] flex items-center justify-end">
        <div className="w-[50%] px-2   h-[40px] flex flex-row rounded-xl bg-white ring-1 ring-[#f1f1f1] items-center justify-between">
          <input
            className="text-[#121212] text-[15px] outline-none w-[90%] "
            placeholder="Search"
          />
          <Image src={Search} className="h-[25px] w-[25px] object-contain" />
        </div>
        </div> */}
        </div>
      </div>
      {/* main*/}
      <div className="overflow-auto mt-2 text-[#5A5A5A] text-[14px] scrollbar-hide h-full bg-white rounded-2xl w-[100%] flex flex-col items-center">
        {/* Header */}
        <div className="w-full h-[50px] flex flex-row px-2 justify-between items-center ">
          <div className=" h-[100%] flex justify-between items-center">
            <div className="text-[#1e1e1e] text-[14px] font-semibold">
              Files uploaded
            </div>
          </div>
          <div className="space-x-2 h-[100%] flex flex-row items-center justify-evenly">
            <div className="p-2 rounded-xl border-2 text-[12px] text-black font-semibold justify-center items-center">
              Download all
            </div>
            <div
              onClick={() => {
                setUploadpop(true);
              }}
              className="p-2 flex flex-row rounded-xl border-2 text-[12px] text-white bg-[#FFC248] border-[#FFC248] justify-evenly items-center font-semibold"
            >
              <Image
                src={upload}
                alt="img"
                className="h-[16px] w-[16px] object-contain"
              />
              <div className="mx-2 pn:max-sm:hidden">Upload</div>
            </div>
          </div>
        </div>
        {/* 2nd header */}
        <div className="flex flex-row pn:max-sm:hidden w-[100%] h-[50px] items-center justify-evenly">
          <div className="flex items-center sm:w-[30%] w-[70%] px-2 space-x-2">
            <Image
              src={Checkbox}
              alt="img"
              className="h-[20px] w-[20px] object-contain"
            />
            <div className=" ">File name</div>
          </div>
          <div className="w-[15%]">File size</div>
          <div className=" w-[18%]">Date uploaded</div>
          <div className=" w-[18%]">Last updated</div>
          <div className=" w-[20%]">Uploaded by</div>
        </div>
        {/* Files data */}
        {data.length === 0 ? (
          <div className="h-[50px] w-[100%] py-[10vh] text-black font-bold flex justify-center items-center">
            No files uploaded
          </div>
        ) : (
          <div className="w-[100%] flex flex-col items-center justify-evenly">
            {data.map((d, i) => (
              <>
                <div
                  key={i}
                  className="flex flex-row w-[100%] h-[50px] items-center justify-between border-b-[1px] border-[#f1f1f1]"
                >
                  <div className="flex items-center sm:w-[30%] w-[70%] px-1 space-x-2">
                    <Image
                      alt="img"
                      src={file}
                      className="h-[35px] w-[35px] object-contain"
                    />
                    <div>
                      <div className=" ">{d.filename}</div>
                      <div className=" sm:hidden px-1">
                        {convertFromBytes(d.size)}
                      </div>
                    </div>
                  </div>
                  <div className="w-[15%] pn:max-sm:hidden px-1">
                    {" "}
                    {convertFromBytes(d.size)}
                  </div>
                  <div className=" w-[18%] pn:max-sm:hidden px-1">
                    {moment(d?.date).fromNow()}
                  </div>
                  <div className=" w-[18%] pn:max-sm:hidden px-1">
                    {moment(d?.createdAt).fromNow()}
                  </div>
                  <div className=" w-[15%] pn:max-sm:hidden px-1">
                    {d?.userid?.email}
                  </div>
                  <div
                    onClick={() => {
                      handledel(d?._id);
                    }}
                    className=" sm:w-[5%] w-[20px] flex justify-start items-center"
                  >
                    <MdDeleteOutline className="h-[20px] w-[20px] text-red-400" />
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      {uploadpop && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <input
              type="file"
              onChange={(e) => uploadfile(e.target.files[0])}
            />
            <button onClick={() => setUploadpop(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
