import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OversizedTShirtSlider from "./HomeCategory/OversizedTShirtSlider";
import ImageSlider from "../../components/ImageSlider/ImageSlider";

const Home = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const navigate = useNavigate();

  const handleViewAll = () => {
    setIsBlurred(true);
    setTimeout(() => {
      navigate("Products/oversized-tshirts");
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* Banner Section */}
      <section className="w-full max-w-[1920px] mx-auto relative">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-500 ease-in-out">
          <video
            className={`w-full h-full object-cover transition-all duration-500 ${isBlurred ? "blur-md" : ""}`}
            src="/videos/Websitevideo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          
          {/* T-Shirt Details Overlay */}
          <div className="absolute bottom-5 left-5 bg-black bg-opacity-60 text-white p-4 rounded-lg">
            <h2 className="text-xl font-bold">Oversized T-Shirt</h2>
            <p className="text-sm text-gray-300">A wardrobe tailored for the Elite!! Check out!!!.</p>
            <span className="text-lg font-semibold text-yellow-400">₹699</span>
          </div>

          {/* View All Button */}
          <div className="absolute bottom-3 right-5">
            <button
              onClick={handleViewAll}
              className="bg-yellow-400 text-black px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 animate-pulse hover:scale-105"
            >
              View All Oversized T-Shirts
            </button>
          </div>
        </div>
      </section>

      {/* Discount Card */}
      <section className="flex justify-center">
        <div className="relative flex items-center justify-between w-[85%] max-w-2xl bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg rounded-xl px-3 py-2 border border-gray-300 ticket-border">
          <div className="text-left pl-3">
            <h2 className="text-lg font-extrabold text-gray-900">GET EXTRA </h2>
            <p className="text-gray-800 text-sm">-------</p>
          </div>
          <div className="bg-white px-4 py-1.5 rounded-lg shadow-md text-black font-bold text-lg flex items-center gap-2">
            <span className="text-sm text-gray-600">USE CODE</span>
            <span className="text-xl text-gray-900">------</span>
          </div>
        </div>
      </section>

      {/* Oversized T-Shirt Slider */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <OversizedTShirtSlider />
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <ImageSlider />
      </section>

    </div>
  );
};

export default Home;
