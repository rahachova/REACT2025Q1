import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../types/movie';

const initialState: IMovie[] = [];

export const selectedMoviesSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<IMovie>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter((movie) => movie.uid !== action.payload);
    },
  },
});

export const { select, remove } = selectedMoviesSlice.actions;
export const selectedMoviesReducer = selectedMoviesSlice.reducer;
