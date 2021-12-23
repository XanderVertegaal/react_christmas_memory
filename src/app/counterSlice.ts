import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: 0 as number,
    reducers: {
        'increment': state => state + 1
    }
})