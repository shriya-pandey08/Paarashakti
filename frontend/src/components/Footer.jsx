import React from "react";
import ROUND from "../images/alldebdatta-images/ROUND.png";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import { TfiYoutube } from "react-icons/tfi";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleLinkClickToGoToBlogPage = () => {
    window.open("https://www.youtube.com/@parashaktimahapeeth7970", "_blank");
  };

  return (
    // #0047AB #4267B2

    <div className="m-auto w-full bg-black pt-4">
      {/* <div className="flex justify-between w-[250px] m-auto mb-8 mt-3">
        <div className="bg-[#1877F2] rounded-full p-1 cursor-pointer">
          <BiLogoFacebook className="text-2xl text-white" />
        </div>
        <div className="bg-[#d63384] rounded-full p-1 cursor-pointer">
          <BiLogoInstagram className="text-2xl text-white" />
        </div>
        <div className="bg-[#dc3545] rounded-full p-1 cursor-pointer">
          <BsYoutube className="leading-3 text-[25px] text-white" />
        </div>
        <div className="bg-[#0072b1] rounded-full p-1 cursor-pointer">
          <BiLogoLinkedin className="leading-3 text-[24px] text-white" />
        </div>
        <div className="bg-[#000000] border rounded-full p-1 cursor-pointer">
          <FaXTwitter className="text-2xl text-white" />
        </div>
      </div> */}

      <div className="text-white bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-3 ml-2 font-poppins">Services</h2>
          <ul className="ml-2 text-[16px]">
            <Link to="/astro-birth-chart-reformation">
              <li className="">Astro Birth Chart Reformation</li>
            </Link>

            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/astro-vastu-consultancy">
              <li className="">Astro Vastu Consultancy</li>
            </Link>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/life-coach-and-success-guru">
              <li className="">Life Coach and Success Guru</li>
            </Link>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/palmistry">
              <li className="">Palmistry</li>
            </Link>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/numerology">
              <li className="">Numerology</li>
            </Link>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/face-reading">
              <li className="">Yagya and Poojan </li>
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 ml-2 font-poppins">
            Quick Links
          </h2>
          <ul className="ml-2 text-[16px]">
            <Link to="/about-page">
              <li>About Me</li>
            </Link>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/services">
              <li>Services</li>
            </Link>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/appointment">
              <li>Appointment</li>
            </Link>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/awards">
              <li>Awards & Accolades</li>
              <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />
            </Link>

            <Link to="/events">
              <li>Events</li>
              <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />
            </Link>

            <li
              onClick={handleLinkClickToGoToBlogPage}
              className="cursor-pointer"
            >
              Blogs
            </li>
            <hr className="border border-s-violet-400 border-gray-300 my-2 m-auto" />

            <Link to="/contact">
              <li>Contact Us</li>
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 font-poppins ml-2">
            Get In Touch
          </h2>
          <div className="text-[16px] ml-2">
            <p>Uttar Pradesh, India</p>
            <p>Email: paraashaktimahapeeth@gmail.com</p>
            <p>Phone: +91 99970 88291</p>
          </div>
          {/* Social icons div here */}
          <div className="flex justify-between md:ml-2 lg:ml-2 w-[250px] m-auto mt-[70px]">
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
              href="twitter.com/ParashaktiMaha1?s=08"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-[#000000] rounded-full p-1 cursor-pointer">
                <FaXTwitter className="text-2xl text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div>
        <hr className=" w-[90%] border-s-violet-400 border-gray-300 my-10 mb-2 m-auto" />
      </div>
      <div className="m-auto text-center text-white pb-2">
        © Copyright 2025, All Rights Reserved, by Paraashakti Mahapeeth
      </div>
    </div>
  );
};

export default Footer;
