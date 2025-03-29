
import { create } from "zustand";

const agencyURL = "http://localhost:4000/agencies/";

export const useAgencyStore = create((set,get) => ({
  agencies: [],
  
  fetchAgencies: async () => {
    try {
      const response = await fetch(agencyURL);
      const data = await response.json();
      set({ agencies: data });
      
    } catch (error) {
      console.error("Error fetching Agency:", error);
    }
  },
  deleteAgencyById: async (id) => {
    try {
      await fetch(`${agencyURL}${id}`, { method: "DELETE" });
      set((state) => ({
        agencies: state.agencies.filter((agency) => agency.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting Agency:", error);
    }
  },
  updateAgency: async (id, updatedData) => {
    try {
      const response = await fetch(`${agencyURL}${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update agency");
      }

      set((state) => ({
        agencies: state.agencies.map((agency) =>
          agency.id === id ? { ...agency, ...updatedData } : agency
        ),
      }));
    } catch (error) {
      console.error("Error updating Agency:", error);
    }
  },
  getAgencyNameByCity:(city)=>{
       const {agencies}=get()
       

        return get().agencies
                .filter((agency)=>agency.city===city)
                .map((agency)=>agency.name)
  }
}));

export const useAgencyDeleteModal = create((set) => ({
  isOpen: false,
  agencyId: null,
  openModal: (id) => set({ isOpen: true, agencyId: id }),
  closeModal: () => set({ isOpen: false, agencyId: null }),
}));

export const useAgencyEditModal = create((set) => ({
    isOpen: false,
    agencyData: null,
    openModal: (agency) => set({ isOpen: true, agencyData: agency },console.log(agency)),
    closeModal: () => set({ isOpen: false, agencyData: null }),
  }));