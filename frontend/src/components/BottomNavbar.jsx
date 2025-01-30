import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative font-poppins">
      {/* Navbar for mobile and tab sizes */}
      <div
        className={`flex text-2xl justify-between z-10 m-auto w-full h-[65px] items-center px-6  ${
          sticky
            ? "fixed top-0 bg-black transition-all duration-700"
            : "absolute top-0 transition-all duration-700"
        }`}
      >
        {/* Text-based logo */}
        <div className="flex items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-white font-bold text-lg md:text-xl lg:text-2xl cursor-pointer"
          >
            पराशक्ति महापीठ 🙏
          </h1>
        </div>

        <button
          className="md:hidden cursor-pointer px-1 py-1"
          onClick={() => {
            setNavbar(!navbar);
          }}
        >
          <GiHamburgerMenu color="white" size={24} />
        </button>

        {navbar ? (
          <div className="bg-black/50 fixed w-full h-screen z-10 top-0 left-0" />
        ) : (
          ""
        )}

        {/* Conditional navbar for large screens */}
        <div className="hidden md:flex">
          <h3
            onClick={() => navigate("/")}
            className={`cursor-pointer mt-2 mx-2 text-[16px] transition duration-300 ${
              location.pathname === "/" ? "font-bold text-white" : "text-white"
            }`}
          >
            Home
            {location.pathname === "/" && (
              <hr className="border-b-2 border-white mt-[1px]" />
            )}
          </h3>
          <h3
            onClick={() => navigate("/about-page")}
            className={`cursor-pointer mt-2 mx-2 text-[16px] transition duration-300 ${
              location.pathname === "/about-page"
                ? "font-bold text-white"
                : "text-white"
            }`}
          >
            About
            {location.pathname === "/about-page" && (
              <hr className="border-b-2 border-white mt-[1px]" />
            )}
          </h3>
          <h3
            onClick={() => navigate("/services")}
            className={`cursor-pointer mt-2 mx-2 text-[16px] transition duration-300 ${
              location.pathname === "/services"
                ? "font-bold text-white"
                : "text-white"
            }`}
          >
            Services
            {location.pathname === "/services" && (
              <hr className="border-b-2 border-white mt-[1px]" />
            )}
          </h3>
          <h3
            onClick={() => navigate("/appointment")}
            className={`cursor-pointer mt-2 mx-2 text-[16px] transition duration-300 ${
              location.pathname === "/appointment"
                ? "font-bold text-white"
                : "text-white"
            }`}
          >
            Appointment
            {location.pathname === "/appointment" && (
              <hr className="border-b-2 border-white mt-[1px]" />
            )}
          </h3>
          <h3
            onClick={() => navigate("/contact")}
            className={`cursor-pointer mt-2 mx-2 text-[16px] transition duration-300 ${
              location.pathname === "/contact"
                ? "font-bold text-white"
                : "text-white"
            }`}
          >
            Contact
            {location.pathname === "/contact" && (
              <hr className="border-b-2 border-white mt-[1px]" />
            )}
          </h3>
        </div>

        {/* Mobile responsive navbar for medium and small screens */}
        <div
          className={
            navbar
              ? "fixed top-0 right-0 w-full h-auto md:h-[400px] lg:h-[320px] bg-white z-10 transition-transform transform translate-y-0 duration-300 ease-in"
              : "fixed bottom-0 right-0 w-full h-auto md:h-[400px] lg:h-[320px] bg-white z-10 transition-transform transform translate-y-full duration-300 ease-in"
          }
        >
          <AiOutlineClose
            onClick={() => setNavbar(!navbar)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />

          <div className="text-[16px] mt-12 text-center">
            <h3
              onClick={() => navigate("/")}
              className="cursor-pointer hover:bg-blue-500 mt-2 hover:text-white transition duration-300"
            >
              Home
            </h3>
            <h3
              onClick={() => navigate("/about-page")}
              className="cursor-pointer hover:bg-blue-500 mt-2 hover:text-white transition duration-300"
            >
              About
            </h3>
            <h3
              onClick={() => navigate("/services")}
              className="cursor-pointer hover:bg-blue-500 mt-2 hover:text-white transition duration-300"
            >
              Services
            </h3>
            <h3
              onClick={() => navigate("/appointment")}
              className="cursor-pointer hover:bg-blue-500 mt-2 hover:text-white transition duration-300"
            >
              Appointment
            </h3>
            <h3
              onClick={() => navigate("/contact")}
              className="cursor-pointer hover:bg-blue-500 mt-2 hover:text-white transition duration-300"
            >
              Contact
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
