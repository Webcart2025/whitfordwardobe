import { useState, useEffect } from "react";

const images = [
  "/images/web1.png",
  "/images/web2.png",
  "/images/web3.png",
  "/images/web4.png",
  "/images/web5.png",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-auto rounded-lg shadow-lg transition-transform duration-2500 ease-in-out"
      />
    </div>
  );
};

export default ImageSlider;
