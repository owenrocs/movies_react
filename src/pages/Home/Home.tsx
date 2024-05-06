import React, { useEffect, useState } from 'react';
import { MovieCard } from '../../components/MovieCard';
import { movies } from '../../constants/moviesMock';
import { Carousel } from '../../components/Carousel';
import { getNowPlaying, getPopular, getTopRated } from '../../services';
import { IMovieResponse } from '../Popular/types';

function App() {
  // Popular Movies
  const [PopoularMovies, setMovies]     = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading]       = useState<boolean>(true);
  // const [errorRequest, setErrorRequest] = useState<boolean>(false);
  // Top Rated Movies
  const [TopRatedMovies, setTRM]              = useState<IMovieResponse[]>([]);
  const [isLoadingTRM, setIsLoadingTRM]       = useState<boolean>(true);
  // const [errorRequestTRM, setErrorRequestTRM] = useState<boolean>(false);
  // Now Playing Movies
  const [NowPlayingMovies, setNPMovies]       = useState<IMovieResponse[]>([]);
  const [isLoadingNP, setIsLoadingNP]         = useState<boolean>(true);

  // Popular Movies
  const getPopularMovies = async () => {
    await getPopular()
    .then((data) => {
      if(data && data.data){
        console.log(data.data.results);
        setMovies(data.data.results);
      } 
    })
    .catch((err) => {
      console.log(err);
      // setErrorRequest(true);
    });
  };

  // Top Rated Movies
  const getTopRatedMovies = async () => {
    await getTopRated()
    .then((data) => {
      if(data && data.data){
        console.log(data.data.results);
        setTRM(data.data.results);
      } 
    })
    .catch((err) => {
      console.log(err);
      // setErrorRequest(true);
    });
  };

  // Now Playing Movies
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
    setIsLoadingTRM(true);
    setIsLoadingNP(true);
    getPopularMovies();
    getTopRatedMovies();
    getNPMovies();
  }, []);

  return (
   <div> 
      <div className="font-jakarta text-2xl font-[700] pl-10 pt-6 pb-2">
        Popular
      </div>
          <div className='pl-10'>
            <Carousel movies={PopoularMovies} />
          </div>
      <div className="font-jakarta text-2xl font-[700] pl-10 pt-6 pb-2">
        Top Rated
      </div>
          <div className='pl-10'>
            <Carousel movies={TopRatedMovies} />
          </div>
      <div className="font-jakarta text-2xl font-[700] pl-10 pt-6 pb-2">
        Now Playing
      </div>
          <div className='pl-10 pb-10'>
            <Carousel movies={NowPlayingMovies} />
          </div>

    </div>
  );
}

export default App;
