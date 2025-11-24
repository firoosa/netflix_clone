import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovies, fetchMoviesByGenre } from '../features/movies/movieSlice';
import Navbar from '../components/Header';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';


const genreList = [
  { id: 28, title: '💥 Action' },
  { id: 35, title: '🎭 Comedy' },
  { id: 27, title: '👻 Horror' },
  { id: 10749, title: '❤️ Romance' },
  { id: 99, title: '🎬 Documentary' },
];

const Home = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trending, genres, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    genreList.forEach((genre) => {
      dispatch(fetchMoviesByGenre(genre.id));
    });
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <Banner />

      <MovieRow title="🔥 Trending Movies" movies={trending} loading={loading} error={error} />

      {genreList.map((genre) => (
        <MovieRow
          key={genre.id}
          title={genre.title}
          movies={genres[genre.id] || []}
          loading={loading}
          error={error}
        />
      ))}
    </div>
  );
};


export default Home;
