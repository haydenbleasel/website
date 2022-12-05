import type { ReactNode } from 'react';
import create from 'zustand';

type ContextualMenuContent = {
  content: ReactNode;
  setContent: (content: ReactNode) => void;
};

const useContextualMenu = create<ContextualMenuContent>()((set) => ({
  content: null,
  setContent: (content) => set({ content }),
}));

export default useContextualMenu;
