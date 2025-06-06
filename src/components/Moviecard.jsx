import React, { forwardRef, useState } from 'react';

const MovieCard = forwardRef(({ movie, type = 'movie', onPageChange, direction }, ref) => {
  const [showDetails, setShowDetails] = useState(false);

  if (type === 'pagination') {
    return (
      <div
        onClick={() => onPageChange?.(direction)}
        className="movie-card bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xl font-semibold text-indigo-600 dark:text-indigo-300 rounded-md cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700 transition duration-300 min-h-[420px]"
      >
        {direction === 'prev' ? '← Prev' : 'Next →'}
      </div>
    );
  }

  const handleCardClick = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);

  const {
    Title,
    Year,
    Poster,
    imdbRating,
    Genre,
    Language,
    Plot,
    Released,
    imdbID,
  } = movie;

  return (
    <>
      <div
        ref={ref}
        className="movie-card hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={Poster !== 'N/A' ? Poster : '/no-movie.png'}
          alt={Title}
          className="rounded-md w-full object-cover h-[380px]"
        />
        <div className="mt-3">
          <h3 className="font-semibold text-lg text-center">{Title}</h3>
          <p className="text-sm text-gray-500 text-center">{Year}</p>
        </div>
      </div>

      {showDetails && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
            onClick={handleClose}
          ></div>

          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={handleClose}
          >
            <div
              className="relative bg-white dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-[#2c2c2c] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-700 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-xl font-bold transition"
              >
                ✕
              </button>

              <div className="md:w-1/3 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
                <img
                  src={Poster !== 'N/A' ? Poster : '/no-movie.png'}
                  alt={Title}
                  className="rounded-lg w-full h-auto object-contain max-h-[450px]"
                />
              </div>

              <div className="md:w-2/3 w-full p-6 pr-8 overflow-y-auto text-gray-800 dark:text-gray-100 space-y-6 custom-scroll font-sans">
                <h2 className="text-4xl font-bold leading-tight tracking-tight text-indigo-600 dark:text-indigo-400">
                  {Title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-b border-gray-300 dark:border-gray-700 pb-4">
                  <div>
                    <span className="font-semibold">Released</span>
                    <p>{Released || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Language</span>
                    <p>{Language || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="font-semibold">IMDb Rating</span>
                    <p>⭐ {imdbRating || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-semibold">IMDb ID</span>
                    <p>{imdbID}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-semibold mb-3">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {Genre
                      ? Genre.split(',').map((g, i) => (
                          <span
                            key={i}
                            className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 text-xs font-medium px-3 py-1 rounded-full"
                          >
                            {g.trim()}
                          </span>
                        ))
                      : <span className="text-sm text-gray-500">Unknown</span>
                    }
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-semibold mb-1">📝 Plot</h3>
                  <p className="text-sm leading-relaxed">
                    {Plot || 'No plot available.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

export default MovieCard;
