import { createSlice } from "@reduxjs/toolkit";

export const selectPrizeSlice = createSlice({
    name: 'selectPrize',
    initialState: 0 as number,
    reducers: {
        'select1': state => 1,
        'select2': state => 2,
        'select3': state => 3
    }
})