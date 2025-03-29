"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

import {useAgencyStore,useAgencyDeleteModal} from '../../../../store/agencyStore'

const AgencyDeleteModal = () => {
   
    const { isOpen, agencyId,openModal,closeModal  } = useAgencyDeleteModal();
   const{deleteAgencyById} = useAgencyStore()


   const router = useRouter()

   const handleDelete = async () => {
    if (agencyId) {
      await deleteAgencyById(agencyId);
    }
    closeModal();
        router.replace("/admin/agencies/")
  };
   if (!isOpen) return null;

  return (
    <>
    <Modal show={openModal} size="md" onClose={closeModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Agent?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={ handleDelete }>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={closeModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AgencyDeleteModal



