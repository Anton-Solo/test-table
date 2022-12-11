import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalSlice = {
    id: string | null;
    modal: boolean;
}

const initialState: ModalSlice = {
    id: null,
    modal: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal(state, action: PayloadAction<string | null> ) {
            state.modal = true;
            state.id = action.payload;
        },
        hideModal(state) {
            state.modal = false;
            state.id = null;
        }
    }
})

export default modalSlice.reducer;
export const { showModal, hideModal } = modalSlice.actions;