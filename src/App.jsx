import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieList from './components/MovieList'
import { fetchTrendingMovies } from './services/searchHistory'
import TrendingMovies from './components/TrendingMovies'
import { FavouriteProvider } from './context/FavouriteContext'

const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        if (trendingMovies && trendingMovies.length > 0) {
          setTrendingMovies(trendingMovies);
        }
      }
      catch (error) {
        console.error("Error in getting trending movies:", error)
      }
    }
    getTrendingMovies();
  }, [])

  return (
    <FavouriteProvider>
      <main>
        <div className='pattern' />
        <div className='wrapper'>
          <header>
            <img src="/hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Any Hassle</h1>
          </header>
          <Search searchItem={searchItem} setSearchItem={setSearchItem} />
          <TrendingMovies trendingMovies={trendingMovies} />
          <h2>All Movies</h2>
          <MovieList searchItem={searchItem} />
        </div>
      </main>
    </FavouriteProvider>
  )
}

export default App