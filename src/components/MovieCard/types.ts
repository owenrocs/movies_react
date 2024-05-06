export interface IMovieCard {
    title: string;
    genreId: number;
    movieId: number;
    rating: number;
    posterPath: string;
}

export interface IGenre {
    id: number;
    name: string;
}