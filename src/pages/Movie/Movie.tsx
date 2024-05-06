import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Pill } from '../../components/Pill';
import { IMovieResponse } from '../Popular/types';
import { getDetails, getRecommendations } from '../../services';
import { Carousel } from '../../components/Carousel';
import { Genre } from './types';
import { hasOnlyExpressionInitializer } from 'typescript';
import { FaCalendarAlt, FaCheckCircle, FaStar, FaTimesCircle, FaUser } from 'react-icons/fa';

const Movie: React.FC = () => {
    // CONSTANTS
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

        // CONSTS FOR RECOMMENDATIONS
    const [recommendations, setRecommendations] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

        // CONSTS FOR MOVIE DETAILS
    const [movieDetails, setMovieDetails] = useState<IMovieResponse>();
    const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(true);

        // SET FAVORITES
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>('');

    // FUNCTIONS
    const goBack = () => {
        navigate(-1);
    };
        // GET RECOMMENDATIONS
    const getRecommended = async () => {
      await getRecommendations(id ?? '')
      .then((data) => {
        if(data && data.data){
          console.log(data.data.results);
          setRecommendations(data.data.results);
        } 
      })
      .catch((err) => {
        console.log(err);
      });
    };
      // GET MOVIE DETAILS
    const getMovieDetails = async () => {
      await getDetails(id ?? '')
      .then((data) => {
        if(data && data.data){
          console.log(data.data);
          setMovieDetails(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    };

    const addFavorite = () => {
      const favs = favorites.length > 0 ? JSON.parse(favorites) : []; // ["1234", "0001"]
      const newFavs = [...favs, id];
      setFavorites(JSON.stringify(newFavs));
      setIsFavorite(true);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
    };

    const removeFavorite = () => {
      const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
      let newFavs = [...favs];
      newFavs = newFavs.filter((e) => e !== id);
      setFavorites(JSON.stringify(newFavs));
      setIsFavorite(false);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
    };

    // USE EFFECTS
    const favs = localStorage.getItem('favorites') || '';

    useEffect(() => {
        setFavorites(favs);
        setIsFavorite(false);
        if (favs.includes(String(id))) {
          setIsFavorite(true);
        }
        setIsLoading(true);
        setIsLoadingDetails(true);
        getRecommended();
        getMovieDetails();
    }, [id, favs]);

  return (
    <div>
      <div className="flex justify-between items-center px-10 pt-4 pb-2 text-sm">
          <button onClick={() => navigate(-1)} className='hover:text-[#E50914] pl-4'> ← Go Back </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4 px-10 pb-2">
        <div className="flex flex-col items-center">
          <img className="w-64 h-96 rounded-xl" src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`} alt={movieDetails?.title} />
          <div className="flex justify-between w-64 mt-4">
            {/* <Pill text={movieDetails?.vote_average} />
            <Pill text={movieDetails?.release_date} /> */}
          </div>
        </div>
        <div className="col-span-3">
          <div className="font-jakarta text-6xl font-[700]"> {movieDetails?.title} </div>
            {/* Movie Details */}
            <div className="flex justify-start pt-6">
                <div className="flex items-center px-4">
                    <FaCalendarAlt className="mr-4 text-[#E50914]" /> 
                    <span className="mr-4">{new Date(movieDetails?.release_date || '').getFullYear() || ''}</span>
                </div>
                <div className="flex items-center px-4">
                    <FaStar className="mr-4 text-[#FFBF00]" /> 
                    <span className="mr-4">{movieDetails?.vote_average.toFixed(2) || ''} </span>
                </div>
                <div className="flex items-center px-4">
                    <FaUser className="mr-4 text-[#E0A800]" /> 
                    <span>{movieDetails?.vote_count || ''}</span>
                </div>
                <div className="flex items-center px-6">
                    {movieDetails?.adult ? (
                      <FaTimesCircle className="mr-2 text-red-500" />
                    ) : (
                      <FaCheckCircle className="mr-2 text-green-500" />
                    )}
                    <span className="mr-4">{movieDetails?.adult ? 'No apta para menores de edad' : 'Apta para todos los públicos' } </span>
                    
                </div>
            </div>
          <div className="font-jakarta text-xl font-[600] mb-2 pt-6 pl-2">Overview</div>
          <div className="pl-6 text-justify">{movieDetails?.overview}</div>
          <div className="font-jakarta text-xl font-[600] mb-2 pt-6 pl-2">Favorite</div>
          {/* Button for favorites */}
            <div className="flex justify-start px-6">

                {isFavorite ? (
                    <button onClick={removeFavorite} className="flex items-center bg-[#E50914] text-white px-4 py-2 rounded-md transform active:scale-95">
                        <FaTimesCircle className="mr-2 text-[#FFFFFF]" /> 
                        Remove from Favorites
                    </button>
                ): (
                  <button onClick={addFavorite} className="flex items-center bg-[#E50914] text-white px-4 py-2 rounded-md transform active:scale-95">
                      <FaStar className="mr-2 text-[#FFFFFF]" /> 
                      Add to Favorites
                  </button>
                )}      
            </div>
            
        </div>
      </div>

      <div className="font-jakarta text-2xl font-[700] pl-10 pt-4 pb-4">
        Recommendations
      </div>
      <div className='pl-16'>
          <Carousel movies={recommendations} />
      </div>
    </div>

  )
}

export default Movie;