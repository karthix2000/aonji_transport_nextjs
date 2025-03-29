import { create } from "zustand";

const billsURL = "http://localhost:4000/bills/";

const useBillsStore = create((set,get) => ({
    bills: [],
    bill:null,
    loading: true,
  
    fetchBills: async () => {
      try {
        const response = await fetch(billsURL);
        const data = await response.json();
        set({ bills: data, loading: false });
        if (data.length > 0) {
          set({ bill: data[data.length - 1] });
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
        set({ loading: false });
      }
    },

    fetchBill: async (id) => {
      const state = get(); // Access current state
      set({ loading: true }); // Set loading before fetching
    
      // If no ID is provided, set the last bill as default
      if (!id) {
        if (state.bills.length > 0) {
          set({ bill: state.bills[state.bills.length - 1], loading: false });
        }
        return;
      }
    
      try {
        const response = await fetch(`${billsURL}${id}`);
        if (!response.ok) throw new Error("Bill not found");
        const data = await response.json();
        set({ bill: data, loading: false }); // Update bill and stop loading
      } catch (error) {
        console.error("Error fetching bill:", error);
        set({ bill: null, loading: false }); // Stop loading on error
      }
    },
  
    updateBill: async (id, updatedData) => {
      try {
        const response = await fetch(`${billsURL}${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
  
        if (!response.ok) throw new Error("Failed to update bill");
  
        set((state) => ({
          bills: state.bills.map((bill) =>
            bill.id === id ? { ...bill, ...updatedData } : bill
          ),
        }));
      } catch (error) {
        console.error("Error updating bill:", error);
      }
    }

  }));

  
  
  export default useBillsStore;