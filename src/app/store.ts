import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cardsSlice } from './cardsSlice';
import { counterSlice } from './counterSlice';
import { foundSlice } from './foundSlice';
import { displaySlice } from './displaySlice';
import { selectedSlice } from './selectedSlice';
import { wrongSlice } from './wrongSlice';
import { selectPrizeSlice } from './selectPrizeSlice';

export const store = configureStore({
  reducer: {
    'cards': cardsSlice.reducer,
    'display': displaySlice.reducer,
    'foundPairs': foundSlice.reducer,
    'counter': counterSlice.reducer,
    'selected': selectedSlice.reducer,
    'wrong': wrongSlice.reducer,
    'selectedPrize': selectPrizeSlice.reducer
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
