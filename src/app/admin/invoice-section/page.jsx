"use client";

import React, { useState,useRef,useEffect } from "react";
import { Label, TextInput, Checkbox, Button,Alert } from "flowbite-react";


import { MdDelete,MdAddBox } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./animations.css"; 
import { AlertComponent } from "../../../components/Alert";
import { useAgencyStore } from "../../../store/agencyStore";


import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";




const InvoicePage = () => {



  const refs = useRef([]);
  const fetchAgencies = useAgencyStore((state)=>state.fetchAgencies)
  const getAgencyNameByCity = useAgencyStore((state)=>state.getAgencyNameByCity)

  
  

  

  const [perticularConsigneeDetails, setPerticularConsigneeDetails] = useState([
    {  numOfParcels: "", type: "", name: "",address:"",phone:"",amount:"" },
  ]);

  const [consignerDetails,setConsignerDetails]= useState({
    name:"",phone:"",address:""
  })

  

  const date = new Date
 
  const [alertFlag,setAlertFlag] = useState(false)


  const handleAddField = () => {
    setPerticularConsigneeDetails([
      ...perticularConsigneeDetails,
      { numOfParcels: "", type: "", name: "",address:"",phone:"",amount:""  },
    ]);
  };

  const handleRemoveField = (index) => {
    const updatedDetails = perticularConsigneeDetails.filter((_, i) => i !== index);
    setPerticularConsigneeDetails(updatedDetails);
  };

  const handlePerticularConsigneeDetailsInputChange = (index, name, value) => {
    const updatedDetails = [...perticularConsigneeDetails];
    updatedDetails[index][name] = value;
    setPerticularConsigneeDetails(updatedDetails);
  };

  

  const [bill,setBill] = useState({
    
    date:date.toLocaleDateString("hi-IN"),
    from:"proddatur",
    to:"",
    
    consigner:consignerDetails,
    totalNumOfParcels:"",
    totalAmount:"",
    paymentStatus:false,
    deliveryStatus:false,
    consignees:perticularConsigneeDetails,
    agencyName:"",
    description:""

    
  })
  
 useEffect(()=>{
  async function fetchData() {
    const r = await fetchAgencies()
  }
  fetchData()
 },[])

  useEffect(() => {
    

    const totalAmount = bill.consignees.reduce((accumlator,item)=>accumlator+ (parseFloat(item.amount)||0)  ,0)
    const totalParcels = bill.consignees.reduce((accumlator,item)=>accumlator+ (parseFloat(item.numOfParcels)||0)  ,0)
    
    

    setBill((prevBill) => ({ ...prevBill,totalAmount:totalAmount,totalNumOfParcels:totalParcels, consignees: perticularConsigneeDetails ,consigner:consignerDetails}));
    
    
   
    
  }, [perticularConsigneeDetails,consignerDetails,bill.consignees]);



  const handleBillInputChange = (name, value) => {
    setBill((prevBill) => ({ ...prevBill, [name]: value }));
  };

  const handleConsignerDetailsInputChange = (name,value)=>{
      setConsignerDetails((prevBill)=>({...prevBill,[name]:value}))
  }


 

  // const handleSubmit = () => {
  //   console.log("Submitted Data total parcels:", parseFloat(bill.totalParcels) );
  //   //console.log("Submitted Data perticulars:", perticularDetails);
  //   console.log("Submitted  perticulars parcels:", perticularConsigneeDetails.reduce((accumulator, currentObj) => {
  //     return accumulator + parseFloat(currentObj.numOfParcels) ; // Add the value of 'value' key from each object
  //   }, 0));

  //   checkParcels()
    
    
    
   
  //   // Perform submission logic here
  // };

  const columns = [
    {
      id: "consigneeName",
      label: "Consignee",
    },
    {
      id: "parcels",
      label: "Parcels",
    },
    {
      id: "type",
      label: "Type",
    },
    {
      id: "adress",
      label: "Address",
    },
   
  ];

    // const checkParcels = ()=>{

    //   const totalParcels = parseFloat(bill.totalParcels)
    //   const totalPerticularParcels = perticularConsigneeDetails.reduce((accumulator, currentObj) => {
    //     return accumulator + parseFloat(currentObj.numOfParcels ) ; // Add the value of 'value' key from each object
    //   }, 0)

    //   if(totalParcels!==""){
    //     if(totalParcels!=totalPerticularParcels){
         
    //       setAlertFlag(true)
         
         
            
    //     }else{
    //       setAlertFlag(false)
    //     }
    //   }
    //   }

    const fetchAgencyName = ()=>{
      const getAgency = getAgencyNameByCity(bill.to)[0]

      
        
         handleBillInputChange("agencyName",getAgency)
    }

    const handleSubmit = async ()  =>{
    

        
        //const res = await fetch("http://localhost:4000/bills/",{method:"POST",body:JSON.stringify(bill)}).then(res=> console.log(res.json))
        
        
        
        fetchAgencyName()
         console.log(bill)
       


        
    }

    const parcelTypes = ["N/A","AC","Air Cooler","Tyres","Refridgerator","Plastic bag","Medical box","Gunny bag",]
    

  return (
    <>
     {alertFlag?<AlertComponent color={"warning"} messageHead={"Check Parcels!"} message={"Check Total and Perticular's parcels before submiting..."} />:<></>}
     
      <section className="grid gap-8 m-5 lg:grid-cols-3 md:grid-cols-3">
        {/* Invoice Form */}
        <form className="col-span-1 md:col-span-2 lg:col-span-2" onSubmit={handleSubmit} >
          <div>
            <Label htmlFor="to" className="text-lg" value="TO" />
            <select
                        id={`type-${bill.to}`}
                        className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-[41px] lg:h-[33px]  p-1"
                        value={bill.to}
                        onChange={(e) =>{
                          handleBillInputChange( "to", e.target.value),fetchAgencyName() }
                        }
                      >
                        <option value="">Select Destination</option>
                        <option value="kadapa">Kadapa</option>
                        <option value="tadipatri">Tadipatri</option>
                        <option value="nandyala">Nandyala</option>
                        <option value="kurnool">Kurnool</option>
                        <option value="dharmavaram">Dharmavaram</option>
                        <option value="gooty">Gooty</option>
                    
                      </select>
          </div>

          <div className="grid  grid-cols-6 gap-2 h-16 " >
            <div className="col-span-2" >
            <Label htmlFor="consigner" className="text-md" value="Consigner" />
            <TextInput
              id="consigner"
              type="text"
              color="blue"
              sizing="sm"
              className="mb-5"
              value={bill.consigner.name}
              onChange={(e)=>{handleConsignerDetailsInputChange("name",e.target.value)}}
             
            />
            </div>

            <div className="col-span-1" >
            <Label htmlFor="consigner" className="text-md" value="Phone" />
            <TextInput
              id="consignerPhone"
              type="tel"
              color="blue"
              sizing="sm"
              className="mb-5"
              maxLength={13}
              value={consignerDetails.phone}
              onChange={(e)=>{handleConsignerDetailsInputChange("phone",e.target.value)}}
              
            />
              </div>


              <div className="col-span-3" >
            <Label htmlFor="consigner" className="text-md" value="Address" />

            <TextInput
              id="consignerAddress"
              type="text"
              color="blue"
              sizing="sm"
              className="mb-5"
              placeholder="Ex:10/34 street city state pincode"
              value={consignerDetails.address}
              onChange={(e)=>{handleConsignerDetailsInputChange("address",e.target.value)}}
              
            />
              </div>




            
          </div>

         

          <div className="grid grid-cols-3 gap-2 h-20 " >
            <div>
            <Label
              htmlFor="total-parcels"
              className="text-md"
              value="Total Parcels"
            />
            <TextInput
              id="total-parcels"
              color="blue"
              type="number"
              min={1}
              sizing="sm"
              className="mb-5"
              value={bill.totalNumOfParcels}
              onChange={(e)=>{handleBillInputChange("totalNumOfParcels",e.target.value)}}
              
            />
            </div>
            <div>
            <Label
                htmlFor="total-amount"
                className="text-md font-normal"
                value="Total Amount"
              />
              <TextInput
                id="total-amount"
                type="number"
                min={0}
                className="mb-10"
                sizing="sm"
                color="blue"
                addon={<span className="font-sans font-semibold">&#8377;</span>}
                value={bill.totalAmount}
                onChange={(e)=>{handleBillInputChange("totalAmount",e.target.value)}}

                
              />
            </div>
            <div className="flex justify-start items-center  mb-4 " >
            <Checkbox
                id="paymentStatus"
                className="h-6 w-6  "
                color="blue"
                checked={bill.paymentStatus}
                onChange={(e)=>{handleBillInputChange("paymentStatus",!bill.paymentStatus)}}
                
              />
              <Label htmlFor="paymentStatus" className="ml-2 text-lg">
                Payment Status
              </Label>
            </div>
          </div>

        
           

          {/* Particular Details */}
          <TransitionGroup className="space-y-4 bg-slate-200 p-2 h-80 overflow-y-auto rounded-md">
            {perticularConsigneeDetails.map((detail, index) => {
              const nodeRef = refs.current[index] || React.createRef();
              refs.current[index] = nodeRef;

              return (
                <CSSTransition
                  key={index}
                  timeout={300}
                  classNames="fade"
                  nodeRef={nodeRef}
                >
                  <div ref={nodeRef} className="grid grid-cols-12 gap-1">
                    {/* Details Fields */}
                    {/* Add and Remove Buttons */}
                    {/* consignee */}
                    <div className="col-span-2">
                      <Label
                        htmlFor={`parcels-${index}`}
                        className=" text-xs lg:text-sm"
                        value="consignee"
                      />
                      <TextInput
                        color="blue"
                        id={`consignee-${index}`}
                        type="text"
                       
                        sizing="sm"
                        placeholder="consignee name "
                        value={perticularConsigneeDetails[index].name}
                        onChange={(e)=>{handlePerticularConsigneeDetailsInputChange(index,"name",e.target.value)}}
                     
                        
                      />
                    </div>
                    {/* consignee phone */}
                    <div className="col-span-2">
                      <Label
                        htmlFor={`parcels-${index}`}
                        className=" text-xs lg:text-sm"
                        value="Phone"
                      />
                      <TextInput
                        color="blue"
                        id={`consignee-${index}`}
                        type="tel"
                       
                        sizing="sm"
                        placeholder="consignee phone"
                        value={perticularConsigneeDetails[index].phone}
                        onChange={(e)=>{handlePerticularConsigneeDetailsInputChange(index,"phone",e.target.value)}}
                       
                      />
                    </div>
                    {/* no of parcels */}
                    <div className="col-span-1">
                      <Label
                        htmlFor={`parcels-${index}`}
                        className=" text-xs lg:text-sm"
                        value="Parcels"
                      />
                      <TextInput
                        color="blue"
                        id={`parcels-${index}`}
                        type="number"
                        min={1}
                        sizing="sm"
                        placeholder="Number of parcels"
                        value={perticularConsigneeDetails[index].numOfParcels}
                        onChange={(e)=>{handlePerticularConsigneeDetailsInputChange(index,"numOfParcels",e.target.value)}}
                       
                      />
                    </div>

                    {/* Type */}
                    <div className="col-span-2">
                      <Label
                        htmlFor={`type-${index}`}
                        className=" text-xs lg:text-sm"
                        value="Type"
                      />
                      <select
                        id={`type-${index}`}
                        className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-[41px] lg:h-[33px]  p-1"
                        value={perticularConsigneeDetails[index].type}
                        onChange={(e) =>
                          handlePerticularConsigneeDetailsInputChange(index, "type", e.target.value)
                        }
                      >
                        {parcelTypes.map((value,index)=>(
                          <option key={index} value={value} >{value}</option>
                        ))}

                      </select>
                    </div>
                    {/* amount */}
                    <div className="col-span-1">
                      <Label
                        htmlFor={`parcels-${index}`}
                        className=" text-xs lg:text-sm"
                        value="Amount"
                      />
                      <TextInput
                        color="blue"
                        id={`parcels-${index}`}
                        type="number"
                        min={1}
                        sizing="sm"
                        placeholder="rupees"
                        value={perticularConsigneeDetails[index].amount}
                        onChange={(e)=>{handlePerticularConsigneeDetailsInputChange(index,"amount",e.target.value)}}
                       
                      />
                    </div>

                    {/* address */}
                    <div className="col-span-3">
                      <Label
                        htmlFor={`consignee-${index}`}
                        className=" text-xs  lg:text-sm"
                        value="Address"
                      />
                      <TextInput
                        color="blue"
                        id={`consignee-${index}`}
                        type="text"
                        sizing="sm"
                        placeholder="Ex:10/34 street city state pincode"
                        value={perticularConsigneeDetails[index].address}
                        onChange={(e) =>
                          handlePerticularConsigneeDetailsInputChange(index, "address", e.target.value)
                        }
                      />
                    </div>

                    {/* Add & Remove Buttons */}
                    <div className="col-span-1 flex items-center mt-6 gap-1">                     
                      {index === perticularConsigneeDetails.length - 1 && (
                        <Button
                          color="blue"
                          size="sm"
                          onClick={handleAddField}
                          className="h-8 w-10 flex items-center justify-center"
                        >
                          <IoMdAddCircle size={20} />
                        </Button>
                      )}
                      {perticularConsigneeDetails.length > 1 && (
                        <Button
                          color="failure"
                          size="sm"
                          onClick={() => handleRemoveField(index)}
                          className="  lg:h-8  w-10 flex items-center justify-center"
                        >
                          <MdDelete size={20} />
                        </Button>
                      )}
                    </div>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>

          {/* Submit Button */}
          <div className="flex justify-end gap-1 mt-4">

          <button  onClick={handleSubmit} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
            <button type="button" className="text-white bg-gradient-to-br from-blue-800 to-blue-500 hover:bg-gradient-to-r focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Print</button>


          </div>
        </form>

        {/* Bill Preview */}
        <div className="   bg-slate-50 border border-gray-300 shadow-lg rounded-lg p-5">
          <h1 className="text-2xl font-mono mb-5">Bill Preview : </h1>

          <p className="font-mono" >Date: {  date.toLocaleDateString("hi-IN") } </p>
          <p className="font-mono" >To: {bill.to}</p>
          <p className="font-mono" >Consigner: <span>{bill.consigner.name} </span>   <span>    Phone: {bill.consigner.phone} </span> </p>         
          <p className="font-mono" >Total Amount: <span>{bill.totalAmount} Rupees </span> <span> {bill.paymentStatus?<span>paid</span>:<span> To Pay </span> } </span> </p>
          <p className="font-mono" >Total Parcels: <span>{bill.totalNumOfParcels} </span> </p>

         

              <h1 className=" flex justify-center   text-xl font-mono font-semibold  " >Particulars</h1>

          <Table aria-label="bill-perview" className="font-mono" >
            <TableHeader columns={columns}>
             
               <TableColumn>Consignee</TableColumn>
                <TableColumn>Parcels</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Amount</TableColumn>
                

             
            </TableHeader>
           
            <TableBody>
        {perticularConsigneeDetails.map((data, index) => (
          <TableRow className="border-b-2" key={index}>
             <TableCell key={`${index}-consignee`}>
              {data.name}
            </TableCell>
            <TableCell key={`${index}-numOfParcels`}>
              {data.numOfParcels}
            </TableCell>
            <TableCell key={`${index}-type`}>{data.type}</TableCell>

            <TableCell key={`${index}-amount`}>
              {data.amount}
            </TableCell>
           
          </TableRow>
          
        ))}
        
      </TableBody>
           





           
          </Table>
        </div>
        
      </section>
     
    </>
  );
};

export default InvoicePage;