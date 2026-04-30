import React from 'react'
import { useFavourite } from '../context/FavouriteContext';

const MovieCard = ({ movie }) => {
    const { favourites, handleFavourite } = useFavourite();
    const isFavourite = favourites.some(fav => String(fav.movie_id) === String(movie.id));
    const movieData = {
        movie_id: movie.id,
        poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'no-movie.png',
        title: movie.title,
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
        language: movie.original_language ? movie.original_language : "N/A",
        release_date: movie.release_date ? movie.release_date.split('-')[0] : "N/A",
    }

    return (
        <div className='movie-card'>
            <img src={movieData.poster_url} alt={movieData.title} />

            <div className='mt-4'>
                <h3 key={movieData.movie_id}>{movieData.title}</h3>
                <div className='content flex items-center justify-between mt-2'>
                    <div className='flex justify-start items-center gap-x-2'>
                        <div className='rating'>
                            <img src="/star.svg" alt="" />
                            <p>
                                {movieData.rating}
                            </p>
                        </div>
                        <span>•</span>
                        <p className='lang'>{movieData.language}</p>
                        <span>•</span>
                        <p className='year'>{movieData.release_date}</p>
                    </div>
                    <div>
                        <button key={movieData.movie_id} className='cursor-pointer' onClick={() => handleFavourite(movieData)}>
                            {isFavourite ? "❤️" : "🤍"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard