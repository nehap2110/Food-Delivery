import { MoveLeft, MoveRight } from "lucide-react";
import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AppContext } from "../context/AppContext";

const FeaturedProducts = () => {
  const { addToCart, addingStates, backendUrl, food_list, isLoading } =
    useContext(AppContext);
  const sliderRef = useRef(null);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: null,
    prevArrow: null,
    dots: true,
    dotsClass: "slick-dots",
    customPaging: function (i) {
      return <div className="w-2 h-2 bg-amber-600 rounded-full mt-4"></div>;
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="relative my-16 md:my-24 lg:my-32">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 lg:px-20 mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-Outfit font-extrabold text-amber-950 mb-4 sm:mb-0">
          Featured Products
        </h2>
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="p-3 border border-amber-300 rounded-full text-amber-700 hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            <MoveLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 border border-amber-300 rounded-full text-amber-700 hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            <MoveRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-8 lg:px-20 mt-10 md:mt-16 lg:mt-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl text-amber-800 font-Outfit">Loading products...</p>
          </div>
        ) : food_list && food_list.length > 0 ? (
          <div className="featured-products-slider">
            <Slider {...settings} ref={sliderRef}>
              {food_list && food_list.length > 0 && food_list.slice(5, 15).map((item, i) => (
                item && (
                  <div key={i} className="px-3 py-2">
                    <div className="bg-white rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                      <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
                        <img
                          src={item?.image || assets.placeholder_image}
                          alt={item?.name || 'Product'}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-grow p-4">
                        <h3 className="text-amber-950 font-Outfit font-semibold text-lg sm:text-xl text-center mb-2 leading-tight">
                          {item?.name || 'Product Name'}
                        </h3>
                        <div className="flex justify-center gap-4 w-full items-center mb-4 transition-all duration-200">
                          <p className="text-amber-600 text-lg sm:text-xl font-Outfit font-bold">
                            {(item?.discount || 0).toFixed(2)} <span className="text-sm font-normal">INR</span>
                          </p>
                          <p className="text-neutral-400 text-base sm:text-lg font-Outfit font-medium line-through">
                            {(item?.price || 0).toFixed(2)} <span className="text-sm font-normal">INR</span>
                          </p>
                        </div>
                        <button
                          className="w-full px-6 py-3 rounded-full bg-amber-600 text-base sm:text-lg text-white font-Outfit font-medium hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                          onClick={() => item?._id && addToCart(item)}
                        >
                          {item?._id && addingStates[item._id] ? "Adding..." : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </Slider>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl text-amber-800 font-Outfit">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
