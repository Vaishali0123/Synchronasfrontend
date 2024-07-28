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
import { useAuthContext } from "@/utils/auth";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

function page() {
  // const cookie = Cookies.get("she2202");
  // const cook = decryptaes(cookie);
  // const d = JSON.parse(cook);
  const { data } = useAuthContext();
  const orgid = data?.orgid?.[0];
  const [dataa, setDataa] = useState([]);
  const [uploadpop, setUploadpop] = useState(false);
  const [filename, setFilename] = useState("");
  const [filestorage, setFilestorage] = useState("");
  const [load, setLoad] = useState(false);
  const [del, setDel] = useState(-1);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilename(file.name);

      uploadfile(file); // Uncomment this line to call uploadfile with the selected file
    }
  };

  const uploadfile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", data?.id);
      formData.append("orgid", data?.orgid?.[0]);

      const response = await axios.post(`${API}/uploadtostorage`, formData);

      if (response.status === 200) {
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
      const res = await axios.get(`${API}/fetchstorage/${orgid}`);
      if (res.data.success) {
        setDataa(res.data.storage);
        setFilestorage(res.data.storageused);
      }
    } catch (e) {
      console.log(e);
    }
  }, [orgid]);

  const handledel = async (o) => {
    try {
      setLoad(true);
      const res = await axios.post(`${API}/deleteitem`, {
        id: orgid,
        sid: o,
      });
      if (res.data.success) {
        fetchstorage();
      }
    } catch (e) {
      console.log(e);
    }
    setLoad(false);
  };

  useEffect(() => {
    if (orgid) {
      fetchstorage();
    }
  }, [orgid]);

  // Truncate text
  const truncatetext = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  function convertFromBytes(bytes) {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " TB";
    } else if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + " GB";
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + " MB";
    } else {
      return bytes + " KB";
    }
  }

  function convertFromBytess(bytes) {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2);
    } else if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2);
    } else if (bytes >= 1) {
      return (bytes / 1024).toFixed(2);
    } else {
      return bytes;
    }
  }

  const widthPercentage = (filestorage / 10000000000) * 100; // Calculate the width percentage

  return (
    <div className="h-[100%] w-full scrollbar-hide  flex flex-col items-center ">
      <div className="bg-white w-full sm:rounded-2xl">
        <div className="h-[60px] w-full py-2 flex flex-row pn:max-sm:flex-col items-center px-2 justify-between">
          <div className="font-semibold text-[16px] px-2">Storage</div>
          {/* Storage used */}
          <div className="w-[45%] pn:max-sm:w-[100%] h-[50px] flex flex-col items-center justify-center">
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
                      10 GB
                    </div>
                  </div>
                </div>
                <div className="w-full h-3 relative overflow-hidden min-w-[100px] bg-[#e2e2ff] rounded-full">
                  <div
                    style={{
                      width: `${widthPercentage}%`,
                    }}
                    className="absolute top-0 left-0  rounded-r-xl z-10 bg-[#08A0F7] h-full  "
                  >
                    <div className="h-full bg-[#08A0F7]"></div>
                  </div>
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
          <div className="flex items-center sm:w-[30%] w-[75%] px-2 space-x-2 ">
            <Image
              src={Checkbox}
              alt="img"
              className="h-[20px] w-[20px] object-contain"
            />
            <div className="text-black font-semibold">File name</div>
          </div>
          <div className="w-[15%] text-black font-semibold ">File size</div>
          <div className=" w-[18%] text-black font-semibold">Date uploaded</div>
          {/* <div className=" w-[18%] text-black font-semibold">Last updated</div> */}
          <div className=" w-[15%] text-black font-semibold">Uploaded by</div>
          <div className=" w-[5%] text-black font-semibold">Action</div>
        </div>

        {/* Files data */}
        {dataa.length === 0 ? (
          <div className="h-[50px] w-[100%] py-[10vh] text-black font-bold flex justify-center items-center">
            No files uploaded
          </div>
        ) : (
          <div className="w-[100%] flex flex-col  items-center justify-evenly">
            {dataa.map((d, i) => (
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
                    <div className="w-[80%]">
                      <div className=" w-[100%]">
                        {truncatetext(d.filename, 30)}
                      </div>
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
                    {/* {moment(d.createdAt).format("HH:mm")} */}

                    {moment(d.createdAt).format("MMMM Do, YYYY")}
                  </div>
                  {/* <div className=" w-[18%] pn:max-sm:hidden px-1">
                    {moment(d?.createdAt).fromNow()}
                  </div> */}
                  <div className=" w-[15%] pn:max-sm:hidden px-1">
                    {d?.userid?.email}
                  </div>
                  <div
                    onClick={() => {
                      setDel(i);
                      handledel(dataa?._id);
                    }}
                    className=" sm:w-[5%] w-[20px] flex justify-start items-center"
                  >
                    {load && del === i ? (
                      <div className="animate-spin">
                        <AiOutlineLoading3Quarters />
                      </div>
                    ) : (
                      <MdDeleteOutline className="h-[20px] w-[20px] text-red-400" />
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      {uploadpop && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-xl">
            <div className="flex flex-rowvw-[100%]">
              <div className="text-black text-[14px] font-bold w-[90%]">
                Media Upload
              </div>
              <RxCross2
                onClick={() => setUploadpop(false)}
                color="#000"
                size={15}
                className="w-[10%] "
              />
              {/* <div
                onClick={() => setUploadpop(false)}
                className="text-black text-[14px]  w-[10%]  items-center justify-center flex"
              >
                x
              </div> */}
            </div>

            <div className=" text-[13px] text-[#888] mb-2">
              Add your documents here to upload files
            </div>
            <div className="border-2 border-[#FFC248] border-dashed h-[200px]  rounded-xl flex-col items-center justify-evenly flex">
              <IoCloudUploadOutline color="#FFC248" size={30} />
              <div className="items-center justify-center flex">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="justify-center items-center flex w-[70%]  text-[14px]"
                  // onChange={(e) => {
                  //   setFilename(e.target.files[0]);
                  //   // uploadfile(e.target.files[0]);
                  // }}
                />
                {/* <div>{filename && <p>Selected file: {filename}</p>}</div> */}
              </div>
              <div className=" text-[13px] text-[#888]">
                Max 10 MB files are allowed
              </div>
              <div className="text-[#0075ff] font-bold text-[14px]">Upload</div>
            </div>

            {/* <button>Cancel</button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
