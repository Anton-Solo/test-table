import { RootState } from "./store";

export const selectEssences = (state: RootState) => state.essenceSlice.essences;
export const selectEssenceData = (state: RootState) => state.essenceSlice.essences.filter(essence => essence.id === state.modalSlice.id)

export const selectModal = (state: RootState) => state.modalSlice.modal;
