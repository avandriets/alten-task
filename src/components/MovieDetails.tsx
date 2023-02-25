import { Box, Grid, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById, selectMoviesEntity, selectMoviesState } from '../store';
import React, { useEffect } from 'react';
import { Status } from '../interfaces';
import { Pending } from './Pending';
import { Error } from './Error';

export const MovieDetails: React.FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const movie = useSelector(selectMoviesEntity(id));
  const moviesStatus: Status = useSelector(selectMoviesState);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id]);

  let content;

  if (moviesStatus.err) {
    content = <Error/>;
  } else if (moviesStatus.pending) {
    content = <Pending/>;
  } else {
    content = (
      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <Box component="img"
               alt={movie?.getTitle()}
               src={movie?.getPoster()}/>
        </Grid>

        <Grid item xs={8}>
          <Typography variant="h6" gutterBottom>
            Title
          </Typography>
          <Typography sx={{mb: 4}} variant="body2" color="textSecondary" gutterBottom>
            {movie?.getTitle()}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Rating
          </Typography>
          <Typography sx={{mb: 4}} variant="body2" color="textSecondary" gutterBottom>
            {movie?.getImdbRating()}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Year
          </Typography>
          <Typography sx={{mb: 4}} variant="body2" color="textSecondary" gutterBottom>
            {movie?.getYear()}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Plot
          </Typography>
          <Typography sx={{mb: 4}} variant="body2" color="textSecondary" gutterBottom>
            {movie?.getPlot()}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Awards
          </Typography>
          <Typography sx={{mb: 4}} variant="body2" color="textSecondary" gutterBottom>
            {movie?.getAwards()}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Actors
          </Typography>

          <List sx={{mb: 4}}>
            {movie?.getActors().map(a => (
              <ListItem>
                <ListItemText secondary={a}/>
              </ListItem>
            ))}
          </List>

        </Grid>
      </Grid>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 4 }}>
        <Link href={'/'}>Back to list</Link>
      </Box>
      {content}
    </Box>
  );

};
