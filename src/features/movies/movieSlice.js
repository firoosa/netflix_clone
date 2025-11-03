import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// TMDB base URL and API key
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Mock data for testing - using REAL TMDB image paths that actually exist
const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
  },
  {
    id: 4,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea."
  },
  {
    id: 5,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 6,
    title: "Avatar",
    poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    backdrop_path: "/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg",
    overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home."
  },
  {
    id: 7,
    title: "Titanic",
    poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    backdrop_path: "/yDI6D5ZQh67YU4r2ms8qcSbAviZ.jpg",
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
  },
  {
    id: 8,
    title: "Avengers: Endgame",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more."
  }
];

// Thunk to fetch movies
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    console.log('🎬 Fetching trending movies...');
    console.log('🔑 API Key:', API_KEY);
    
    // For now, always use mock data
    console.log('📺 Using mock data for trending movies');
    return mockMovies;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchByGenre',
  async (genreId) => {
    console.log(`🎭 Fetching movies for genre ${genreId}...`);
    
    // For now, always use mock data
    console.log(`📺 Using mock data for genre ${genreId}`);
    return { genreId, movies: mockMovies };
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
        console.log('⏳ Fetching trending movies...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        console.log('✅ Trending movies loaded:', action.payload);
        state.trending = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        console.log('❌ Trending movies failed:', action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        const { genreId, movies } = action.payload;
        console.log(`✅ Genre ${genreId} movies loaded:`, movies);
        state.genres[genreId] = movies;
      });
  },
});

export default movieSlice.reducer;
