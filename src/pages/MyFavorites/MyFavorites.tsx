import React, { useEffect, useState } from 'react'
import { IMovieDetail } from '../Movie/types';
import { MovieCard } from '../../components/MovieCard';
import { getDetails } from '../../services';

const MyFavorites : React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const favorites:string = localStorage.getItem('favorites') || '';

  const runGetFavorites = async () => {
    if (favorites.length) { // Es lo mismo a decir favorites.length > 0
      const favoritesArray = JSON.parse(favorites);
      const newMovies = await Promise.all(
        favoritesArray.map(async (favorite: string) => {
          return getDetails(String(favorite))
          .then((res) => {
            if (res && res.data) {
              return res.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        })
      );
      setMovies(newMovies);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    runGetFavorites();
  },[])

  return (
    <div>
      {!loading ? (
          <div>
            <div className="font-jakarta text-2xl font-[700] pl-10 pt-6 pb-2">
                My Favorites
            </div>

            {favorites && movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4 px-10 pb-10">
                {movies &&
                  movies.map((movie: IMovieDetail) => (
                    <MovieCard
                      key={movie.id}
                      movieId={movie.id}
                      posterPath={movie.poster_path}
                      title={movie.title}
                      rating={movie.vote_average}
                      genreId={movie.genres[0].id}
                    />
                  ))}
              </div>
          ):
          (
            <div className='font-jakarta text-md font-[400] px-24 pt-6 text-center'>
              You still don't have any favorites, go to the home page and add some!
            </div>
          )}
        </div>
      ):(
        <div className='font-jakarta text-md font-[400] px-24 pt-16 text-center'>
              You still don't have any favorites, go to the home page and add some!
        </div>
      )}



    </div>

  );
};

export default MyFavorites