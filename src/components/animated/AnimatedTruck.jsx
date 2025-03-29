"use client"
import Image from "next/image"
import ellipse from '../../../public/assets/Ellipse.svg'
import truck from '../../../public/assets/trucksvg.svg'
import { motion } from 'framer-motion';
import { useEffect,useState } from "react";


const AnimatedTruck = () => {

    const [scrollY,setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      useEffect(() => {
        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll);
    
        // Clean up event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
      // Set the movement based on the scroll position
      const ellipseMovement = scrollY * 0.2; // Controls how fast ellipse moves
      const truckMovement = scrollY * 1;  // Controls how fast truck moves
      const truckZoom = 1 + scrollY * 0.001;
  return (
    <>
    <div className='relative w-[340px] h-[300px] mx-4 md:w-[440px] md:h-[400px] ' >
        

            <motion.div
            
            className="absolute"
            style={{willChange:'transform'}}
            animate={{x:ellipseMovement}}
            transition={{type:'spring',stiffness:20}}

            >
            <Image src={ellipse} alt="img" className=" w-[300px] lg:w-[510px] " />
            </motion.div>


        <motion.div
        
         className="absolute z-10" // Ensure truck is on top using z-index
          style={{ willChange: 'transform' }}
          animate={{ x: -truckMovement,scale:truckZoom,transition:'linear'}}
          transition={{ type: 'spring', stiffness: 20 }}
        >
        <Image src={truck} className="w-52 translate-x-32 translate-y-12  lg:translate-x-28 lg:translate-y-10 lg:w-96 " alt="img" />
        </motion.div>
       
        </div>
    
    
    </>
  )
}

export default AnimatedTruck