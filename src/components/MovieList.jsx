import fetchMovies from "../services/tmdb";
import React, { useEffect, useState } from 'react';
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import { trackSearch } from "../services/searchHistory";

const MovieList = ({ searchItem }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favourite, setFavourite] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        const getMovies = async () => {
            try {
                setLoading(true);
                const movies = await fetchMovies(searchItem);
                console.log('Movies in MovieList:', movies);
                if (searchItem && movies.results.length > 0) {
                    trackSearch(searchItem, movies.results[0]);
                }
                await setMovies(movies.results);
            }
            catch (error) {
                console.error("Error fetching movies:", error);
                setError('Failed to fetch movies. Please try again later.');
            }
            finally {
                setLoading(false);
            }

        };
        const timeOutId = setTimeout(getMovies, 500);
        return () => clearTimeout(timeOutId);
    }, [searchItem]);

    return (
        <section className="all-movies min-h-[500px]">
            {
                loading ? (
                    <Spinner />
                ) :
                    error ? (<p className="text-red-500">{error}</p>) : (
                        <ul>
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}  />
                            ))}

                        </ul>
                    )
            }
        </section>
    );

}

export default MovieList;