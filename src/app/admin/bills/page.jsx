"use client";

import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "./styles/dataGridStyles.css";
import useBillsStore from "../../../store/billsStore"; // Zustand Store
import { FaDownload } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";
import PDFBillListPage from "./components/PDFViewer/PDFBillListPage";
import { Modal, Button } from "flowbite-react";
import { TextInput, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

import "./styles/animations.css"
import { G } from "@react-pdf/renderer";
import Link from "next/link";

ModuleRegistry.registerModules([AllCommunityModule]);

function getYearsFromYearToCurrent(startYear) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}



const DataGrid = () => {
  const router = useRouter()
  const refs = useRef([]);
  // over all bills, current bills state
  const { bills, fetchBills, updateBill } = useBillsStore();
  // bills that are about to deliver which are got from trip. uses tripIds state to set this state
  const [deliveryBillsList,setdeliveryBillsList]=useState([])
  // unpaid bills of the deliveryBillsList state. to get total amount and total charge we use.
  const [unpaidBillsList,setUnpaidBillsList]=useState([])
  const [loading, setLoading] = useState(true);
  
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [openChargeseModal, setOpenChargesModal] = useState(false);
  const [PDFBillListPageData,setPDFBillListPageData] = useState(null)
  // bills ids are selected to set the trip
  const [tripIds,setTripIds]=useState([])

  //bills request body to get bills data from backend according to year, month, city.
  const [billsReqBody, setBillsReqBody] = useState({
    month: "",
    year: "",
    city: "",
  });


  const [outStationCharges,setOutStationCharges]=useState([{
    articles:0,
    charge:10,
    chargeAmount:0,
    addedFlag:false
  }])



  const [agencyCommissionCharges,setAgencyCommissionCharges]=useState({chargeAmount:0,chargeRate:10,addedFlag:false,})
 

 
  const [Charges,setCharges]=useState({ totalArticels:0,totalAmount:0,agencyCharges:agencyCommissionCharges,outStationCharges:outStationCharges,grandTotalChargeAmount:0,totalOutstationCharges:0,netPayableAmount:0,totalUnpaidAmount:0,driverName:"" })
 



  const handleAddOutstationCharge = (index) => {
          // Get the current charge details from the state at the given index
        const currentCharge = outStationCharges[index];

        // Check if articles and charge values are valid
        if (currentCharge.articles > 0 && currentCharge.charge > 0) {
          // Calculate the chargeAmount based on articles and charge per article
          const chargeAmount = currentCharge.articles * currentCharge.charge;

          // Update the state with the new chargeAmount and set addedFlag to true
          const updatedCharges = [...outStationCharges];
          updatedCharges[index].chargeAmount = chargeAmount; // Set calculated charge amount
          updatedCharges[index].addedFlag = true; // Mark it as added

          // Update the state with the new list
          setOutStationCharges(updatedCharges);
        } else {
          // If articles or charge are not valid, show an alert or handle error
          alert('Please ensure articles and charge values are valid');
        }
  };
 
  const handleOutstationChargesRemoveField = (index) => {
    const updatedDetails = outStationCharges.filter((_, i) => i !== index);
    setOutStationCharges(updatedDetails);
  };

  const handleOnChangeOutstationCharges = (index, name, value) => {
    const updatedDetails = [...outStationCharges];
    updatedDetails[index][name] = value;
    setOutStationCharges(updatedDetails);
  };
 
  const handleAddOutstationField = ()=>{
    setOutStationCharges(prevState=>[
      ...prevState,
      {
        articles:0,
        charge:10,
        chargeAmount:0,
        addedFlag:false
      }

    ])
  }

  

  const handleOnChangeAgencyCommisionCharges = (name, value) => {
    setAgencyCommissionCharges((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnChangeChargesInput =(name,value)=>{
    setCharges((prevState) => ({ ...prevState, [name]: value }));
  }
  useEffect(() => {
    // Calculate total outstation charges first
    const totalOutstationCharges = outStationCharges.reduce((acc, charge) => acc + charge.chargeAmount, 0);
  
    // Get the agency commission charge
    const agencyCharge = agencyCommissionCharges.chargeAmount;
  
    // Calculate the grand total charge amount
    const grandTotalChargeAmount = totalOutstationCharges + agencyCharge;
  
    // Calculate net payable amount
    const netPayableAmount = Charges.totalUnpaidAmount - agencyCharge - totalOutstationCharges;
  
    // Update charges state all at once
    setCharges((prevState) => ({
      ...prevState,
      outStationCharges: outStationCharges,
      agencyCharges: agencyCommissionCharges,
      totalOutstationCharges: totalOutstationCharges,
      grandTotalChargeAmount: grandTotalChargeAmount,
      netPayableAmount: netPayableAmount
    }));
  
    // Log the grand total charge amount
    console.log("log total charge amount", grandTotalChargeAmount);
  }, [outStationCharges, agencyCommissionCharges, Charges.totalAmount]);


  const months = [
    "january",
    "febrauary",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "november",
    "december",
  ];

  const [years, setYears] = useState([]);
  const [cities, setCities] = useState([]);
  const dateObj = new Date();

  const gridRef = useRef(null);

  useEffect(() => {
    fetchBills().then(() => setLoading(false));
  }, [fetchBills]);

 



    // Function to calculate grand total amount and total parcels
    const calculateGrandTotal = (billData) => {
      const totals = billData.reduce(
        (acc, bill) => {
          // Add total amount and total parcels from each bill
          acc.grandTotalAmount += bill.totalAmount;
          acc.grandTotalParcels += bill.totalNumOfParcels;
  
         
  
          return acc;
        },
        { grandTotalAmount: 0, grandTotalParcels: 0 }
      );
      return totals;
    };



    // setting unpaid bills list from bills
    useEffect( ()=>{

      const unpaid = deliveryBillsList?.filter(unpaidBills=>unpaidBills.paymentStatus===false)

       setUnpaidBillsList(unpaid)
      console.log("unpaid",unpaidBillsList);
      

    },[bills,deliveryBillsList])


    useEffect( ()=>{

      
      console.log("unpaid",unpaidBillsList);
      

    },[bills])


    
    

    // setting total amount from deliveryBillsList
    useEffect(() => {

      const { grandTotalAmount, grandTotalParcels } = calculateGrandTotal(deliveryBillsList);
     
      handleOnChangeChargesInput("totalAmount",grandTotalAmount)
      handleOnChangeChargesInput("totalArticels",grandTotalParcels)
      console.log(Charges);

      
       
    }, [deliveryBillsList,bills]); // ✅ Recalculate total whenever `bills` update

    // setting total unpaid amount 
    useEffect(() => {

      const { grandTotalAmount, grandTotalParcels } = calculateGrandTotal(unpaidBillsList);
      console.log("unpaid",grandTotalAmount,grandTotalParcels);
      
      handleOnChangeChargesInput("totalUnpaidAmount",grandTotalAmount)
     



      console.log(Charges);

      
       
    }, [bills,unpaidBillsList],); // ✅ Recalculate total whenever `bills` update


  const outStationChargeTableColumns = [
    {
      id:"articles",
      label:"Articels"
    },
    {
      id:"charge",
      label:"Charge"
    },
    {
      id:"chargeAmount",
      label:"Charged Amount"
    }
   
  ]

  const agencyCommissionChargesTableColumns =[
    {
      id:"totalAmount",
      label:"Total Amount"
    },
    {
      id:"chargeRate",
      label:"Charge Rate"
    },
    {
      id:"chargeAmount",
      label:"Charge Amount"
    }
  ]
  

  

  const colDefs = [
    { headerName: "ID", field: "id", width: 80, minWidth: 80, maxWidth: 80 },
    { headerName: "Date", field: "date", width: 100, minWidth: 100 },
    {
      headerName: "To",
      field: "to",
      
     
      width: 150,
      minWidth: 150,
    },
    {
      headerName: "Agency Name",
      field: "agency.name",
      width: 200,
      minWidth: 200,
    },
    {
      headerName: "Consigner Name",
      field: "consigner.name",
      width: 200,
      minWidth: 200,
    },
    {
      headerName: "Consignees",
      field: "consignees",
      minWidth: 350,
      width: 350,
      cellClass: "ag-cell-wrap-text",
      cellStyle: { whiteSpace: "normal", lineHeight: "1.5" },
      autoHeight: true,
      valueGetter: (params) =>
        params.data?.consignees
          ?.map((consignees) => consignees.name)
          .join(", ") || "N/A",
    },
    {
      headerName: "Parcels",
      field: "totalNumOfParcels",
      width: 80,
      minWidth: 80,
    },
    {
      headerName: "Delivery",
      field: "deliveryStatus",
      editable:false,
      width: 90,
      cellEditor: "agCheckboxCellEditor",
      cellRenderer: "agCheckboxCellRenderer",
      onCellValueChanged: (params) =>
        handleStatusChange(params, "deliveryStatus"),
    },
    {
      headerName: "Amount",
      field: "totalAmount",
      width: 140,
      minWidth: 140,
      valueFormatter: (params) => `₹${(Number(params.value) || 0).toFixed(2)}`,
      cellClassRules: {
        "footer-bold": (params) => params.node.rowPinned === "bottom",
      },
    },
    {
      headerName: "Payment",
      field: "paymentStatus",
      editable: true,
      minWidth: 90,
      width: 90,
      cellEditor: "agCheckboxCellEditor",
      cellRenderer: "agCheckboxCellRenderer",
      onCellValueChanged: (params) =>
        handleStatusChange(params, "paymentStatus"),
    },
    {
      headerName: "Add To Trip",
      field:"addedToTripFlag",
      editable: (params)=>{
        if(params.data.deliveryStatus===true){
          return false
        }else return true
      } ,
      minWidth: 90,
      width: 120,
      cellEditor: "agCheckboxCellEditor",
      cellRenderer: "agCheckboxCellRenderer",
      onCellValueChanged: (params) =>{
        // setting bills ids to tripsids, and setting bills data to deliveryBillsList state which are about to deliver.
        
        const { data } = params;
    
        if (params.newValue) {
          // When checkbox is checked, add to the arrays
          setTripIds(prev => [...prev, data.id]);
          setdeliveryBillsList(prev => [...prev, data]);
        } else {
          // When checkbox is unchecked, remove from the arrays
          setTripIds(prev => prev.filter(id => id !== data.id));
          setdeliveryBillsList(prev => prev.filter(bill => bill.id !== data.id));
        }
        }
      
        
        
        
    },
    {
      headerName: "View Bill",
      field: "id", // You can use the "id" field for navigation
      cellRenderer: (params) => {
        const { id } = params.data;
        // Check if the data is available
        if (id) {
          return (
            <Link legacyBehavior href={`/admin/bills/${id}`}>
              <a className="text-blue-500 underline">View Bill</a>
            </Link>
          );
        }
        return null; // In case `id` is not available or params.data is undefined
      },
    },
  ];

  // sends bills ids to backend(backend changes the bills deliveryStatus to true) and then refetch the current bills to render the changes.
  const handleSetTrip = ()=>{
      console.log("delivery list",deliveryBillsList,"trip bills ids",tripIds);
      
  }
 



  const handleStatusChange = async (params, field) => {
    const { data, newValue } = params;
    const id = data.id;
    await updateBill(id, { [field]: newValue });
    
  };

  // Function to handle row class dynamically based on status
  const getRowClass = (params) => {
    if (params.data.paymentStatus === false) {
      return "bg-gray-200 text-black"; // gray if payment is false
    }
  };

  const handleReq = () => {
    console.log(
      "req body",
      billsReqBody,
      "years",
      years,
      "find",
      "yearlent",
      years[years.length - 1]
    );
  };

  const handleReqBodyInputChange = (name, value) => {
    setBillsReqBody((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const newYears = getYearsFromYearToCurrent(2020);
    setYears(newYears);
    setBillsReqBody({
      month: months[dateObj.getMonth()],
      year: dateObj.getFullYear(),
      city: "",
    });
  }, []);

 

  if (loading || years.length === 0) {
    return <div> <div className="flex justify-center m-20 " >
      Loading...
      </div></div>; // You can replace this with a spinner or fallback UI
  }

  return (
    <>
      <div className="  flex justify-start px-4 mt-1  ">
        <form className="flex gap-1  ">
          <div className="  flex-grow gap-1 md:flex  ">
            <div>
              <label
                htmlFor="small1"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Month
              </label>

              <select
                id="small1"
                defaultValue={months[dateObj.getMonth()]}
                onChange={(e) => {
                  handleReqBodyInputChange("month", e.target.value);
                }}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                      focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {months.map((value, index) => (
                  <option key={index} value={value}>
                    {value}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="small2"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Year
              </label>

              <select
                id="small2"
                defaultValue={years.find(
                  (year) => year === dateObj.getFullYear()
                )}
                onChange={(e) => {
                  handleReqBodyInputChange("year", e.target.value);
                }}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                      focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {years.map((value, index) => (
                  <option key={index} value={value}>
                    {value}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="small2"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                To
              </label>
              <select
                id="small2"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                      focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={true}>Choose a city</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>

                  
            <div className="flex justify-center items-end mt-3 ">
              <button
                type="button"
                onClick={()=>{handleReq;console.log("charges",Charges,"dleivery bills",deliveryBillsList)}}
                className=" flex justify-center items-center my-1  h-10  text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span> Search</span>
              </button>
            </div>

            <div className="flex justify-center items-end ">
              <button
                type="button"
                onClick={() => {
                  console.log(deliveryBillsList===null?true:false)
                  
                   setOpenPdfModal( ()=>{
                     if(deliveryBillsList.length==0){
                           return false,alert("First add bills to trip to print bills.")
                     }else return true
                   } );
                 
                }}
                className=" flex justify-center my-1 items-center   h-10  text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <IoPrint size={25} /> <span> Print</span>
              </button>
            </div>

            <div className="flex gap-1 justify-center  ">
              <div className="flex justify-end items-end  ">
                <button
                  type="button"
                  onClick={() => {
                    setOpenChargesModal(true);
                  }}
                  className=" flex justify-center items-center my-1  h-10  text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <span>Charges</span>
                </button>
              </div>
            
            </div>
          </div>
        </form>
      </div>

      <div
        className="ag-theme-alpine"
        style={{
          height: 600,
          width: "100%",
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={bills}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          
          getRowClass={getRowClass}
        />
      </div>

      <hr />

      <div className=" md:flex  " >  
        
      <div className="p-4 " >
        <h1 className="font-mono text-center font-extrabold text-2xl" >OutStation Delivery Charges</h1>
      <Table aria-label="bill-perview" className="font-mono" >
                        <TableHeader  columns={outStationChargeTableColumns}>
                       
                         <TableColumn>Articels</TableColumn>
                          <TableColumn>Charge</TableColumn>
                          <TableColumn>Charged Amount</TableColumn>

                      </TableHeader>

                      <TableBody>

                      {outStationCharges.map((item,index)=>(
                        <TableRow key={index} className="border-b-2"  >
                        <TableCell className="text-center" key={`${index}-articels`} >{item.articles} </TableCell>
                        <TableCell className="text-center" key={`${index}-charge`} >₹{item.charge} </TableCell>
                        <TableCell className="text-center" key={`${index}-chargedAmount`} >₹{item.chargeAmount} </TableCell>
                        </TableRow>
                        
                      ))}

                    
                      </TableBody>
                     
                      

        </Table>
        <div className="flex justify-end p-5 font-mono font-bold " >Total:₹{Charges.totalOutstationCharges}</div>
      </div>
      <div className="p-4" >
        <h1 className="font-mono text-center font-extrabold text-2xl" >Agency Commision Charges</h1>
      <Table aria-label="bill-perview" className="font-mono" >
                        <TableHeader columns={agencyCommissionChargesTableColumns}>
                       
                         <TableColumn>Total Amount</TableColumn>
                          <TableColumn>Charge Rate</TableColumn>
                          <TableColumn>Charged Amount</TableColumn>

                      </TableHeader>

                      <TableBody>

                      
                        <TableRow  className="border-b-2"  >
                        <TableCell className="text-center"  > ₹{Charges.totalAmount}  </TableCell>
                        <TableCell className="text-center" >{agencyCommissionCharges.chargeRate}% </TableCell>
                        <TableCell className="text-center" >₹{agencyCommissionCharges.chargeAmount} </TableCell>
                        </TableRow>
                        
                     


                      </TableBody>

        </Table>
        <div className="flex justify-end p-5 font-mono font-bold " >Total:₹{agencyCommissionCharges.chargeAmount}</div>
        <div className="flex justify-end p-5 font-mono font-bold " >Grand Total:₹{Charges.totalOutstationCharges} + ₹{agencyCommissionCharges.chargeAmount} = ₹{Charges.totalOutstationCharges+agencyCommissionCharges.chargeAmount}</div>

      </div>


        <div className="flex justify-end p-5" >
        <button
                type="button"
                onClick={()=>{handleReq
                  handleSetTrip()
                }}
                className=" flex justify-center items-center my-1 px-6  h-14 text-2xl  text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  p-2.5    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span> Set Trip</span>
              </button>
        </div>
        
         </div>

      <Modal
        className="w-full h-full"
        show={openPdfModal}
        onClose={() => setOpenPdfModal(false)}
      >
        <Modal.Header>Print Bills List</Modal.Header>
        <Modal.Body>
          <PDFBillListPage BillListData={deliveryBillsList} charges={PDFBillListPageData}  />
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => {console.log(Charges,"unapid",); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={openChargeseModal}
        onClose={() => setOpenChargesModal(false)}
      >
        <Modal.Header  >Charges</Modal.Header>
        <Modal.Body>
          <div>
            <h1 className="font-semibold text-xl" >Add Driver Name</h1>
            <div>
                 
                 <TextInput
                   color="blue"
                 
                  
                   sizing="sm"
                   value={Charges.driverName}
                   onChange={(e) => handleOnChangeChargesInput("driverName",e.target.value)}
                   placeholder="Enter Driver's Name Here"
                 />
               </div>

            <h1 className="font-semibold text-xl" >Out Station Delivery Charges</h1>


            <div >
            {outStationCharges.map((data,index)=>(
               <div key={index} className="flex justify-start items-start gap-1">
               <div>
                 <Label htmlFor="" className="text-xs lg:text-sm" value="Articles" />
                 <TextInput
                   color="blue"
                   type="number"
                   min={1}
                   sizing="sm"
                   value={outStationCharges[index].articles}
                   onChange={(e) => handleOnChangeOutstationCharges(index, "articles", e.target.value)}
                   placeholder="Total no.of Articles"
                 />
               </div>

               <div>
                 <Label htmlFor="" className="text-xs lg:text-sm" value="Charge" />
                 <TextInput
                   color="blue"
                   type="number"
                   min={1}
                   sizing="sm"
                   value={outStationCharges[index].charge}
                   onChange={(e) => handleOnChangeOutstationCharges(index, "charge", e.target.value)}
                   placeholder="Charge per article"
                 />
               </div>

               <div className="flex gap-1 mt-5">
                 <button
                   className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-2 border rounded ${data.addedFlag ? "cursor-not-allowed opacity-45" : ""}`}
                   onClick={() => handleAddOutstationCharge(index)}
                 >
                   {data.addedFlag ? "Added" : "Add"}
                 </button>

                 <button
                   disabled={!data.addedFlag}
                   className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border rounded ${!data.addedFlag ? "cursor-not-allowed opacity-45" : ""}`}
                   onClick={() => handleOutstationChargesRemoveField(index)}
                 >
                   Remove
                 </button>

                 {index === outStationCharges.length - 1 && (
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border rounded" onClick={handleAddOutstationField}>
                     +
                   </button>
                 )}

                 {index > 0 && (
                   <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border rounded" onClick={() => handleOutstationChargesRemoveField(index)}>
                     -
                   </button>
                 )}
               </div>
             </div>
            ))}
               <div className="flex gap-2  my-2">
                <p className="border-r-2 px-1">Total articles: {outStationCharges.reduce((acc, charge) => acc + Number(charge.articles), 0)}</p>
           
                <p className="border-r-2 px-1">
                  Total charge amount: ₹{outStationCharges.reduce((acc, charge) => acc + charge.chargeAmount, 0)}
                </p>
              </div>
            
          




               
             
             
            




            </div>       
          </div>








                  {/* agency commission */}

          <div>
            <h1 className="font-semibold text-xl" >Agency Comission</h1>
            <div className="flex justify-start items-start gap-1 ">
              <div>
                <Label
                  htmlFor={``}
                  className=" text-xs lg:text-sm"
                  value="Total Amount (in rupees) "
                />
                <TextInput
                  color="blue"
                  id={``}
                  type="number"
                  min={1}
                  sizing="sm"
                  value={Charges.totalAmount}
                  placeholder="Total Amount "
                  readOnly
                />
              </div>
              <div>
                <Label
                  htmlFor={``}
                  className=" text-xs lg:text-sm"
                  value="Charge (Default 10% of total amount) "
                />
                <TextInput
                  color="blue"
                  id={``}
                  type="number"
                  min={1}
                  sizing="sm"
                  placeholder="Charge percent    "
                  value={agencyCommissionCharges.chargeRate}
                  onChange={(e)=>{handleOnChangeAgencyCommisionCharges("chargeRate",e.target.value),console.log(agencyCommissionCharges);
                  }}
                />
              </div>
              <div className="flex gap-1 mt-5 " >


              <button
                  
                  className= {`bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-2 border ${agencyCommissionCharges.addedFlag?"cursor-not-allowed opacity-45":""}   rounded`}
                  size="sm"
                  onClick={()=>{  
                    const totAmount = Charges.totalAmount/100 * agencyCommissionCharges.chargeRate;
                    handleOnChangeAgencyCommisionCharges("chargeAmount",totAmount);console.log(agencyCommissionCharges,"all charge",Charges);
                    handleOnChangeAgencyCommisionCharges("addedFlag",true)
                   }}
                  
                >
                  {agencyCommissionCharges.addedFlag?"Added":"Add"}
                </button>


                <button
                  

                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border  rounded ${!agencyCommissionCharges.addedFlag?"cursor-not-allowed opacity-45":""}  `}
                  size="sm"
                  onClick={()=>{ handleOnChangeAgencyCommisionCharges("chargeAmount",0),handleOnChangeAgencyCommisionCharges("addedFlag",false);console.log(agencyCommissionCharges)}}
                 
                >
                  Remove
                </button>
      


              </div>


            </div>
            <div className="flex gap-2 justify-start my-2 " >
                <p className="border-r-2 px-1 " >total amount : { Charges.totalAmount } </p>
                <p className="border-r-2 px-1 ">charge rate:{Charges.agencyCharges.chargeRate}% </p>
                <p className="border-r-2 px-1 " >total charge amount:{  Charges.agencyCharges.chargeAmount } </p>
              </div>
          </div>




         


        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={()=>{ setPDFBillListPageData(Charges) }  } >Apply</Button>
          <Button color="gray" onClick={() => setOpenChargesModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </>
  );
};

export default DataGrid;
