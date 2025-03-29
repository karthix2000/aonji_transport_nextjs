"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useBillsStore from "../../../../store/billsStore";
import logo from "../../../../../public/ANJITLOGOBLACK.svg"
import Image from 'next/image'
import BillComponent from "../components/BillComponent";
import dynamic from "next/dynamic";
import { Modal,Button } from "flowbite-react";


import { useRef } from "react";


import PDFBillPage from "../components/PDFViewer/PDFBillPage";




const BillPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { bills, bill, fetchBill, fetchBills, loading } = useBillsStore();
    const [openModal, setOpenModal] = useState(false);

    const handleBillPrint = ()=>{
        setOpenModal(!openModal)
    }
    console.log(bill)
  
    useEffect(() => {
      fetchBills();

    }, []);
  
    useEffect(() => {
      if (id) {
        fetchBill(id);
      }
    }, [id]);
  
    if (loading) return <p>Loading...</p>;
    if (!bill) return <p>Bill not found</p>;
    if (!bills.length) return <p>Loading bills...</p>;

   
  
    const currentIndex = bills.findIndex((b) => Number(b.id) === Number(id));
    if (currentIndex === -1) return <p>Bill not found</p>;
  
    const prevBill = currentIndex > 0 ? bills[currentIndex - 1] : null;
    const nextBill = currentIndex < bills.length - 1 ? bills[currentIndex + 1] : null;
  
    return (
      <div key={id}>


          


        <div className="m-3 flex justify-end gap-1">
        <div>
          <button onClick={handleBillPrint} className="bg-black text-white px-4 py-2 rounded">Print</button>
        </div>
          <button
            className={`px-4 py-2 rounded ${
              prevBill ? "bg-black text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!prevBill}
            onClick={() => prevBill && router.push(`/admin/bills/${prevBill.id}`)}
          >
            ⬅ Prev
          </button>
  
          <button
            className={`px-4 py-2 rounded ${
              nextBill ? "bg-black text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!nextBill}
            onClick={() => nextBill && router.push(`/admin/bills/${nextBill.id}`)}
          >
            Next ➡
          </button>
        </div>


        <div>
          <BillComponent billData={bill} />
        </div>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Print Bill</Modal.Header>
        <Modal.Body>
              <PDFBillPage billData={bill} />
        </Modal.Body>
        <Modal.Footer>
         
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
               

        
      
  
      </div>

    );
  };

export default BillPage;
