import { useEffect, useRef, useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/Moviecard.jsx';
import { useDebounce } from 'react-use';
import { FaArrowDown } from 'react-icons/fa';

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [movieDetailsMap, setMovieDetailsMap] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const firstCardRef = useRef(null);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm.trim());
    setCurrentPage(1);
  }, 500, [searchTerm]);

  const fetchMoviesWithDetails = async (query = '', page = 1) => {
    if (!query) {
      setMovieList([]);
      setMovieDetailsMap({});
      setErrorMessage('');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setMovieDetailsMap({});

    try {
      const searchRes = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
      );
      const searchData = await searchRes.json();

      if (searchData.Response === 'False') {
        setErrorMessage(searchData.Error || 'No movies found');
        setMovieList([]);
        return;
      }

      const searchResults = searchData.Search || [];
      setMovieList(searchResults);
      setCurrentPage(page);
      setTotalResults(parseInt(searchData.totalResults) || 0);

      const detailPromises = searchResults.map(async (movie) => {
        const detailRes = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${movie.imdbID}`
        );
        return detailRes.json();
      });

      const detailsArray = await Promise.all(detailPromises);
      const detailsMap = {};
      detailsArray.forEach((detail) => {
        if (detail && detail.imdbID) {
          detailsMap[detail.imdbID] = detail;
        }
      });

      setMovieDetailsMap(detailsMap);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('An error occurred while fetching movies');
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesWithDetails(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage < 1 || newPage > totalPages) return;
    fetchMoviesWithDetails(debouncedSearchTerm, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFirstCard = () => {
    if (firstCardRef.current) {
      firstCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {movieList.length > 0 && (
            <center className='mt-8'>
                <button
                onClick={scrollToFirstCard}
                className="text-indigo-300 hover:text-white flex items-center gap-2 bg-indigo-800 px-3 py-1 rounded-full shadow-md transition-all"
                >
                <FaArrowDown className="text-sm" />
                Scroll to Results
              </button>
              </center>
        )};
        </header>
        <section className="all-movies">

          {isLoading ? (
            <center>
            <Spinner />
            </center>
          ) : errorMessage ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : movieList.length === 0 ? (
            <p className="text-center">No movies to display</p>
          ) : (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movieList.map((movie, index) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movieDetailsMap[movie.imdbID] || movie}
                    {...(index === 0 ? { ref: firstCardRef } : {})}
                  />
                ))}

                {currentPage > 1 && (
                  <MovieCard
                    key="prev-button"
                    type="pagination"
                    direction="prev"
                    onPageChange={handlePageChange}
                  />
                )}

                {currentPage < totalPages && (
                  <MovieCard
                    key="next-button"
                    type="pagination"
                    direction="next"
                    onPageChange={handlePageChange}
                  />
                )}
              </ul>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
