import React from "react";
import { movies } from "../../constants/moviesMock";
import { IMovieResponse } from "../../pages/Popular/types";
import { MovieCard } from "../MovieCard";
import { ICarousel } from "./types";

const Carousel: React.FC<ICarousel> = ({movies}) => {
    return (
        <div className="flex flex-row flex-nowrap overflow-x-scroll space-x-4 no-scrollbar snap-x snap-mandatory">
          {movies.map((movie: IMovieResponse) => (
            <div className="w-max h-ma snap-always snap-center">
              <MovieCard
              movieId={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              genreId={movie.genre_ids[0]}
              />
            </div>
          ))}
        </div>
      );
}

export default Carousel