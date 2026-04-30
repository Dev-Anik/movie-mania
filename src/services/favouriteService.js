import { Query, ID } from 'appwrite';
import { DATABASE_ID, databases, FAVOURITES_COLLECTION_ID } from './appwrite';
//Get favourites
const getFavourites = async (userId) => {
    console.log("Fetching favourites for user:", userId);
    try {
        const response = await databases.listDocuments(DATABASE_ID, FAVOURITES_COLLECTION_ID, [Query.equal('user_id', userId)]);
        return response.documents;
    } catch (error) {
        console.error('Error fetching favourites:', error);
        return [];
    }
}
//  favourites
const addFavourites = async (movieData) => {
    try {
        return await databases.createDocument(DATABASE_ID, FAVOURITES_COLLECTION_ID, ID.unique(), {
            movie_id: movieData.movie_id,
            poster_url: movieData.poster_url,
            movie_title: movieData.title,
            movie_rating: movieData.rating,
            movie_language: movieData.language,
            movie_release: movieData.movie_release,
            user_id: movieData.user_id

        })
    } catch (error) {
        console.error('Error adding favourite movies:', error)
    }
}
//Delete favourites
const removeFavourites = async (documentId) => {
    try {
        return await databases.deleteDocument(DATABASE_ID, FAVOURITES_COLLECTION_ID, documentId)
    } catch (error) {
        console.log("Error removing movie:", error)
    }
}
export { getFavourites, addFavourites, removeFavourites };