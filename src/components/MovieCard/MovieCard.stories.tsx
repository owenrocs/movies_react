import { Meta, StoryFn } from '@storybook/react';

import { IMovieCard } from './types';
import MovieCard from './MovieCard';
import React from 'react';

const meta = {
    title: 'Components/MovieCard',
    components: MovieCard,
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: false,
                description: "A MovieCard component",
                iframeHeight: 400,
            }
        }

    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number' },
        movieId: { control: 'number' },
        rating: { control: 'number' },
        posterPath: { control: 'text' },
    },
    tags: ["autodoocs"],
} as Meta;

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;

/* Default story of MovieCard*/

export const Default = Template.bind({});
Default.args = {
    title: 'The Shawshank Redemption',
    genreId: 18,
    movieId: 278,
    rating: 9.3,
    posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
};

