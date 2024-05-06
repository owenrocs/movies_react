import { IMAGE_SOURCE } from '../../constants/moviesMock'
import { IMovieCard } from './types'
import React from 'react'
import genres from '../../constants/genres.json'
import { get } from 'http'
import { Pill } from '../Pill'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/constants'

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    rating,
    posterPath,
}) => {
    // Navigation Web
    // CONSTANTS
    const navigate = useNavigate();

    // STATES
    const poster = IMAGE_SOURCE + posterPath;

    // FUNCTIONS
    const getGenre = (genreId: number) => { 
        // Iterate id over genres.json and return the genre name
        const key = Object.values(genres.genres).find(genre => genre.id === genreId);
        if (key) {
            return key.name;
        }
        return 'Not classified';
    }
    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.MOVIE}${id}`, {state: { movie: movieName }});
    };
    // HANDLERS
    // EFFECTS

    // RETURN

  return (
    // Hover effect on the card, make it bigger and modify the opacity
<div className="relative w-64 h-96 rounded-xl overflow-hidden bg-opacity-90 group transition-transform duration-500"
    onClick={() => {
        navigateMovies(movieId, title);
    }}>
    <img src={poster} alt={title} className="absolute w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-b from-transparent to-opacity-95 group-hover:to-black transition-all duration-800">
        <Pill title={getGenre(genreId)} color='red'/>
        <p className="text-white py-1 text-lg font-bold">{title}</p>
        <p className="text-white text-base">{rating.toFixed(1)} / 10</p>
    </div>
</div>



  )
}

export default MovieCard
