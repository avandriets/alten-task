import { Box, Grid } from '@mui/material';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, selectMoviesIds, selectMoviesState, selectMoviesTotal } from '../store';
import { Status } from '../interfaces';
import { Search } from './Search';
import { MovieCard } from './MovieCard';
import { PaginationLink } from './PaginationLink';
import { useSearchParams } from 'react-router-dom';
import { removeFalsyValues } from '../utils';

export const MoviesList: FunctionComponent = () => {
  const dispatch = useDispatch();
  const moviesIds: any[] = useSelector(selectMoviesIds);
  const moviesStatus: Status = useSelector(selectMoviesState);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    const params = {
      s: currentParams.search,
      page: currentParams.page,
    }

    dispatch(fetchMovies(removeFalsyValues(params)));
  }, [searchParams]);

  const content = moviesIds.map(id => (
    <Grid item xs={2} sm={4} md={4} key={id}>
      <MovieCard key={id} movieId={id}></MovieCard>
    </Grid>
  ));

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
