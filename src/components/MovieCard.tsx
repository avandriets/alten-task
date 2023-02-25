import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { MovieCardInterface } from '../interfaces';
import { MovieModel } from '../models';
import { useSelector } from 'react-redux';
import { selectMoviesEntity } from '../store';

export const MovieCard: FunctionComponent<MovieCardInterface> = (props: MovieCardInterface) => {
  const movie: MovieModel | null = useSelector(selectMoviesEntity(props.movieId));

  return (
    <Card sx={{ maxWidth: 300 }} variant="outlined">
      <CardActionArea href={`/${movie?.getImdbID()}`}>
        <CardMedia sx={{ objectFit: 'contain' }}
                   height="400"
                   component="img"
                   alt={movie?.getTitle()}
                   image={movie?.getPoster()}
                   title={movie?.getTitle()}/>
      </CardActionArea>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="body2" color="textSecondary" component="p">
          {movie?.getTitle()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Year: {movie?.getYear()}
        </Typography>

      </CardContent>
    </Card>
  );
};
