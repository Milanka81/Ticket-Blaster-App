import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  selectedId: string | null;
}
const initialState: ModalState = {
  isOpen: false,
  selectedId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.selectedId = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.selectedId = null;
    },
    toggleModal(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
