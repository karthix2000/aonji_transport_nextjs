"use client";
import React from "react";
import safeTruck from "../../../public/assets/safeandsecure.svg";
import Image from "next/image";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SafeteyAnimated = () => {
  const [scrollShield, setScrollShield] = useState(0);

  const handleScroll = () => {
    setScrollShield(window.scrollY);
  };

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set the movement based on the scroll position
  const shieldMovement = scrollShield * -0.1; // Controls how fast ellipse moves
  const truckMovement = scrollShield * 0.15; // Controls how fast truck moves
  

  return (
    <>
      <div className="  relative w-[340px] h-40 mx-4 md:w-[440px] md:h-[240px] ">
        <motion.div
        className="absolute"
        style={{willChange:'transform'}}
        animate={{x:shieldMovement}}
        transition={{type:'spring',stiffness:20}}

        >
          <AiFillSafetyCertificate className=" translate-x-28 w-44 h-auto lg:translate-x-4 lg:w-60 lg:h-auto text-blue-600  " />
        </motion.div>
        <motion.div
        
        className="absolute z-20 " // Ensure truck is on top using z-index
         style={{ willChange: 'transform' }}
         animate={{ x: truckMovement,}}
         transition={{ type: 'spring', stiffness: 20 }}
       >
        <Image src={safeTruck} className=" translate-y-8 lg:translate-y-16 lg:w-80 lg:h-auto " alt=""  />
       </motion.div>
      </div>
    </>
  );
};

export default SafeteyAnimated;
