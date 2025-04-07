import React from "react";

const Banner = () => {
  return (
    <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <video
          className="w-full h-full object-cover"
          src="/videos/IMG_4986.MP4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
};

export default Banner;