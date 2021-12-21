import { createSlice } from "@reduxjs/toolkit";

export const gameOverSlice = createSlice({
    name: 'isGameOver',
    initialState: false as boolean,
    reducers: {
        'toggleGameOver': state => !state
    }
})