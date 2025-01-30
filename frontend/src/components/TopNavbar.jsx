import React from "react";
import ROUND from "../images/alldebdatta-images/ROUND.png";
import { BiLogoFacebook, BiLogoInstagram } from "react-icons/bi";
import { TfiYoutube } from "react-icons/tfi";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneFill, BsYoutube } from "react-icons/bs";

import { ImTwitter } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";

const TopNavbar = () => {
  return (
    <div className=" h-[50px] relative z-10 flex justify-between items-center w-full m-auto px-20 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-[15px] justify-around mr-2">
          <BsTelephoneFill className="mr-1" />
          <p>+91 9997088291 </p>
        </div>
        <div className="flex items-center text-[15px] justify-around ml-2">
          <AiOutlineMail className="mr-1" />
          <p>paraashaktimahapeeth@gmail.com</p>
        </div>
      </div>
      <div className="flex justify-between w-[250px] ">
        <a
          href="https://www.facebook.com/yogirajparaashaktimahapeeth/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-[#1877F2] rounded-full p-1 cursor-pointer">
            <BiLogoFacebook className="text-2xl text-white" />
          </div>
        </a>

        <a
          href="https://www.instagram.com/paraashakti/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-[#d63384] rounded-full p-1 cursor-pointer">
            <BiLogoInstagram className="text-2xl text-white" />
          </div>
        </a>

        <a
          href="https://www.youtube.com/@parashaktimahapeeth7970"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-[#dc3545] rounded-full p-1 cursor-pointer">
            <BsYoutube className="leading-3 text-[25px] text-white" />
          </div>
        </a>

        <a
          href="https://varta.astrosage.com/astrologer/drsanjay2567?lang=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-[#ff9933] rounded-full p-1 cursor-pointer">
            <img src={ROUND} alt="Astrosage" className="w-6 h-6" />
          </div>
        </a>

        <a
          href="https://x.com/i/flow/login?redirect_after_login=%2FParashaktiMaha1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-[#000000] rounded-full p-1 cursor-pointer">
            <FaXTwitter className="text-2xl text-white" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default TopNavbar;
