import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovies, fetchMoviesByGenre} from '../features/movies/movieSlice';
import Navbar from '../components/Header';
import Banner from '../components/Banner';


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

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate("/login"); // redirect after logout
  //   } catch (err) {
  //     console.error("Logout failed:", err.message);
  //   }
  // };

  // useEffect(() => {
  //   dispatch(fetchTrendingMovies());
  // }, [dispatch]);

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
        />
      ))}
    </div>
  );
};

// Reusable Row
// const MovieRow = ({ title, movies, loading, error }) => (
//   <section className="movies-section">
//     <h2 className="section-title">{title}</h2>
//     {loading && !movies.length && <p className="loading-text">Loading...</p>}
//     {error && !movies.length && <p className="error-text">Error: {error}</p>}
//     <div className="movie-row">
//       {movies.map((movie) => (
//         <img
//           key={movie.id}
//           src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//           alt={movie.title}
//           className="movie-poster"
//         />
//       ))}
//     </div>
//   </section>

  const MovieRow = ({ title, movies }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
      if (rowRef.current) {
        const scrollAmount = direction === 'left' ? -500 : 500;
        rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    return (
      <section className="movies-section">
        <h2 className="section-title">{title}</h2>
        <div className="row-wrapper">
          <button className="scroll-button left" onClick={() => scroll('left')}>◀</button>
          <div className="movie-row" ref={rowRef}>
            {movies.map((movie) => (
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll('right')}>▶</button>
        </div>
      </section>
    );
  };


export default Home;

