import { useHistory, useLocation } from 'react-router';
import { Box, Grid } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, selectMoviesIds, selectMoviesState, selectMoviesTotal } from '../store';
import { Status } from '../interfaces';
import isequal from 'lodash.isequal';
import { removeFalsyValues } from '../utils';
import { Search } from './Search';
import { MovieCard } from './MovieCard';

const pageLimits = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
];

export const MoviesList: FunctionComponent = () => {

  const history = useHistory();
  const location = useLocation();

  const [queryParams, queryParamsSet] = useState({});
  const [offset, offsetSet] = useState<number | null>(null);
  const [selectedLimit, setSelectedLimit] = useState(pageLimits[0]);

  const dispatch = useDispatch();
  const moviesIds: any[] = useSelector(selectMoviesIds);

  const moviesStatus: Status = useSelector(selectMoviesState);
  const total = useSelector(selectMoviesTotal);

  // useEffect(() => {
  //
  //   const query = new URLSearchParams(location.search);
  //   const params: any = {};
  //
  //   query.forEach((value, key) => {
  //     params[key] = value ?? null;
  //   });
  //
  //   offsetSet(+(query.get('offset') ?? 0));
  //
  //   if (!moviesStatus.err && !moviesStatus.pending && !moviesStatus.rejected && !moviesStatus.resolved) {
  //     queryParamsSet(params);
  //     dispatch(fetchMovies(params));
  //   }
  //
  //   if (moviesStatus.resolved && !isequal(queryParams, params)) {
  //     queryParamsSet(params);
  //     dispatch(fetchMovies(removeFalsyValues(params)));
  //   }
  //
  // }, [dispatch, location, moviesStatus, queryParams]);

  const onSearch = (value: string) => {
    dispatch(fetchMovies(value));
  };

  const content = moviesIds.map(id => (
    <Grid item xs={2} sm={4} md={4} key={id}>
      <MovieCard key={id} movieId={id}></MovieCard>
    </Grid>
  ));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 4 }}>
        <Search onSearch={onSearch}></Search>
      </Box>

      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
        {content}
      </Grid>

    </Box>
  );
};
