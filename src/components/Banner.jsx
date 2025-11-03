import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingMovies } from '../features/movies/movieSlice';

const Banner = () => {
  const dispatch = useDispatch();
  const { trending, loading } = useSelector((state) => state.movies);
  const [bannerMovie, setBannerMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  useEffect(() => {
    if (trending.length > 0) {
      const randomIndex = Math.floor(Math.random() * trending.length);
      const selectedMovie = trending[randomIndex];
      console.log('🎬 Selected banner movie:', selectedMovie);
      setBannerMovie(selectedMovie);
    }
  }, [trending]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (loading || !bannerMovie) {
    return (
      <div className="banner-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner-overlay"></div>
      <div className="banner-contents">
        <h1 className="banner-title">
          {bannerMovie.title || bannerMovie.name || bannerMovie.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button play-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
          <button className="banner-button info-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            More Info
          </button>
        </div>
        <p className="banner-description">
          {truncate(bannerMovie.overview, 200)}
        </p>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
