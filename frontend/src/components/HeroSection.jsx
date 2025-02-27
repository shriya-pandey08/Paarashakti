import React, { useEffect, useState } from "react";
import banner from "../images/banner.jpg";
import mbanner from "../images/image3.png";
import image3 from "../images/image3.png";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import FeaturedServices from "./FeaturedServices";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 912);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImage = isSmallScreen ? mbanner : image3;

  return (
    <>
      <div className="relative">
        <div className="fixed w-full h-screen">
          <img
            src={backgroundImage}
            alt=""
            className="top-0 left-0 w-full h-screen object-cover"
          />
        </div>
        <div className="hidden md:block">
          <TopNavbar />
        </div>
        <BottomNavbar />
        {/* <About /> */}
        <div className=" flex justify-center items-center w-full absolute m-auto h-screen">
          <div className="absolute text-center top-[60%] md:top-[40%] lg:top-[30%]  lg:left-32 md:left-14 p-4">
            <h1 className="text-5xl font-philosopher text-black font-semibold">
              Achariya Dr.Sanjay Pant
            </h1>
            <div className="mt-3 mb-3 ">
              <p className="text-black">
                <strong>Globally Acclaimed Astrologer </strong>
              </p>
              <p className="text-black">
                <strong>Vastu Influencer </strong>
              </p>
              <p className="text-black">
                <strong>Life Coach</strong>, <strong>Success Guru</strong>
              </p>
            </div>
            <Link to={"/appointment"}>
              <button className="text-white bg-black hover:bg-transparent border border-black rounded-sm px-3 py-2 hover:border hover:border-black transition duration-700 ease-in-out">
                Your Journey Begins Here
              </button>
            </Link>
          </div>
        </div>
        {/* <About /> */}
        <FeaturedServices />
        {/* <Achievement /> */}
      </div>
    </>
  );
};

export default HeroSection;
