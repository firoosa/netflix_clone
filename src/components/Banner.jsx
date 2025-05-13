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
      setBannerMovie(trending[randomIndex]);
    }
  }, [trending]);

  if (loading || !bannerMovie) return <div className="banner-loading">Loading...</div>;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner-contents">
        <h1>{bannerMovie.title || bannerMovie.name || bannerMovie.original_name}</h1>
        <p>{bannerMovie.overview}</p>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
