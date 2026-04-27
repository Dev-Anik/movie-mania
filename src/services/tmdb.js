const BASE_URL= 'https://api.themoviedb.org/3';
const Search_URL= `${BASE_URL}/search/movie`;
const TOKEN= import.meta.env.VITE_TMDB_TOKEN;

const options={
    method: 'GET',
    headers:{
        accept:'application/json',
        Authorization:`Bearer ${TOKEN}`
    }
};

const fetchMovies= async(query='')=>{
    try{
        const response= await fetch(query?`${Search_URL}?query=${encodeURIComponent(query)}`:`${BASE_URL}/discover/movie?sort_by=popularity.desc`,options);
        if(!response.ok){
            throw new Error('Network response is not ok');
        }
        const data= await response.json();
        console.log('Fetched movies:', data);
        return data;
    }
    catch(error){
        console.error("Error occured:", error);
        throw error;
    }
}

export default fetchMovies;