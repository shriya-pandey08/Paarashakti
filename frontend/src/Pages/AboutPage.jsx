import React from "react";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import Footer from "../components/Footer";
import aboutnew from "../images/alldebdatta-images/aboutnew.jpeg";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <TopNavbar />
      </div>
      <div className="bg-black h-[70px]">
        <BottomNavbar className="text-black" />
      </div>
      <div className="  bg-white absolute w-full">
        <div className="mt-10 pb-10 px-8 ">
          <h3 className="font-philosopher text-xl pl-3 font-bold">About Me</h3>
          <h3 className="font-dancing text-[20px] leading-9 pl-3 ">
            Namaskar!
          </h3>

          <div className=" flex flex-col md:flex-row justify-between text-gray-700 leading-relaxed">
            <div className=" w-full md:w-[50%] px-3 sm:mb-10 text-popp">
              <p>
                As I extend my warm greetings, I invite you to delve into the
                tapestry of my life's journey. My name is Achariya Dr. Sanjay
                Pant, a seasoned professional in the realms of astrology, vastu
                consultancy, numerology, success coaching, and authorship. With
                an enriching experience spanning 30+ years, I've dedicated my
                life to unraveling the mysteries of existence and guiding others
                toward a harmonious and prosperous life.
              </p>
              <br />
              <p>
                Born and raised in the culturally rich city of Pithoragarh,
                Uttrakhand, my roots are deeply embedded in the spiritual
                essence of India. Currently Living in Bareilly, Uttar Pradesh.
              </p>
              <br />
              <p>
                From the early days of my childhood, I felt a profound
                connection to the metaphysical aspects of life, a calling that
                would shape my destiny.
              </p>
              <br />
            </div>
            <div className="w-full md:w-[40%] flex items-center mt-16 sm:mt-8 md:mt-[-50px]">
              <div className="border-2 border-green-200 rounded-3xl w-[300px] h-auto relative overflow-hidden bg-black/20">
                <img
                  src={aboutnew}
                  className="w-full h-auto rounded-3xl"
                  alt=""
                />
              </div>
              <div className="border-2 border-green-200 rounded-3xl w-[300px] h-auto relative overflow-hidden -ml-[220px] -mt-28">
                <img
                  src={aboutnew}
                  className="w-full h-auto rounded-3xl"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" pb-10 px-10 m-auto">
          <p className=" text-gray-700 leading-relaxed">
            In the serene landscapes of Pithoragarh, nestled in the majestic
            hills of Uttarakhand, my spiritual journey found its roots.
            Surrounded by the tranquility of nature and the deep cultural
            traditions of the region, I developed a profound connection to the
            mystical energies of the universe. The sacred rituals and practices
            of my homeland became a source of inspiration, guiding me toward
            introspection and self-discovery. Prayer and meditation were
            integral to my upbringing, offering peace and clarity amidst life’s
            challenges. This spiritual foundation kindled my interest in
            astrology, drawing me to explore the ancient science of
            understanding human destinies and cosmic alignments. With an innate
            intuition and a relentless pursuit of wisdom, I embraced astrology
            as a path to illuminate lives and foster harmony.
          </p>{" "}
          <br />
          <p>
            Alongside my spiritual journey, I pursued Doctrait in{" "}
            <strong>Ayurveda</strong>, deepening my understanding of the
            fundamental truths of existence. This blend of academic inquiry and
            spiritual wisdom became the bedrock of my approach to life.This
            seamless flow of learning and teaching became a profound experience,
            paving the way for what connects us today—a shared journey toward
            harmony and enlightenment.
          </p>{" "}
          <br />
          <p>
            In the grand tapestry of existence, I acknowledge God as my eternal
            teacher, and the Universe as my guiding force. Insights, courage,
            and wisdom assimilated over the years empower me to fulfill the
            noble purpose of spreading knowledge. My mission is to kindle hope
            in humanity, offering the keys to solving life's puzzles through
            astrology,Yagyas, Vastu, and palmistry. These ancient sciences, when
            understood and applied, unlock abundance for all.
          </p>{" "}
          <br />
          <h3 className="font-sans italic font-bold text-xl">
            - Astro Achariya Dr. Sanjay Pant
          </h3>
        </div>
        {/* Mission and vision starts here  */}
        <div className="grid md:flex lg:flex m-auto mb-7 font-sans w-[70%] gap-4">
          <div className=" m-auto bg-purple-600 text-center p-4 w-full rounded-br-3xl rounded-tl-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 font-philosopher text-center">
              Mission
            </h1>
            <p className="text-white font-poppains">
              Empower All Through Astrology & Palmistry Wisdom.
            </p>
          </div>

          <div className=" m-auto bg-purple-600 text-center p-4 w-full rounded-bl-3xl rounded-tr-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 font-philosopher text-center">
              Vision
            </h1>
            <p className="text-white font-poppins">
              Crafting Better Lives with Astrological Solutions.
            </p>
          </div>
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
