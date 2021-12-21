import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cardType } from "../App";

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: [] as cardType[],
    reducers: {
        'get_cards': (state, action: PayloadAction<cardType[]>) => action.payload
    }
})