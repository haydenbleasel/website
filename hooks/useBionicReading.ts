import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type BionicReadingState = {
  bionicReadingEnabled: boolean;
  toggleBionicReading: () => void;
};

const useBionicReading = create<BionicReadingState>()(
  devtools(
    persist((set) => ({
      bionicReadingEnabled: false,
      toggleBionicReading: () =>
        set((state) => ({ bionicReadingEnabled: !state.bionicReadingEnabled })),
    }))
  )
);

export default useBionicReading;
