import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Essence } from "../../types/types";

type EssenceSlice = {
    essences: Essence[]
}

const initialState: EssenceSlice = {
    essences: []
}

export const essenceSlice = createSlice({
    name: 'essences',
    initialState,
    reducers: {
        addEssence(state, action: PayloadAction<Essence>) {
            state.essences = [...state.essences, action.payload];
        },
        removeEssence(state, action: PayloadAction<Essence>) {
            state.essences = state.essences.filter(essence => essence.id !== action.payload.id);
        },
        updateEssence(state, action: PayloadAction<Essence>) {
            state.essences = state.essences.map(essence => essence.id === action.payload.id ?  essence = action.payload : essence);
        },
        sortEssencesUp(state) {
            state.essences = state.essences.sort( (a, b) => +new Date(b.date) - +new Date(a.date));
        },
        sortEssencesDown(state) {
            state.essences = state.essences.sort( (a, b) => +new Date(a.date) - +new Date(b.date));
        },
    }
})

export default essenceSlice.reducer;
export const { addEssence, removeEssence, updateEssence, sortEssencesUp, sortEssencesDown} = essenceSlice.actions;