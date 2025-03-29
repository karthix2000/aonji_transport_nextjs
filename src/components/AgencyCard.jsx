import React from 'react'

const AgencyCard = ({agencyName,city,trips,amount,ourShare,agentShare}) => {

  return (
    <>
    
    <div className="w-auto h-auto rounded-xl bg-gradient-to-r from-blue-800 to-blue-600 active:from-blue-600 active:to-blue-800  m-4 p-3 grid grid-cols-3 gap-4 hover:cursor-pointer hover:shadow-2xl ">
        <div className="  text-white font-bold text-sm md:text-3xl lg:text-3xl  col-span-1 "> 
          <div className=" truncate" >
          {agencyName} 
          <p className="  text-sm md:text-xl  "> {city} </p>
          </div>
            </div>


            <div className="grid grid-flow-col gap-4" >
            <div className=" flex flex-col   text-white font-bold text-sm md:text-3xl lg:text-3xl col-span-1 ">
            Trips
            <p className="  text-sm md:text-3xl   ">{trips} </p>

        </div>
            <div className=" flex flex-col   text-white font-bold text-sm md:text-3xl lg:text-3xl col-span-1 ">
            Amount
            <p className="  text-xs md:text-3xl   " > {amount} </p>
        </div>
            </div>

            <div className="text-white font-bold text-sm md:text-3xl lg:text-3xl flex flex-col " >

              Share
            
            <div className="flex" >
            <p className="text-xs md:text-3xl " >{ourShare} </p>
            <p className="font-mono text-white text-xs md:text-2xl  " >-</p>
            <p className="text-xs md:text-3xl text-gray-100 opacity-50 " >{agentShare} </p>
            </div>

            </div>
       
       
        
      </div>



    
    
    </>
  )
}

export default AgencyCard