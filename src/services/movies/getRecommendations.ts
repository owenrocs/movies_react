 import httpInstance from "../httpInstance"
 
 export const getRecommendations = async(movie_id: string) => {
        let res: any;
        const endpoint = `/${movie_id}/recommendations?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US&page=1`;
        await httpInstance.get(endpoint)
        .then((data) => {
            res = data;
        })
        .catch((err) => {
            res = err.message;
        });
        return res;
 }