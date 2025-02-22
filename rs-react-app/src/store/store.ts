import { configureStore } from '@reduxjs/toolkit';
import { selectedMoviesReducer } from './selected-movie-slice';

export const store = configureStore({
  reducer: {
    selectedMovies: selectedMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
