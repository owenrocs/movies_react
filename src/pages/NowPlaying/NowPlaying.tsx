import React, { useEffect, useState } from 'react'
import { getNowPlaying } from '../../services';
import { MovieCard } from '../../components/MovieCard';
import { IMovieResponse } from '../Popular/types';

const NowPlaying: React.FC = () => {
    const [movies, setNPMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorRequest, setErrorRequest] = useState<boolean>(false);

    const getNPMovies = async () => {
        setIsLoading(true);
        await getNowPlaying()
        .then((data) => {
            if(data && data.data){
                console.log(data.data.results);
                setNPMovies(data.data.results);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getNPMovies();
    }, []);

  return (
    <>
        <div className="font-jakarta text-2xl font-[700] pl-10 pt-6 pb-2">
        Now Playing
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4 px-10 pb-10">
                {isLoading}
                    {movies?.length > 0 && 
                        movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movieId={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                            rating={movie.vote_average}
                            genreId={movie.genre_ids[0]}
                        />
                        ))}
            </div>
    </>
  )
}

export default NowPlaying;