import React, { useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css"; // Import updated styles

const oversizedTShirts = [
  { id: 1, name: "Social dilemma", image: "/images/DSC00135.jpg", link: "/product/1" },
  { id: 2, name: "Solids", image: "/images/DSC09996.jpg", link: "/product/2" },
  { id: 3, name: "Redbull", image: "/images/DSC09491.jpg", link: "/product/3" },
  //{ id: 4, name: "Classic White Tee", image: "/images/DSC09993.jpg", link: "/product/4" },
  //{ id: 5, name: "Vintage Wash Tee", image: "/images/DSC09491.jpg", link: "/product/5" },
  // { id: 6, name: "Classic White Tee", image: "/images/DSC09993.jpg", link: "/product/6" },
];

const OversizedTShirtSlider = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<Slider | null>(null); 

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1.5, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // ✅ Fixed: Ensure TypeScript recognizes `slickNext`
  const handleMouseEnter = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...sliderSettings}>
        {oversizedTShirts.map((shirt) => (
          <div
            key={shirt.id}
            className="shirt-card"
            onClick={() => navigate(shirt.link)}
            onMouseEnter={handleMouseEnter} // Slide when hovering
          >
            <img src={shirt.image} alt={shirt.name} className="shirt-image" />
            <h3 className="shirt-name">{shirt.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OversizedTShirtSlider;
