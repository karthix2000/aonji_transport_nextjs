"use client"
import React from 'react'
import { useEffect,useState } from 'react';
import IntimeTruck from '../../../public/assets/intime.svg'
import { BsFillClockFill } from "react-icons/bs";
import { motion } from 'motion/react';
import Image from 'next/image';


const AnimatedIntime = () => {
     const [scrolly, setScrollY] = useState(0);
    
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
    
      useEffect(() => {
        // Add event listener for scroll
        window.addEventListener("scroll", handleScroll);
    
        // Clean up event listener on component unmount
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
      // Set the movement based on the scroll position
      const clockMovement = scrolly * 0.1; // Controls how fast ellipse moves
      const truckMovement = scrolly * 0.15; // Controls how fast truck moves
    




  return (
    <>

        <div className=' relative w-[340px] h-40 mx-4 md:w-[440px] md:h-[240px] ' >

        <motion.div
        className="absolute"
        style={{willChange:'transform'}}
        animate={{x:clockMovement}}
        transition={{type:'spring',stiffness:20}}

        >
          <BsFillClockFill className=" lg:translate-x-36 w-40 h-auto lg:w-60 lg:h-auto text-blue-600  " />
        </motion.div>

        <motion.div
        
        className="absolute z-20 " // Ensure truck is on top using z-index
         style={{ willChange: 'transform' }}
         animate={{ x: -truckMovement,}}
         transition={{ type: 'spring', stiffness: 20 }}
       >
        <Image src={IntimeTruck} className=" translate-x-32 translate-y-8 lg:translate-y-16 lg:w-80 lg:h-auto " alt=""  />
       </motion.div>


        </div>


    </>
  )
}

export default AnimatedIntime