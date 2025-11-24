import React, { useRef } from 'react';

const MovieRow = ({ title, movies, loading, error }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  console.log(`📺 MovieRow "${title}" - Movies count:`, movies?.length || 0);

  return (
    <section className="movies-section">
      <h2 className="section-title">{title}</h2>
      {loading && !movies?.length && <p className="loading-text">Loading...</p>}
      {error && !movies?.length && <p className="error-text">Error: {error}</p>}
      <div className="row-wrapper">
        <button className="scroll-button left" onClick={() => scroll('left')}>◀</button>
        <div className="movie-row" ref={rowRef}>
          {movies?.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || 'Movie poster'}
              title={movie.title}
              className="movie-poster"
              loading="lazy"
            />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scroll('right')}>▶</button>
      </div>
    </section>
  );
};

export default MovieRow;
