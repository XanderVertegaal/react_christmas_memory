import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
    name: 'display',
    initialState: 'board' as string,
    reducers: {
        'show_board': state => 'board',
        'show_prize': state => 'prize'
    }
})