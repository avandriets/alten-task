import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, moviesActions, selectMoviesIds, selectMoviesState, selectMoviesTotal } from '../store';
import { Status } from '../interfaces';
import { Search } from './Search';
import { MovieCard } from './MovieCard';
import { PaginationLink } from './PaginationLink';
import { useSearchParams } from 'react-router-dom';
import { removeEmptyValues } from '../utils';
import { Error } from './Error';
import { Pending } from './Pending';

export const MoviesList: FunctionComponent = () => {
  const dispatch = useDispatch();
  const moviesIds: any[] = useSelector(selectMoviesIds);
  const moviesStatus: Status = useSelector(selectMoviesState);
  const total = useSelector(selectMoviesTotal);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    const params = {
      s: currentParams.search,
      page: currentParams.page,
    };

    params.s
      ? dispatch(fetchMovies(removeEmptyValues(params)))
      : dispatch(moviesActions.clear());

  }, [searchParams]);

  let content;

  if (moviesStatus.err) {
    content = <Error/>;
  } else if (moviesStatus.pending) {
    content = <Pending/>;
  } else {
    if (total) {
      content = moviesIds.map(id => (
        <Grid item xs={2} sm={4} md={4} key={id}>
          <MovieCard key={id} movieId={id}></MovieCard>
        </Grid>
      ));
    } else {
      const search = searchParams.get('search');
      content = (
        <Grid item xs={12} sm={12} md={12}>
          <Box>

            <Card sx={{ height: 400 }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                {search ?
                  <Typography color="textSecondary" sx={{ mt: 8 }} gutterBottom>
                    Cannot find movies, please adjust search request.
                  </Typography>
                  :
                  <Typography color="textSecondary" sx={{ mt: 8 }} gutterBottom>
                    Please enter search request in order to get movies.
                  </Typography>
                }
              </CardContent>
            </Card>

          </Box>
        </Grid>
      );
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 4 }}>
        <Search></Search>
      </Box>

      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ mb: 4 }}>
        {content}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 4 }}>
        <PaginationLink></PaginationLink>
      </Box>
    </Box>
  );
};
