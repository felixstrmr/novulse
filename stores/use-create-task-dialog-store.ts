import { create } from "zustand";

type State = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  statusId: string | null;
  setStatusId: (statusId: string | null) => void;
};

export const useCreateTaskDialogStore = create<State>()((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
  statusId: null,
  setStatusId: (statusId) => set({ statusId }),
}));
