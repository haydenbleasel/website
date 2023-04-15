import { create } from 'zustand';

type ContactFormState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const useContactForm = create<ContactFormState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useContactForm;
