import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cardsSlice } from './cardsSlice';
import { gameOverSlice } from './gameOverSlice';

export const store = configureStore({
  reducer: {
    'cards': cardsSlice.reducer,
    'gameOver': gameOverSlice.reducer
  }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
