import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, COLLECTION_ID } from './appwrite';

export const trackSearch = async (searchItem, movie) => {
    if (!searchItem || !movie) return;

    try {
        const results = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal("searchTerm", searchItem)
            ]
        );

        if (results.documents.length > 0) {
            const doc = results.documents[0];
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, { count: doc.count + 1 });

        }
        else {
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchItem,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movie.id
            })
        }


    } catch (error) {
        console.error("Appwrite tracking error:", error);
    }
}

export const fetchTrendingMovies= async()=>{
    try{
        const result= await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc('count')
            ]
        )
        return  result.documents
    }catch(error){
        console.error("Error fetching trending movies:", error);
        return []
    }
}