import {create} from "zustand";

// Define the store interface
interface TimerStore {
  duration: number;
  setDuration: (duration: number) => void;
}

// Create the Zustand store
const useTimerStore = create<TimerStore>((set) => ({
  duration: 10,
  setDuration: (duration) => set({duration}),
}));

export default useTimerStore;
