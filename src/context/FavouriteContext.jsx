import { createContext, useContext, useState, useEffect } from "react";
import { getFavourites, addFavourites, removeFavourites } from "../services/favouriteService";

// creating favorite context
const FavouriteContext = createContext();

// creating favortie context provider
export const FavouriteProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);
    const user_id = localStorage.getItem("user_id");
    if(!user_id){
        const id=crypto.randomUUID();
        localStorage.setItem("user_id",id);
    }

    // Loading Favourite movies on startup
    useEffect(() => {
        const fetchFav = async () => {
            const data = await getFavourites(user_id);
            setFavourites(data);
        }
        fetchFav();

    }, [])

    // Adding Favourite Movies
    const handleFavourite = async (movie) => {
        const existingFav = favourites.find((fav) =>
            String(fav.movie_id) === String(movie.movie_id)
        );

       
        try {
            if (existingFav) {
                await removeFavourites(existingFav.$id);
                setFavourites((prev) => prev.filter((fav)=>fav.$id !== existingFav.$id));
                 console.log("removing from favourites:", movie);
            }
            else {
                const movieData = {
                    movie_id: movie.movie_id,
                    poster_url: movie.poster_url,
                    title: movie.title,
                    language: movie.language,
                    user_id: user_id,
                    movie_release: movie.release_date,
                    rating: movie.rating,
                }
                const newDoc = await addFavourites(movieData);
                setFavourites((prev) => [...prev, newDoc])
                 console.log("Adding to favourites:", movie);
            }
        } catch (error) {
            console.error("Error in saving movie", error);
        }
    }

    return (
        <FavouriteContext.Provider value={{ favourites, handleFavourite }}>
            {children}
        </FavouriteContext.Provider>
    )
}

export const useFavourite = () => useContext(FavouriteContext)