"use client";
import { MdAddBusiness } from "react-icons/md";



import { useEffect } from "react";
import Link from "next/link";
import { useAgencyStore } from "../../../store/agencyStore";
import AgencyCard from "@/components/AgencyCard";


const page = () => {

  const { agencies,fetchAgencies } = useAgencyStore();

  useEffect(() => {

    fetchAgencies();
    
    
  }, []);

  return (
    <>
    <div className=" flex justify-end m-4 sticky top-16 " >

   
      <div className=" grid grid-flow-col  w-fit p-2 rounded-md  items-center bg-blue-900 shadow-2xl hover:cursor-pointer  ">
        <MdAddBusiness size={30} color="white" />
        <div
          className="text-white font-bold"
          onClick={() => {
            console.log(agencies);
          }}
        >
          Add Agent
        </div>
      </div>
      </div>

      {agencies.map((item, index) => (
        <div key={item.id}  >
        <Link href={`/admin/agencies/${item.id}/`} >
        <AgencyCard
          key={item.id}
          agencyName={item.name}
          city={item.city}
          amount={item.amount}
          trips={item.trips}
          ourShare={item.ourShare}
          agentShare={item.agentShare}
          
        />
        </Link>
        </div>
      ))}
    </>
  );
};

export default page;
