"use client"
import React from "react";
import Header from "../components/Header.jsx";
import AnimatedTruck from "../components/animated/AnimatedTruck.jsx";
import AnimatedSaftey from "../components/animated/AnimatedSaftey.jsx";
import AnimatedIntime from "../components/animated/AnimatedIntime.jsx";
import AnimatedFairPrice from "../components/animated/AnimatedAffordablePrice.jsx";
import Lottie from "lottie-react";

import Footer from "../components/Footer.jsx"
import animationDataGrow from "../../public/assets/animations/gain-profit.json";
import animationDataFemaleInvestor from "../../public/assets/animations/female-investors.json";
import animationDataFirst from "../../public/assets/animations/first-place-badge.json";
import loadingAnimationData from "../../public/assets/animations/aonjiLoading.json"
import { useState,useEffect } from "react";





const homePage = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loading animation after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); // Change 3000 to the desired duration in milliseconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);


  if (loading ) {
    return <div className="w-full h-[calc(100vh-62px)] gap-5 flex flex-col justify-center items-center"  >
    <div className=" flex   justify-center items-center" >
            <Lottie
            animationData={loadingAnimationData}
            loop={true}
            className="flex justify-center items-center w-64 h-auto lg:w-[484px] lg:h-auto "
            alt="loading"
            
            />
      </div>
      <div>
        Loading...
      </div>
    </div>
       // You can replace this with a spinner or fallback UI
  }
  



  return (
    <>
      <Header />

      {/* section-1   */}
      <section className=" grid gap-8 md:grid-cols-2 lg:grid-cols-2 md:m-10 lg:mt-12 overflow-x-clip ">
        <div className="flex  justify-center items-center ">
          <div className=" w-auto h-auto p-2 ">
            <h1 className=" font-bebas font-extrabold text-2xl text-indigo-800 tracking-wider lg:text-5xl  ">
              Discover The Seamless Logistics Experiance.
            </h1>
            <p className="font-roboto text-xl ">
              Aonji Transport is your go-to parcel transport company with over
              15 years of proven expertise in delivering excellence. With a
              dedicated focus on safe and secure delivery, timely shipments, and
              cost-efficient services, we empower businesses across industries.
              Our commitment has earned us the loyalty of 23 leading enterprises
              as regular customers.
            </p>
            <div className="flex gap-2 my-2 lg:my-8 ">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium font-roboto rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Explore our services
              </button>
              <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border font-roboto border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Contact
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <AnimatedTruck />
        </div>
      </section>

      <h1 className="text-gray-600 my-4 mx-2 md:m-10 lg:m-12  text-3xl  font-roboto  ">
        Why choose us?
      </h1>

      {/* section-2 seaftey and secure  */}

      <section className="grid  lg:gap-8 md:grid-cols-2 lg:grid-cols-2 md:m-10 lg:mt-12 overflow-x-clip ">
        <div className="flex justify-center items-center order-last md:order-first lg:order-first ">
          <AnimatedSaftey />
        </div>

        <div className=" w-auto h-auto p-2 sm:order-first ">
          <h1 className=" font-bebas font-extrabold text-2xl text-indigo-800 tracking-wider lg:text-5xl  ">
            Safe & Secure
          </h1>
          <p className="font-roboto text-xl ">
            Your parcels are our priority. We take every measure to ensure your
            packages are handled with the utmost care and delivered safely to
            their destination.
          </p>
        </div>
      </section>

      {/* section 3 intime delivery */}

      <section className="grid  lg:gap-8 md:grid-cols-2 lg:grid-cols-2 md:m-10 lg:mt-12 overflow-x-clip ">
        <div className="w-auto h-auto p-2">
          <h1 className=" font-bebas font-extrabold text-2xl text-indigo-800 tracking-wider lg:text-5xl  ">
            Timely Delivery
          </h1>
          <p className="font-roboto text-xl ">
            We value your time. Our streamlined logistics and dedicated team
            ensure that your parcels reach their destination promptly without
            unnecessary delays.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <AnimatedIntime />
        </div>
      </section>

      {/* section-4 fair prices */}

      <section className="grid  lg:gap-8 md:grid-cols-2 lg:grid-cols-2 md:m-10 lg:mt-12 overflow-x-clip ">
        <div className="flex justify-center items-center order-last md:order-first lg:order-first ">
          <AnimatedFairPrice />
        </div>

        <div className=" w-auto h-auto p-2">
          <h1 className=" font-bebas font-extrabold text-2xl text-indigo-800 tracking-wider lg:text-5xl  ">
            Fair Charges
          </h1>
          <p className="font-roboto text-xl ">
            At Aonji Parcel Services, we offer competitive rates without
            compromising on the quality of our services. We believe in providing
            value for your money.
          </p>
        </div>
      </section>

      {/* emopowering business */}

      <section className="grid my-3 lg:gap-8 md:grid-cols-2 lg:grid-cols-2 md:m-10 lg:mt-12 overflow-x-clip ">
        <div className="w-auto h-auto p-2">
          <h1 className=" font-bebas font-extrabold text-2xl text-indigo-800 tracking-wider lg:text-5xl  ">
            Empowering Businesses Across Industries
          </h1>
          <p className="font-roboto text-xl ">
            At Aonji Transport, we don't just move parcels; we drive business
            success. Our reliable and efficient transport solutions enable
            companies to meet their logistical challenges with confidence.
            Whether you're a startup or a large enterprise, our services adapt
            to your unique needs.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Lottie
            animationData={animationDataGrow}
            loop={true}
            className=" flex justify-center items-center lg:h-72 lg:w-auto"
            alt="grow"
          />
        </div>
      </section>

      {/* exellence */}

      <section className="grid my-3 lg:gap-8 md:grid-cols-2 lg:grid-cols-2 md:m-10 lg:mt-12 overflow-x-clip ">
        <div className="w-auto h-auto p-2  ">
          <h1 className=" font-bebas font-extrabold text-2xl text-indigo-800 tracking-wider lg:text-5xl  ">
            Our Mission: Delivering Excellence
          </h1>
          <p className="font-roboto text-xl ">
            Aonji Transport is driven by the mission to redefine parcel
            transportation. By focusing on safety, timeliness, and
            affordability, we aim to build lasting partnerships with businesses,
            helping them achieve their goals.
          </p>
        </div>

        <div className="flex justify-center items-center lg:order-first   ">
          <Lottie
            animationData={animationDataFirst}
            loop={true}
            className="flex justify-center items-center w-60 h-auto lg:w-72 lg:h-auto "
            alt="grow"
          />
        </div>
      </section>

      <section>
        <div className="w-auto h-auto p-2 lg:p-12 md:p-10  ">
          <h1 className=" font-bebas font-extrabold text-2xl text-indigo-800 tracking-wider lg:text-5xl  ">
            Get Started with Aonji Transport Today
          </h1>
          <p className="font-roboto text-xl ">
            Partner with Aonji Transport for all your parcel delivery needs.
            Experience the difference of working with a team dedicated to
            quality, efficiency, and customer satisfaction. Contact us now to
            discover how we can streamline your logistics.
          </p>
        </div>
      </section>

        

       <Footer /> 
    </>
  );
};

export default homePage;
