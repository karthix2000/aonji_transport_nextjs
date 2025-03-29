"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import { useParams, notFound, redirect,useRouter } from "next/navigation";
import {useAgencyStore,useAgencyDeleteModal,useAgencyEditModal} from '../../../../store/agencyStore'
import AgencyDeleteModal from '../components/AgencyDeleteModal';
import AgencyEditModal from '../components/AgencyEditModal';



const AgencyPage = () => {

  

  

    const {id} = useParams()
    const{agencies,fetchAgencies,} = useAgencyStore()
    const { openModal } = useAgencyDeleteModal();
    const { openModal: openEditModal } = useAgencyEditModal();
    const [agency,setAgency]=useState(null)

    useEffect(() => {
        if (agencies.length === 0) {
          fetchAgencies();
        } else {
          const foundAgency = agencies.find((item) => item.id.toString() === id);
          setAgency(foundAgency);
        }
      }, [id, agencies, fetchAgencies]);

      if (!agency) return <p>Loading...</p>;

     

  return (
    <>
   
   <div className='w-auto h-auto bg-blue-800 m-2 gap-1 p-2 md:p-3 rounded-t-lg grid grid-cols-6   ' >

    <div className=' text-white font-bold  col-span-2 ' >

     <div className=' text-xs md:text-3xl' >{agency.name} </div>
     <div className='text-xs md:text-xl' >{agency.city} </div>
    
    </div>

    <div className='text-white font-bold text-xs md:text-2xl col-span-1 ' >
      <div>Trips</div>
      <div > {agency.trips} </div>
    </div>

    <div className='text-white font-bold text-xs md:text-2xl col-span-1 ' >
      <div>Amount</div>
      <div > {agency.amount} </div>
    </div>

    <div className='text-white font-bold text-xs md:text-2xl col-span-1 ' >
      <div>Our Share</div>
      <div > {agency.ourShare} </div>
    </div>

    <div className='text-white font-bold text-xs md:text-2xl col-span-1 ' >
      <div>Agent Share</div>
      <div > {agency.agentShare} </div>
    </div>





   </div>

 

   <div className=' w-auto h-auto p-4 bg-slate-100 border-2 border-gray-400 rounded-b-lg m-2  ' >


      <div className='flex justify-center md:justify-start' >

     
      <div >
       
       <p className='font-bold text-2xl ' >Address & Info </p>

       <div className='text-xl' >

        <p>Phone : <span> {agency.phone} </span> </p>
        <p>City : <span> {agency.city} </span> </p>
        <p>Street : <span> {agency.street} </span> </p>
        <p>District : <span> {agency.district} </span> </p>
        <p>State : <span> {agency.state} </span> </p>
        <p>Pincode : <span> {agency.pincode} </span> </p>
        

        


       </div>

      
      


      </div>

      </div>
      <div className=' flex justify-end gap-5 text-xl  ' >
        
      <div onClick={ ()=>{openModal(agency.id)}       } className='text-rose-500 hover:cursor-pointer hover:underline ' >Delete</div>
      <div onClick={()=>{openEditModal(agency)}} className='text-blue-500 hover:cursor-pointer hover:underline ' > Edit </div>
      

      </div>

   </div>




  

   
   
 <AgencyDeleteModal/>
 <AgencyEditModal/>
   


    </>
  )
}

export default AgencyPage