import React, { useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css"; 

const oversizedTShirts = [
  { id: 1, name: "Our Graphics Tee's", image: "/images/DSC00135.jpg", link: "/product/1" },
  { id: 2, name: "Solids", image: "/images/DSC09996.jpg", link: "/product/6" },
  { id: 3, name: "Redbull", image: "/images/DSC09491.jpg", link: "/product/3" },
  
];  

const OversizedTShirtSlider = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<Slider | null>(null); 

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 1800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
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
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate(shirt.link);
            }}
            // onClick={() => navigate(shirt.link)}
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
