import React from "react";
import DynamicBg from "../components/DynamicBg";
import Features from "../components/Features";
import AboutHead from "../components/AboutHead";
import Experts from "../components/Experts";
import { AnimatedTestimonials } from "../components/ui/Animated-Testimonials";
import { testimonials } from "../assets/assets";

const About = () => {
  return (
    <>
      <DynamicBg title={"About Us"} />
      <AboutHead />
      <Features />
      <Experts />
      <div className="">
        <div>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </>
  );
};

export default About;
