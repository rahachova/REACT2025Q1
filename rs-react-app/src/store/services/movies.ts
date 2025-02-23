import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetMovieResult,
  IGetMoviesArg,
  IGetMoviesResult,
} from '../../types/movie';

export const moviesApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/movie' }),
  endpoints: (builder) => ({
    getMovies: builder.query<IGetMoviesResult, IGetMoviesArg>({
      query: ({ pageNumber, searchQuery }) => ({
        url: `/search?pageSize=5&pageNumber=${pageNumber}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ title: searchQuery }).toString(),
      }),
    }),
    getMovie: builder.query<IGetMovieResult, string>({
      query: (id) => `?uid=${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieQuery } = moviesApi;
