import { create } from 'zustand';

export const useInterviewStore = create((set) => ({
  isLocked: true,
  problemData: {
    title: "First Non-Repeating Character",
    ds: "Hash Map",
    tc: "O(n)"
  },
  // Unlock the gate
  checkLogic: (selectedDs, selectedTc) => {
    set((state) => {
      if (selectedDs === state.problemData.ds && selectedTc === state.problemData.tc) {
        return { isLocked: false };
      }
      return { isLocked: true };
    });
  },
}));