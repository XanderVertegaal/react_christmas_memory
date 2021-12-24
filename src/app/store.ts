import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cardsSlice } from './cardsSlice';
import { counterSlice } from './counterSlice';
import { foundSlice } from './foundSlice';
import { gameOverSlice } from './gameOverSlice';
import { selectedSlice } from './selectedSlice';
import { wrongSlice } from './wrongSlice';

export const store = configureStore({
  reducer: {
    'cards': cardsSlice.reducer,
    'gameOver': gameOverSlice.reducer,
    'foundPairs': foundSlice.reducer,
    'counter': counterSlice.reducer,
    'selected': selectedSlice.reducer,
    'wrong': wrongSlice.reducer
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
