import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const videoUrls = [
  "https://www.youtube.com/watch?v=8-e6-fscpE8",
  "https://www.youtube.com/watch?v=gNfHL2_ZX20",
  "https://www.youtube.com/watch?v=6lR1juFfUdw",
  "https://www.youtube.com/watch?v=ZxP2CjQo8FE",
  "https://www.youtube.com/watch?v=phB4dK6q5nE",
  "https://www.youtube.com/watch?v=p1jRGE7YR5w",
  "https://www.youtube.com/watch?v=Wr6b6eg9HUM",
  "https://www.youtube.com/watch?v=5gXG20cmSh0",
];

const getYoutubeThumbnail = (url) => {
  const videoId =
    url.split("v=")[1]?.split("&")[0] || url.split("/").pop().split("?")[0];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // High-quality thumbnail
};

const FeaturedVideoEmbed = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleThumbnailClick = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  const handlePrev = () => {
    const newIndex =
      startIndex - itemsPerPage < 0
        ? videoUrls.length - itemsPerPage
        : startIndex - itemsPerPage;
    setStartIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      startIndex + itemsPerPage >= videoUrls.length
        ? 0
        : startIndex + itemsPerPage;
    setStartIndex(newIndex);
  };

  const visibleThumbnails = videoUrls.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleOpenInNewTabToGoToChannel = (event) => {
    event.preventDefault();
    window.open("https://www.youtube.com/@parashaktimahapeeth7970", "_blank");
  };

  return (
    <div>
      <h1 className="text-center mt-10 text-2xl md:text-3xl lg:text-4xl m-3 font-philosopher">
        Featured Videos
      </h1>
      <div className="m-auto mt-6 mb-10 w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 relative">
        {visibleThumbnails.map((videoUrl, index) => (
          <div className="m-auto" key={index}>
            <img
              src={getYoutubeThumbnail(videoUrl)}
              alt={`Thumbnail ${index + startIndex + 1}`}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => handleThumbnailClick(videoUrl)}
            />
          </div>
        ))}

        <div
          className="text-white absolute top-[35%] left-0 text-2xl p-2 group-hover:bg-black/20 cursor-pointer"
          onClick={handlePrev}
        >
          <FaChevronLeft
            size={30}
            className="transition duration-300 hover:bg-opacity-100 hover:text-sky-500"
          />
        </div>
        <div
          className="text-white absolute top-[35%] right-0 text-2xl p-2 group-hover:bg-black/20 cursor-pointer"
          onClick={handleNext}
        >
          <FaChevronRight
            size={30}
            className="transition duration-300 hover:bg-opacity-100 hover:text-sky-500"
          />
        </div>
      </div>

      <Link to="#" onClick={handleOpenInNewTabToGoToChannel}>
        <button className="text-white bg-black hover:bg-transparent border border-black rounded-[4px] px-3 py-1 hover:border hover:border-black transition duration-700 ease-in-out hover:text-black m-auto flex items-center mb-10">
          Visit Our Channel
        </button>
      </Link>
    </div>
  );
};

export default FeaturedVideoEmbed;
