import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// TMDB base URL and API key
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Thunk to fetch movies
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return res.data.results;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchByGenre',
  async (genreId) => {
    const res = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    return { genreId, movies: res.data.results };
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    trending: [],
    genres: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        const { genreId, movies } = action.payload;
        state.genres[genreId] = movies;
      });
  },
});

export default movieSlice.reducer;
